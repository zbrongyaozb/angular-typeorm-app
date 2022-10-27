import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.capacitor.ng.typeorm',
  appName: 'angular-typeorm-app',
  webDir: 'dist/angular-typeorm-app',
  bundledWebRuntime: false,
  plugins: {
    CapacitorSQLite: {
      electronWindowsLocation: 'CapacitorDatabases',
      electronMacLocation: 'CapacitorDatabases',
      electronLinuxLocation: 'CapacitorDatabases'
    }
  }
};

export default config;
