import { api } from '../api/axios';
import { endPoints } from '../api/endPoints';

export const fetchEntries = async () => {
  const { data } = await api.get(endPoints.entries.getAll);
  return data;
};

export const fetchEntryById = async (id: string) => {
  const { data } = await api.get(endPoints.entries.getById(id));
  return data;
};

export const createEntry = async (entry: any) => {
  const { data } = await api.post(endPoints.entries.create, entry);
  return data;
};
