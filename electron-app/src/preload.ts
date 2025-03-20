import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electron", {
  checkProgram: () => ipcRenderer.invoke("check-program"),
});
