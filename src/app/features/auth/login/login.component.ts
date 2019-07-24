import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validator, FormGroupName, FormControlName, FormBuilder, FormArray, FormArrayName } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {

    public a: any;
    myForm: FormGroup;
    fb = new FormBuilder();
    constructor(private router: Router) {
        this.myForm = new FormGroup(
            {
                Username: new FormControl(),
                Password: new FormControl(),
            });
    }
  ngOnInit() {
  }
    
    login(event) {
        debugger;
        this.a = event.controls.Username.value;
        //event.preventDefault();
        this.router.navigate(['/doctors'])
  }

}
