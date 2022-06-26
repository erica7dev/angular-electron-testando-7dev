const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const url = require('url')

let mainWindow

function openModal(){
  const { BrowserWindow } = require('electron')
  let modal = new BrowserWindow({
    parent: mainWindow,
    modal: true,
    show: false
  })
    modal.loadURL('https://www.sitepoint.com')
    modal.once('ready-to-show', () => {
      modal.show()
    })
  }

  ipcMain.on('open-modal', (event, arg) => {
    openModal()
  })

function createWindow(){
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
})

mainWindow.loadURL(
  url.format({
    pathname: path.join(__dirname, '/dist/index.html'),
    protocol: 'file:',
    slashes: true
  })
)

mainWindow.webContents.openDevTools()

mainWindow.on('closed', function(){
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function(){
  if(process.platform !== 'darwin'){
    app.quit()
  }
})

app.on('activate', function(){
  if(mainWindow === null){
    createWindow()
  }
})
