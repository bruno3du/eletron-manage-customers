import { Customer, NewCustomer } from '~/src/shared/types/ipc'

export interface CustomerInterface {
  getById: (id: string) => Promise<Customer>
  getAll: () => Promise<Customer[]>
  add: (customer: NewCustomer) => Promise<void>
  update: (customer: Customer) => Promise<void>
  deleteOne: (id: string) => Promise<void>
}
