const {electron, BrowserWindow, app, Tray, nativeImage} = require('electron');
const path = require('path');
const config = require('./react/config/app.js');

let pluginName;
switch (process.platform) {
    case 'win32':
        pluginName = 'pepflashplayer.dll';
        break;
    case 'linux':
        pluginName = 'libpepflashplayer.so';
        break
}
app.commandLine.appendSwitch('ppapi-flash-path', path.join(__dirname, pluginName));

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({
		show: false,
		frame: false,
		height: parseInt(config.height * config.initialSize) + config.headerHeight,
		width: parseInt(config.width * config.initialSize),
		resizable: false,
		alwaysOnTop: false,
		maximizable: false,
		webPreferences: {
			plugins: true
		}
  });

  mainWindow.loadURL(`file://${__dirname}/index.html`);
  // mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  });

	global.tray = new Tray(nativeImage.createFromPath(path.join(__dirname, 'assets/images/icon.png')));

	mainWindow.once('ready-to-show', () => {
		mainWindow.show()
	})
}

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
});
