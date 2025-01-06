import { ipcMain } from 'electron'
import { randomUUID } from 'node:crypto'
import dbServer from '../../lib/db'
import { Customer } from '../../shared/types/ipc'
import { customerSlug } from './customer/customer.slug'

const db = dbServer<Customer>()

async function addCustomer(doc: Customer): Promise<PouchDB.Core.Response | void> {
  const id = randomUUID()

  const data: Customer = {
    ...doc,
    _id: id
  }

  return db
    .put(data)
    .then((res) => {
      return res
    })
    .catch((err) => {
      console.log('Erro ao cadastrar cliente: ', err)
    })
}

async function fetchAllCustomer(): Promise<Customer[]> {
  try {
    const result = await db.allDocs({ include_docs: true })

    return result.rows.map((row) => row.doc as Customer)
  } catch (error) {
    console.error('Erro ao buscar clientes: ', error)
    return []
  }
}

async function deleteCustomer(id: string): Promise<PouchDB.Core.Response | void> {
  const doc = await db.get(id)
  return db
    .remove({
      _id: doc._id,
      _rev: doc._rev
    })
    .then((res) => {
      return res
    })
    .catch((err) => {
      console.log('Erro ao deletar cliente: ', err)
    })
}

async function updateCustomer(doc: Customer): Promise<PouchDB.Core.Response | void> {
  return db
    .put(doc)
    .then((res) => {
      return res
    })
    .catch((err) => {
      console.log('Erro ao atualizar cliente: ', err)
    })
}

async function fetchCustomerById(id: string): Promise<Customer> {
  return db
    .get(id)
    .then((res) => {
      return res
    })
    .catch((err) => {
      console.log('Erro ao buscar cliente: ', err)
      return {} as Customer
    })
}

ipcMain.handle(customerSlug.addCustomer, async (event, doc: Customer) => {
  const result = await addCustomer(doc)
  return result
})

ipcMain.handle(customerSlug.fetchAllCustomers, () => {
  return fetchAllCustomer()
})

ipcMain.handle(
  customerSlug.deleteCustomer,
  async (
    event,
    id,
  ) => {
    const result = await deleteCustomer(id)
    return result
  }
)

ipcMain.handle(customerSlug.updateCustomer, async (event, doc: Customer) => {
  const result = await updateCustomer(doc)
  return result
})

ipcMain.handle(customerSlug.fetchCustomerById, async (event, id: string) => {
  const result = await fetchCustomerById(id)
  return result
})
