import { QueryOptions, useMutation, UseMutationResult } from '@tanstack/react-query'
import { Customer, NewCustomer } from '~/src/shared/types/ipc'
import { customerModule } from '../../../modules/customers'

export const useCreateCustomer = (
  props?: QueryOptions<Customer[]>
): UseMutationResult<void, Error, NewCustomer, string> => {
  return useMutation({
    mutationKey: ['create-customer'],
    mutationFn: (data: NewCustomer) => customerModule.add(data),
    ...props
  })
}
