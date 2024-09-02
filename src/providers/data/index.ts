import axios from 'axios';
import { DataProvider } from '@refinedev/core';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export const dataProvider: DataProvider = {
  getList: async ({ resource, pagination, filters, sorters }) => {
    const { data, headers } = await axiosInstance.get(`/${resource}`, {
      params: { pagination, filters, sorters },
    });
    return {
      data,
      total: parseInt(headers['x-total-count'] || '0'),
    };
  },
  getOne: async ({ resource, id }) => {
    const { data } = await axiosInstance.get(`/${resource}/${id}`);
    return { data };
  },
  create: async ({ resource, variables }) => {
    const { data } = await axiosInstance.post(`/${resource}`, variables);
    return { data };
  },
  update: async ({ resource, id, variables }) => {
    const { data } = await axiosInstance.put(`/${resource}/${id}`, variables);
    return { data };
  },
  deleteOne: async ({ resource, id }) => {
    const { data } = await axiosInstance.delete(`/${resource}/${id}`);
    return { data };
  },
  getMany: async ({ resource, ids }) => {
    const { data } = await axiosInstance.get(`/${resource}`, { params: { ids } });
    return { data };
  },
  createMany: async ({ resource, variables }) => {
    const { data } = await axiosInstance.post(`/${resource}/bulk`, variables);
    return { data };
  },
  updateMany: async ({ resource, ids, variables }) => {
    const { data } = await axiosInstance.put(`/${resource}/bulk`, { ids, ...variables });
    return { data };
  },
  deleteMany: async ({ resource, ids }) => {
    const { data } = await axiosInstance.delete(`/${resource}/bulk`, { data: { ids } });
    return { data };
  },
  custom: async ({ url, method, filters, sorters, payload, query, headers }) => {
    const { data } = await axiosInstance.request({
      url,
      method,
      params: { ...filters, ...sorters, ...query },
      data: payload,
      headers,
    });
    return { data };
  },
};
