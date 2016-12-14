import * as electron from 'electron';
import {app, BrowserWindow, dialog, ipcMain} from 'electron';

var mainWindow: Electron.BrowserWindow = null;

app.on('window-all-closed', function() {
    if (process.platform != 'darwin') {
        app.quit();
    }
});

app.on('ready', function() {

    let opts: Electron.ShowMessageBoxOptions = {
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
    mainWindow.webContents.toggleDevTools();

    ipcMain.on('app-dlg-message', (event, msg) => {
        var dlgOpts: Electron.ShowMessageBoxOptions = {
            message: msg,
            buttons: ['ok']
        };
        dialog.showMessageBox(dlgOpts);
    });

    mainWindow.on('closed', function() {
        mainWindow = null;
    });
});