const { contextBridge, ipcRenderer } = require('electron');

// Expose only the necessary methods to the renderer process (for security)
contextBridge.exposeInMainWorld('electron', {
  // Sidebar resizing (sending width changes)
  setSidebarWidth: (newWidth) => ipcRenderer.send('sidebar:resize', newWidth),

  //make file
  createFile: (fileName, content) => ipcRenderer.invoke('create-file', fileName, content)

});
