import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const landingProvider = {
  getPublicTeams: async () => {
    const url = `${apiUrl}/public/teams`;
    const { data } = await axios.get(url);
    return data;
  },

  getPublicLeagues: async () => {
    const url = `${apiUrl}/public/leagues`;
    const { data } = await axios.get(url);
    return data;
  },

  getPublicMatches: async (limit?: number) => {
    const url = `${apiUrl}/public/matches`;
    const { data } = await axios.get(url, {
      params: { limit },
    });
    return data;
  },

  getPublicStats: async () => {
    const url = `${apiUrl}/public/stats`;
    const { data } = await axios.get(url);
    return data;
  },

  custom: async ({ url, method, payload, query }: {
    url: string;
    method: 'get' | 'post' | 'put' | 'patch' | 'delete';
    payload?: any;
    query?: string;
  }) => {
    let requestUrl = `${apiUrl}${url}`;

    if (query) {
      requestUrl = `${requestUrl}?${query}`;
    }

    let axiosResponse;
    switch (method) {
      case "post":
        axiosResponse = await axios.post(requestUrl, payload);
        break;
      case "put":
        axiosResponse = await axios.put(requestUrl, payload);
        break;
      case "patch":
        axiosResponse = await axios.patch(requestUrl, payload);
        break;
      case "delete":
        axiosResponse = await axios.delete(requestUrl, { data: payload });
        break;
      default:
        axiosResponse = await axios.get(requestUrl);
        break;
    }

    return axiosResponse.data;
  },
};