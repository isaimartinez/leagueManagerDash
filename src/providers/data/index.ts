import axios from "axios";
import { DataProvider } from "@refinedev/core";

export const dataProvider: DataProvider = {
  getList: async ({ resource, pagination, sorters }) => {
    const { data, headers } = await axios.get(`http://localhost:3000/${resource}`);
    return {
      data,
      total: parseInt(headers["x-total-count"] || "0"),
    };
  },

  getOne: async ({ resource, id }) => {
    const { data } = await axios.get(`http://localhost:3000/${resource}/${id}`);
    return {
      data,
    };
  },

  create: async ({ resource, variables }) => {
    const { data } = await axios.post(`http://localhost:3000/${resource}`, variables);
    return {
      data,
    };
  },

  update: async ({ resource, id, variables }) => {
    const { data } = await axios.put(`http://localhost:3000/${resource}/${id}`, variables);
    return {
      data,
    };
  },

  deleteOne: async ({ resource, id }) => {
    const { data } = await axios.delete(`http://localhost:3000/${resource}/${id}`);
    return {
      data,
    };
  },

  // Implement other methods as needed
};
