import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query'
import { Customer } from '~/src/shared/types/ipc'
import { customerModule } from '../../../modules/customers'

export const useFetchCustomerById = (
  id: string,
  props?: UseQueryOptions<Customer, Error>
): UseQueryResult<Customer, Error> => {
  return useQuery<Customer, Error>({
    queryKey: ['customer', id],
    queryFn: () => customerModule.getById(id),
    enabled: !!id,
    ...props
  })
}
