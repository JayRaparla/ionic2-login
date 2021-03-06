import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
// Angular 2 services, directives and objects
import { FORM_DIRECTIVES, FormBuilder,  ControlGroup, Validators, AbstractControl } from '@angular/common';
import {CustomValidators} from '../../validators/CustomValidators';
import {Focuser} from '../../components/focuser/focuser';
//import {ShowHidePassword} from '../../components/show-hide-password/show-hide-password';

/*
  Generated class for the FormPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/form/form.html',
  directives: [FORM_DIRECTIVES, Focuser]
})
export class FormPage {

  authForm: ControlGroup;
  username: AbstractControl;
  password: AbstractControl;
  type: string = 'password';
  ios: string = 'ios-eye-off';
  md: string = 'md-eye-off';
  emailPattern: string;

  constructor(
    private nav: NavController,
    fb: FormBuilder
  ) {
    this.emailPattern = '^[_a-z0-9]+(\\.[_a-z0-9]+)*@[a-z0-9-]+(\\.[a-z0-9-]+)*(\\.[a-z]{2,4})$';
    console.log(this.emailPattern);
    // the form fields are group into the authForm
    this.authForm = fb.group({
      // defines three validation rules
      // required and minLenght are Angular2 predefined validators
      // checkFirstCharacterValidator is a custom validator
      'username': ['alessia.raimondi@athesys.it', Validators.compose([Validators.required, Validators.minLength(8), Validators.pattern(this.emailPattern)])],
      'password': ['Passw0rd', Validators.compose([Validators.required, Validators.minLength(8), CustomValidators.checkFirstCharacterValidator])] 
    })

    // connect the abstract controls with the fields in the HTML side
    this.username = this.authForm.controls['username'];
    this.password = this.authForm.controls['password'];
  }

  onSubmit(value): void { 
    if(this.authForm.valid) {
      console.log('Submitted value: ', value);
      // This is an easy example, so we're not going to check if authorization was successful
      window.localStorage.setItem('username', value.controls.username.value);
      window.localStorage.setItem('password', value.controls.password.value);

      this.nav.push(HomePage); 
    }
  }; 

  showPwd() {
    console.log('Show Pwd');
    if(this.type === 'password'){
      this.type = 'text';
      this.ios = 'ios-eye';
      this.md = 'md-eye';
    }
    else {
      this.type = 'password';
      this.ios = 'ios-eye-off';
      this.md = 'md-eye-off';
    }
  }

  clearInput(form){
    console.log(form.controls['username'].value);
    form.controls['username'].updateValue('');
    form.controls['username']['_pristine']=true;
  }
}
