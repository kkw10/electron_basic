const electron = require('electron');
const { app, BrowserWindow, ipcMain } = electron;
const url = require('url');
const path = require('path');
const io = require('socket.io-client');
const axios = require('axios');

const handlerManger = require('./handler_manager');
const SocketService = require('./service/socketService');

const httpInstance = axios.create({
  baseURL: 'http://127.0.0.1:1991'
});

/**
 * [Electron의 프로세스 타입]
 * 1. 메인 프로세스 (단일 프로세스)
 *    => package.json의 main.js 스크립트를 실행한다.
 * 2. 렌더러 프로세스 (멀티 프로세스)
 *    => 크로뮴 기반으로 웹페이지를 GUI로 표시한다.
 */

let win;
let socket;

app.on('ready', () => {
  const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize;
  const options = {
    width,
    height,
    resizable: true,
    fullscreenable: true,
    show: false,
    kiosk: true,
    webPreferences: {
      affinity: true,
      nodeIntegration: true,
    }
  };

  win = new BrowserWindow(options);
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'login.html'),
    protocol: 'file',
  }));
  win.webContents.openDevTools();

  win.setMenu(null);
  win.setMenuBarVisibility(false);

  win.once('ready-to-show', () => {
    console.log('ready to show.');
    win.show();
  });

  win.on('closed', () => {
    console.log('window closed.');
    win = null;
    app.quit();
  });
});

ipcMain.on('signInRequest', (event, message) => {
  httpInstance
    .post('/users/login', message)
    .then((res) => {
      const socketURL = 'ws://127.0.0.1:1991';
      const socketOptions = {
        transports: ['websocket'],
        forceNew: true,
        query: { token: res.data.token }
      };

      socket = SocketService.createSocket(io, socketURL, socketOptions);
      SocketService.addHandler(socket, win, handlerManger);
      event.sender.send('signInRequest-Success', res);
    })
    .catch((err) => {
      console.log(err);
      // const result = {
      //   status: err.response.status,
      //   statusText: error.response.statusText,
      // }
      event.sender.send('signInRequest-Failed', err);
    })
})

app.on('window-all-closed', () => {
  app.quit();
});

app.on('activate', () => {
  app.quit();
});