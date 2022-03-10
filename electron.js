// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron');
const url = require('url');
const path = require('path');
const args = process.argv.slice(1);
const serve = args.some(val => val === "--serve" || val === "-serve");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 640,
    minWidth: 480,
    minHeight: 640,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false, // disable it for remotely executed code like https://app.com/index.html. load scripts with preload (https://electronjs.org/docs/tutorial/security#2-do-not-enable-nodejs-integration-for-remote-content)
      webSecurity: true // cors problem is only applicable to local file execution so you can go with true when remote content is loaded
    },
    frame: true,
    titleBarStyle: 'default'
  })

  // and load the index.html of the app.
  if (serve) {
    //require('electron-reload')(__dirname);
    mainWindow.loadURL('http://localhost:5000/');
  } else {
    // When building local app instead of remotely hosted you should use below code. Otherwise just loadURL instead.
    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      hash: '',
      protocol: 'file:',
      slashes: true
    }));
    // mainWindow.loadURL('https://fullnode.maple.com.pl/'); // change to your publish build endpoint
  }

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.