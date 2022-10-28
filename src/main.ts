import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { Item } from './app/entity/item';
import { User } from './app/entity/user';
import { defineCustomElements as jeepSqlite } from 'jeep-sqlite/loader';
import { Capacitor } from '@capacitor/core';
import { DataSource } from 'typeorm';

const connection = new SQLiteConnection(CapacitorSQLite);
export const AppDataSource = new DataSource({
  type: 'capacitor',
  driver: connection,
  entities: [User, Item],
  logging: ['error', 'query', 'schema'],
  database: 'ionic-vue-user',
  synchronize: true,
});

if (environment.production) {
  enableProdMode();
}
// required for toast component in Browser

// required only if you want to use the jeep-sqlite Stencil component
// to use a SQLite database in Browser
jeepSqlite(window);

window.addEventListener('DOMContentLoaded', async () => {
  // initialize a database
  const initializeApp = async () => {
    const platform = Capacitor.getPlatform();
    console.log('platform',platform);

    try {
      if (platform === `web`) {
        const jeepEl = document.querySelector('jeep-sqlite');
        if (jeepEl != null) {
          document.body.removeChild(jeepEl);
        }
        // required only if you want to use the jeep-sqlite Stencil component
        const jeepSqliteEl = document.createElement('jeep-sqlite');
        document.body.appendChild(jeepSqliteEl);
        await customElements.whenDefined('jeep-sqlite');
        // Initialize the Web store
        await connection.initWebStore();
      }
      console.log('platform',platform);

      await CapacitorSQLite.copyFromAssets({overwrite:true})

      AppDataSource.initialize()
        .then(() => {
          console.log('Data Source has been initialized!');
        })
        .catch((err) => {
          console.error('Error during Data Source initialization', err);
        });
      CapacitorSQLite.checkConnectionsConsistency({
        dbNames: [], // i.e. "i expect no connections to be open"
      }).catch((e) => {
        // the plugin throws an error when closing connections. we can ignore
        // that since it is expected behaviour
        console.log(e);
        return {};
      });
    } catch (err) {
      console.log(`Error: ${err}`);
      throw new Error(`Error: ${err}`);
    }
  };
  initializeApp().then(() => {
    platformBrowserDynamic()
      .bootstrapModule(AppModule)
      .catch((err) => console.log(err));
  });
});
