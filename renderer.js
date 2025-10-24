const { ipcRenderer } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
  
  // Sidebar resizing 
  const sidebar = document.querySelector('.sidebar');
  const resizer = document.querySelector('.sidebar-resizer');
  let isResizing = false;
  let lastWidth = null;

  function resizeSidebar(e) {
    if (!isResizing) return;
    lastWidth = Math.min(Math.max(e.clientX, 150), window.innerWidth * 0.4);
    requestAnimationFrame(() => {
      sidebar.style.width = lastWidth + 'px';
    });
  }

  resizer.addEventListener('mousedown', (e) => {
    isResizing = true;
    document.body.style.cursor = 'ew-resize';
  });
  window.addEventListener('mousemove', resizeSidebar);
  window.addEventListener('mouseup', () => {
    if (isResizing) {
      isResizing = false;
      document.body.style.cursor = '';
    }
  });

// file funky
async function handleCreateFile() {
  const fileName = 'my-new-file.txt';
  const fileContent = 'This is the content of my new file.';
  const result = await window.electron.createFile(fileName, fileContent);

  if (result.success) {
    alert("yes")
    console.log(result.message);
  } else {
    console.error(result.message);
  }
}
  
document.getElementById('createFileButton').addEventListener('click', handleCreateFile);

  
});

//exit button(s)? -------------------------------------------------------------------------------------------------

window.onload = () => {
  const body = document.body;

  // --- Window Control Buttons ---
  document.getElementById('close-btn').addEventListener('click', () => {
    ipcRenderer.send('window-control', 'close');
  });

  document.getElementById('minimize-btn').addEventListener('click', () => {
    ipcRenderer.send('window-control', 'minimize');
  });

  document.getElementById('maximize-btn').addEventListener('click', () => {
    ipcRenderer.send('window-control', 'maximize');
  });

  // --- Grey out when window not in use ---
  window.addEventListener('blur', () => {
    body.classList.add('inactive');
  });

  window.addEventListener('focus', () => {
    body.classList.remove('inactive');
  });
};

