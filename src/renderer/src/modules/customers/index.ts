import { Customer, NewCustomer } from '~/src/shared/types/ipc'
import { CustomerInterface } from './customers.interface'

class CustomerModule implements CustomerInterface {
  async getAll(): Promise<Customer[]> {
    const customers = await window.api.fetchAllCustomers()
    return customers
  }

  async getById(id: string): Promise<Customer> {
    const customer = await window.api.fetchCustomerById(id)
    return customer
  }

  async add(customer: NewCustomer): Promise<void> {
    await window.api.addCustomer(customer)
  }

  async update(customer: Customer): Promise<void> {
    await window.api.updateCustomer(customer)
  }

  async deleteOne(id: string): Promise<void> {
    await window.api.deleteCustomer(id)
  }
}

const customerModule = new CustomerModule()
export { customerModule }
