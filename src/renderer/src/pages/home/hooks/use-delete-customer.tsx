import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { customerModule } from '../../../modules/customers'

interface useDeleteCustomerProps {
  onSuccess?: () => void
}
export const useDeleteCustomer = (
  props?: UseMutationOptions<unknown, Error, string, unknown>
): UseMutationResult<unknown, Error, string, unknown> => {
  return useMutation({
    mutationKey: ['delete-customer'],
    mutationFn: customerModule.deleteOne,
    ...props
  })
}
