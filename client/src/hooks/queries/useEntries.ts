import { useQuery } from '@tanstack/react-query';
import { getEntries } from '../../services/entry.service';
import { Entry } from '../../types/entrie.interface';

export const useEntries = () => {
  return useQuery<Entry[], Error>({
    queryKey: ['entries'],
    queryFn: getEntries,
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 2,
  });
};
