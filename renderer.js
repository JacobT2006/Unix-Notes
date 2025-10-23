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

  const { ipcRenderer } = require('electron');
})