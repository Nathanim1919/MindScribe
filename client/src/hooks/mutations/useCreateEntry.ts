import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEntry } from '../../services/entry.service';
import { Entry } from '../../types/entrie.interface';

export const useCreateEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Partial<Entry>) => createEntry(payload),
    onSuccess: (data) => {
      queryClient.setQueryData(['entries', data.id], data);
      queryClient.invalidateQueries({ queryKey: ['entries'] });
    },
    onError: (error) => {
      console.error('Error creating entry:', error);
    },
  });
};
