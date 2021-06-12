const { app, BrowserWindow } = require('electron');
const path = require('path');
const screenshot = require('screenshot-desktop');
const os = require('os');
const desktopDir = path.join(os.homedir(), "Desktop");
const imageToBase64 = require('image-to-base64');
const axios = require('axios').default;


// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 450,
    height: 680,
    // width: 600,
    // height: 800,
    maximizable: false,
    resizable: false,
    // webPreferences: {
    //     nodeIntegration: true,
    //     contextIsolation: false,
    // }
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'login.html'));
  // mainWindow.setMenuBarVisibility(false);
  

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});


setInterval(() => {
  var randomStr = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  var imgFilename = `${desktopDir}/splaceimage/${randomStr}.png`
  
  screenshot({ filename: imgFilename }).then((img)=>{

    imageToBase64(imgFilename) // Path to the image
      .then(
          (response) => {
              //  Insert into db
              axios.post('http://localhost:8081/screenshot/store', {
                  page: '',
                  image_base64: response,
                  user_id: 0
              }).then(function (res) {
                  // console.log(res.data);
              }).catch(function (err) {
                  console.log(err);
              });
          }
      )
      .catch(
          (error) => {
            console.log("base64 error");
              console.log(error); // Logs an error if there was one
          }
      )

  })
    
  // screenshot({ filename: randomStr+".png" }).then((imgPath) => {
  //   // imgPath: absolute path to screenshot
  //   // created in current working directory named shot.png
  // });
  
},3000);

//FUNCTIONS



app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
    
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
