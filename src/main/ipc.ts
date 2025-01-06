import { app, ipcMain } from 'electron'

ipcMain.handle('fetch-users', () => {
  console.log('buscando usuarios')

  return [
    {
      id: 1,
      name: 'Matheus'
    },
    {
      id: 2,
      name: 'João'
    },
    {
      id: 3,
      name: 'Maria'
    }
  ]
})

ipcMain.handle('get-version', () => app.getVersion())
