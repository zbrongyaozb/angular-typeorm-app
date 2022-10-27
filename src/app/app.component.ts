import { Component, OnInit } from '@angular/core';
import { DataSource } from 'typeorm';
import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';
import { Item } from './entity/item';
import { User } from './entity/user';
import { Capacitor } from '@capacitor/core';
import { AppDataSource } from 'src/main';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-typeorm-app';

  ngOnInit(): void {
    this.test();
  }
  test() {
    setTimeout(() => {
      const user = new User();
      user.firstName = 'sada';
      user.lastName = 'asdas';
      user.email = 'sdasd@qq.com';
      AppDataSource.getRepository(User)
        .save(user)
        .then(() => {
          AppDataSource.getRepository(User)
            .find()
            .then((res) => {
              console.log('user', res);
            });
        });
    }, 1000);
  }
}
