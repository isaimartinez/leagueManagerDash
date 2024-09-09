import axios from "axios";
import { DataProvider, CrudFilters, CrudFilter } from "@refinedev/core";

const apiUrl = import.meta.env.VITE_API_URL;

export const dataProvider: DataProvider = {
  getApiUrl: () => apiUrl,
  
  getList: async ({ resource, pagination, filters, sorters }) => {
    const url = `${apiUrl}/${resource}`;

    const { data, headers } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      params: {
        _start: (pagination?.current || 1) - 1,
        _end: pagination?.pageSize || 10,
        _sort: sorters?.[0]?.field,
        _order: sorters?.[0]?.order,
        ...filters,
      },
    });

    const total = headers["x-total-count"];

    return {
      data,
      total: total ? parseInt(total, 10) : data.length,
    };
  },

  getOne: async ({ resource, id }) => {
    const url = `${apiUrl}/${resource}/${id}`;

    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return {
      data,
    };
  },

  create: async ({ resource, variables }) => {
    const url = `${apiUrl}/${resource}`;

    const { data } = await axios.post(url, variables, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return {
      data,
    };
  },

  update: async ({ resource, id, variables }) => {
    const url = `${apiUrl}/${resource}/${id}`;

    const { data } = await axios.put(url, variables, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return {
      data,
    };
  },

  deleteOne: async ({ resource, id }) => {
    const url = `${apiUrl}/${resource}/${id}`;

    const { data } = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return {
      data,
    };
  },

  getMany: async ({ resource, ids }) => {
    const url = `${apiUrl}/${resource}`;

    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      params: {
        id: ids,
      },
    });

    return {
      data,
    };
  },

  createMany: async ({ resource, variables }) => {
    const url = `${apiUrl}/${resource}/bulk`;

    const { data } = await axios.post(url, variables, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return {
      data,
    };
  },

  updateMany: async ({ resource, ids, variables }) => {
    const url = `${apiUrl}/${resource}/bulk`;

    const { data } = await axios.patch(
      url,
      { ids, ...variables },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    return {
      data,
    };
  },

  deleteMany: async ({ resource, ids }) => {
    const url = `${apiUrl}/${resource}/bulk`;

    const { data } = await axios.delete(url, {
      data: { ids },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return {
      data,
    };
  },

  custom: async ({ url, method, filters, sorters, payload, query, headers }) => {
    let requestUrl = `${url}`;

    if (query) {
      requestUrl = `${requestUrl}?${query}`;
    }

    if (sorters && sorters.length > 0) {
      const sortQuery = {
        _sort: sorters[0].field,
        _order: sorters[0].order,
      };
      requestUrl = `${requestUrl}${query ? "&" : "?"}${new URLSearchParams(
        sortQuery
      ).toString()}`;
    }

    if (filters) {
      const filterQuery = (filters as CrudFilters).reduce((acc, filter) => {
        if ("field" in filter) {
          acc[filter.field] = filter.value;
        }
        return acc;
      }, {} as Record<string, string>);

      requestUrl = `${requestUrl}${query || sorters ? "&" : "?"}${new URLSearchParams(
        filterQuery
      ).toString()}`;
    }

    let axiosResponse;
    switch (method) {
      case "put":
      case "post":
      case "patch":
        axiosResponse = await axios[method](requestUrl, payload, {
          headers: {
            ...headers,
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        break;
      case "delete":
        axiosResponse = await axios.delete(requestUrl, {
          data: payload,
          headers: {
            ...headers,
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        break;
      default:
        axiosResponse = await axios.get(requestUrl, {
          headers: {
            ...headers,
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        break;
    }

    const { data } = axiosResponse;

    return Promise.resolve({ data });
  },
};
