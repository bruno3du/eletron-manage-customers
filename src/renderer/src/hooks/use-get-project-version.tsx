import { useQuery } from '@tanstack/react-query'

export const useGetProjectVersion = () => {
  return useQuery({
    queryKey: ['project-version'],
    queryFn: () => window.api.getVersion(),
    staleTime: 1000
  })
}
