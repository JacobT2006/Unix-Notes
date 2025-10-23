const { app, BrowserWindow, Menu, ipcMain } = require('electron') 
// import module app, which controls your application's event lifecycle.
// import module BrowserWindow, which creates and manages app windows
const { mainMenu, popupMenu } = require('./menumaker')
const path = require('path');

// initalize UI
const createWindow = () => {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    frame: true,
    titleBarStyle: 'hidden',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })
    Menu.setApplicationMenu(mainMenu);
    win.setMenuBarVisibility(false);
  
  
    //win.loadFile(path.join(__dirname, 'index.html'));
    win.loadFile('index.html');


    //left click?
    win.webContents.on("context-menu", () => {
      popupMenu.popup(win.webContents)
    });

    

};

// create on screen UI
app.whenReady().then(() => {  
  createWindow();
});

// UI go bye bye
app.on('window-all-closed', () =>{
  app.quit();
});
