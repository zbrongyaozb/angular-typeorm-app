import { Component, OnInit } from '@angular/core';
import  { CapacitorSQLite, } from '@capacitor-community/sqlite';
import { User } from './entity/user';
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
      user.firstName = 'sada' + new Date().getTime();
      user.lastName = 'asdas';
      user.email = 'sdasd@qq.com' + new Date().getTime();
      AppDataSource.getRepository(User)
        .save(user)
        .then(() => {
          AppDataSource.getRepository(User)
            .find()
            .then((res) => {
              console.log('user', res);
              CapacitorSQLite.saveToStore({database:'ionic-vue-user'})
              CapacitorSQLite.exportToJson({database:'ionic-vue-user',jsonexportmode:'full'}).then(res=>{
                console.log('res,res',res);
              })
            });
        });
    }, 1000);
  }
}
