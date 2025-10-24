const { contextBridge, ipcRenderer } = require('electron');


contextBridge.exposeInMainWorld('electron', {
  // Sidebar resizing
  setSidebarWidth: (newWidth) => ipcRenderer.send('sidebar:resize', newWidth),

  //make file
  createFile: async (fileName, fileContent) => {
    return await ipcRenderer.invoke('create-file', { fileName, fileContent });
  }

});