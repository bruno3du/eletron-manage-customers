import { ElectronAPI, electronAPI } from '@electron-toolkit/preload'
import { contextBridge, ipcRenderer } from 'electron'
import { customerSlug } from '../main/customer/customer/customer.slug'
import { Customer, NewCustomer } from '../shared/types/ipc'

type ApiCallback = (event: Electron.IpcRendererEvent, ...args: any[]) => void

const api = {
  onNewCustomer: (callback: ApiCallback) => {
    ipcRenderer.on('cadastro-cliente', callback)
    return () => ipcRenderer.off('cadastro-cliente', callback)
  },
  fetchUsers: () => ipcRenderer.invoke('fetch-users'),
  getVersion: () => ipcRenderer.invoke('get-version'),
  addCustomer: (doc: NewCustomer): Promise<PouchDB.Core.Response | void> =>
    ipcRenderer.invoke(customerSlug.addCustomer, doc),
  fetchAllCustomers: (): Promise<Customer[]> => ipcRenderer.invoke(customerSlug.fetchAllCustomers),
  deleteCustomer: (id: string): Promise<PouchDB.Core.Response | void> =>
    ipcRenderer.invoke(customerSlug.deleteCustomer, id),
  updateCustomer: (doc: Customer): Promise<PouchDB.Core.Response | void> =>
    ipcRenderer.invoke(customerSlug.updateCustomer, doc),
  fetchCustomerById: (id: string): Promise<Customer> =>
    ipcRenderer.invoke(customerSlug.fetchCustomerById, id)
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: typeof api
  }
}

// Custom APIs for renderer

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
