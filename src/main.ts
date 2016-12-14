import * as electron from 'electron';
import {app, BrowserWindow, dialog} from 'electron';

var mainWindow: Electron.BrowserWindow = null;

app.on('window-all-closed', function() {
    if (process.platform != 'darwin') {
        app.quit();
    }
});

app.on('ready', function() {

    var opts: Electron.ShowMessageBoxOptions = {
        message: 'test',
        buttons: ['ok']
    };
    dialog.showMessageBox(opts);

    mainWindow = new BrowserWindow({
        width: 800,
        height: 600
    });

    mainWindow.loadURL('file://' + __dirname + '/ux/index.html');
    mainWindow.webContents.on('did-finish-load', () => {
        mainWindow.setTitle(app.getName());
    });
    mainWindow.toggleDevTools();

    mainWindow.on('closed', function() {
        mainWindow = null;
    });
});