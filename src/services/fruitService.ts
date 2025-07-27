import axiosInstance from "../utils/axiosInstance";
import type { FruitFormData } from "../types/fruit";

export const fruitService = {
  getFruits: (page: string, limit: string) =>
    axiosInstance.get(`/fruit/fruits-inventory?page=${page}&limit=${limit}`),

  getFruitNames: () => axiosInstance.get(`/fruit/fruits-name`),

  addFruit: (formData: FruitFormData) => axiosInstance.post(`/fruit`, formData),

  editFruit: (id: string, formData: FruitFormData) =>
    axiosInstance.put(`/fruit/${id}`, formData),

  deleteFruits: (id: string) => axiosInstance.delete(`/fruit/${id}`),
};
