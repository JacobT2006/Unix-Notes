const { app, BrowserWindow, Menu, ipcMain } = require('electron') 
// import module app, which controls your application's event lifecycle.
// import module BrowserWindow, which creates and manages app windows
const { mainMenu, popupMenu } = require('./menumaker')
const path = require('node:path');


// initalize UI
const createWindow = () => {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    },
  })
    Menu.setApplicationMenu(mainMenu);
    win.setMenuBarVisibility(false);
  
    // load files
    win.loadFile('index.svg');
    win.loadFile('index.html');


    //left click?
    win.webContents.on("context-menu", () => {
      popupMenu.popup(win.webContents)
    });

};

// create on screen UI
app.whenReady().then(() => {  
  createWindow();

  ipcMain.on('window-control', (event, action) => {
    const win = BrowserWindow.getFocusedWindow();
    if (!win) return;

    if (action === 'close') {
      win.close();
    } else if (action === 'minimize') {
      win.minimize();
    } else if (action === 'maximize') {
      if (win.isMaximized()) {
        win.unmaximize();
      } else {
        win.maximize();
      }
    }
  });
});

// UI go bye bye
app.on('window-all-closed', () =>{
  app.quit();
});



// file stuffs

const fs = require('fs').promises;

ipcMain.handle('create-file', async (event, { fileName, fileContent }) => {
  try {
    const filePath = path.join(app.getPath('desktop'), fileName); // Save to desktop for demo
    await fs.writeFile(filePath, fileContent, 'utf8');
    return { success: true, message: `File created at ${filePath}` };
  } catch (err) {
    console.error(err);
    return { success: false, message: err.message };
  }
});

