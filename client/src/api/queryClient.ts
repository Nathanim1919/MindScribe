import {QueryClient} from '@tanstack/react-query';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 60 * 1000, // 1 minute
            // cacheTime has been removed as it is not a valid property.
            refetchOnWindowFocus: false,
            retry: 2,
        }
    }
})