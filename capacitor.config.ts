import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'EmployeeApp',
  webDir: 'www',
  plugins: {
    SQLite: {
      cordova: {
        pluginName: 'cordova-sqlite-storage',
      }
    }
  }
};




export default config;


