import { app, BrowserWindow, globalShortcut } from 'electron'

export function createShortcut(window: BrowserWindow) {
  app.on('browser-window-focus', () => {
    globalShortcut.register('CommandOrControl+R', () => {
      window.reload()
    })

    globalShortcut.register('CommandOrControl+I', () => {
      window.webContents.toggleDevTools()
    })
  })

  app.on('browser-window-blur', () => {
    globalShortcut.unregisterAll()
  })
}
