(() => {
  const electron = require('electron');
  const ipcRenderer = electron.ipcRenderer;
  const SocketEvent = require('./handler_manager/event/socket_event');

  ipcRenderer.on(SocketEvent.HELLO, (event, message) => {
    console.log(message);
  });

  const userIdInput = document.getElementById('user-id-input');
  const userPasswordInput = document.getElementById('user-password-input');
  const signInButton = document.getElementById('button-SignIn');
  const signUpButton = document.getElementById('button-SignUp');

  signInButton.addEventListener('click', () => {
    console.log('signIn button click');
    const id = userIdInput.value;
    const password = userPasswordInput.value;
    const param = {
      id,
      password
    };
    ipcRenderer.send('signInRequest', param);
  });

  ipcRenderer.on('signInRequest-Success', (event, message) => {
    console.log(message);
    alert(message.statusText);
  });

  ipcRenderer.on('signInRequest-Failed', (event, message) => {
    console.log(message);
    alert(message.statusText);
  });

  signUpButton.addEventListener('click', () => {
    console.log('signUp button click');
    const id = userIdInput.value;
    const password = userPasswordInput.value;
    const param = {
      id,
      password
    };
    ipcRenderer.send('signUpRequest', param);
  });

  ipcRenderer.on('signUpRequest-Success', (event, message) => {
    console.log(message);
    alert(message.statusText);
  });

  ipcRenderer.on('signUpRequest-Failed', (event, message) => {
    console.log(message);
    alert(message.statusText);
  });
})();
