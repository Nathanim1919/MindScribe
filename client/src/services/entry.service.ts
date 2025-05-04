import { api } from '../api/axios';
import { endpoints } from '../api/endPoints';
import { Entry } from '../types/entrie.interface';

export const fetchEntries = async (): Promise<Entry[]> => {
  const { data } = await api.get(endpoints.entries.getAll);
  return data;
};

export const fetchEntryById = async (id: string): Promise<Entry> => {
  const { data } = await api.get(endpoints.entries.getById(id));
  return data;
};

export const createEntry = async (payload: Partial<Entry>): Promise<Entry> => {
  const { data } = await api.post(endpoints.entries.create, payload);
  return data;
};

export const updateEntry = async (
  id: string,
  entry: Partial<Entry>,
): Promise<Entry> => {
  const { data } = await api.patch(endpoints.entries.update(id), entry);
  return data;
};

export const deleteEntry = async (id: string): Promise<void> => {
  await api.delete(endpoints.entries.delete(id));
};
