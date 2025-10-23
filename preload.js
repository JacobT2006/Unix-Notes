const { contextBridge, ipcRenderer } = require('electron');

// Expose only the necessary methods to the renderer process (for security)
contextBridge.exposeInMainWorld('electron', {
  // Sidebar resizing (sending width changes)
  setSidebarWidth: (newWidth) => ipcRenderer.send('sidebar:resize', newWidth),

});
