const { app, BrowserWindow, ipcMain } = require('electron') 
// import module app, which controls your application's event lifecycle.
// import module BrowserWindow, which creates and manages app windows

// initalize UI
const createWindow = () => {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    titleBarStyle: 'hidden',
  })
  win.loadFile('index.html')
};

// create on screen UI
app.whenReady().then(() => {  
  createWindow();
});

// UI go bye bye
app.on('window-all-closed', () =>{
  app.quit();
});
