import {Component} from "@angular/core";
import {NavController} from 'ionic-angular';
import { FormPage } from '../form/form';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  username: string;

  constructor(private nav: NavController) {
    this.nav = nav;
    this.username = window.localStorage.getItem('username'); 
  }

  logout(): void { 
    window.localStorage.removeItem('username');
    window.localStorage.removeItem('password');
 
    this.nav.setRoot(FormPage);
    this.nav.popToRoot();   
  } 
}
