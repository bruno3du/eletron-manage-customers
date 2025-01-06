import { QueryOptions, useQuery, UseQueryResult } from '@tanstack/react-query'
import { Customer } from '~/src/shared/types/ipc'
import { customerModule } from '../../../modules/customers'

export const useListCustomers = (options?: QueryOptions<Customer[]>): UseQueryResult<Customer[]> => {
  return useQuery({
    queryKey: ['customers'],
    queryFn: customerModule.getAll,
    ...options,
  })
}
