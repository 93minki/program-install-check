import { app, BrowserWindow, ipcMain } from "electron";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";

let mainWindow: BrowserWindow | null = null;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 400,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
    },
  });

  mainWindow.loadURL("data:text/html,<h1>Electron 실행 중...</h1>");

  ipcMain.handle("check-program", async () => {
    let programPath: string;
    if (os.platform() === "win32") {
      programPath = "C:\\Windows\\System32\\calc.exe";
    } else if (os.platform() === "darwin") {
      programPath = "/System/Applications/Calculator.app";
    } else {
      return { installed: false };
    }

    const isInstalled = fs.existsSync(programPath);
    return { installed: isInstalled };
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
});
