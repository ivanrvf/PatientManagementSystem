import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-auth',
  template: '',
})
//@Injectable()
export class AuthComponent implements OnInit {
    //path: import("D:/Projects/PatientManagementSystem/node_modules/@angular/router/src/router_state").ActivatedRouteSnapshot[];
    //route: import("D:/Projects/PatientManagementSystem/node_modules/@angular/router/src/router_state").ActivatedRouteSnapshot;
    
    constructor(
        private router: Router
    ) {
        
    }
    get verifyAccount() {

        return true;
    }
    canActivate() {
        
        if (!this.verifyAccount) {
            // redirect the user
            this.router.navigate(['/auth/login']);
            return false;
        }
        return true;
    }

    canActivateChild(data) {
        debugger;
        if (!this.verifyAccount) {
            // redirect the user
            this.router.navigate(['/auth/login']);
            return false;
        }
        return true;
    }
  ngOnInit() {
  }

   
}
