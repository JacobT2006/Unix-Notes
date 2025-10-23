const { app, Menu } = require('electron')

const isMac = process.platform === "darwin"

const template = [
    ...(isMac ? [{
        label: app.name,
        submenu: [
            { role: 'about'},
            { role: 'seperator'},
            { role: 'quit'},
        ]
    }] : []),
    {
        label: 'File',
        submenu: [
          {
            label: 'New Window',
            accelerator: 'CmdOrCtrl+N',
            click: () => {
              const win = new BrowserWindow({
                width: 800,
                height: 600,
                titleBarStyle: 'hidden',
                frame: true, // for custom title bar
              });
              win.loadFile('index.html');
            },
          },
          isMac
            ? { role: 'close' }
            : {
                label: 'Exit',
                accelerator: 'Alt+F4',
                click: () => app.quit(),
              },
        ],
      },
    
      // --- View Menu ---
      {
        label: 'View',
        submenu: [
          { role: 'reload' },
          { role: 'forceReload' },
          { role: 'toggleDevTools' },
          { type: 'separator' },
          { role: 'resetZoom' },
          { role: 'zoomIn' },
          { role: 'zoomOut' },
          { type: 'separator' },
          { role: 'togglefullscreen' },
        ],
      },
    
      // --- Window Menu ---
      {
        label: 'Window',
        submenu: [
          { role: 'minimize' },
          { role: 'zoom' },
          ...(isMac
            ? [{ type: 'separator' }, { role: 'front' }]
            : [{ role: 'close' }]),
        ],
      },
    
      // --- Help Menu ---
      {
        role: 'help',
        submenu: [
          {
            label: 'Learn More',
            click: async () => {
              const { shell } = require('electron');
              await shell.openExternal('https://www.electronjs.org');
            },
          },
        ],
      },
    ];


const contextTemplate = [
    {
        label: "options",
        submenu: [
            {
                label: "UNO",
                click: () => {alert("no bug here")}
            }
        ]
    },
    {
        label: "some more options"
    }
];


module.exports.mainMenu = Menu.buildFromTemplate(template);
module.exports.popupMenu = Menu.buildFromTemplate(contextTemplate);
