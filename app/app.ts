import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HomePage} from './pages/home/home';
import {FormPage} from './pages/form/form';


@Component({
  templateUrl: 'build/app.html'
})
export class MyApp {
  platform: any;
  rootPage: any;

  constructor(platform: Platform) {
    this.platform = platform;
    this.initializeApp();
    this.checkPreviousAuthorization();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      console.log('Platform ready');
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  checkPreviousAuthorization() { 
    if((window.localStorage.getItem('username') === "undefined" || window.localStorage.getItem('username') === null) && 
       (window.localStorage.getItem('password') === "undefined" || window.localStorage.getItem('password') === null)) {
      this.rootPage = FormPage;
    } else {
      this.rootPage = HomePage;
    }
  }
}

ionicBootstrap(MyApp);
