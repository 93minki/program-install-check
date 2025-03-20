export interface ElectronAPI {
  checkProgram: () => Promise<{ installed: boolean }>;
}

declare global {
  interface Window {
    electron: ElectronAPI;
  }
}
