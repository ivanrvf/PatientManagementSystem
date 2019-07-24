import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { JsonApiService } from '@app/core/services';
import { FormGroup, FormControl, Validator, FormGroupName, FormControlName, FormBuilder, FormArray, FormArrayName } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    templateUrl: './list.component.html',
    styleUrls: [

        // material theme from ngx-datatable teem
        // '../../../../node_modules/@swimlane/ngx-datatable/release/themes/material.css',
        // '../../../../node_modules/@swimlane/ngx-datatable/release/assets/icons.css',
        './smartadmin-ngx-datatable.css'
    ],
    encapsulation: ViewEncapsulation.None
})
export class ListComponent implements OnInit {

    public REST_ROOT = 'http://localhost:52763/api/Customer';

    @ViewChild('myTable') table: any;
    @ViewChild('myTableAddress') myTableAddress: any;
    @ViewChild('mdModal') mdModal: any;
    rows: any;
    addresses: any;
    expanded: any = {};
    timeout: any;
    myForm: FormGroup;
    fb = new FormBuilder();
    addressList = new Array<any>();
    contactList = new Array<any>();
    //firstname= new FormControl();
    //middlename = new FormControl();
    //lastname = new FormControl();
    //emailaddress = new FormControl();
    options = {
        dom: "Bfrtip",
        ajax: (data, callback, settings) => {
            this.http.get(this.REST_ROOT)
                .pipe(
                    map((data: any) => (data.data || data)),
                    catchError(this.handleError),
                )
                .subscribe((data) => {
                    console.log('data from rest endpoint', data);
                    callback({
                        aaData: data.slice(0, 100)
                    })
                })
        },
        columns: [
            { data: "CustomerID" },
            { data: "FirstName" },
            { data: "MiddleName" },
            { data: "LastName" },
            { data: "EmailAddress" },
            { data: "CustomerTypeDescription" },
        ]
    };

    constructor(router: Router, private http: HttpClient, private jsonApiService: JsonApiService) {
        this.myForm = new FormGroup(
            {
                CustomerID: new FormControl(),
                FirstName: new FormControl(),
                MiddleName: new FormControl(),
                LastName: new FormControl(),
                EmailAddress: new FormControl(),
                addresses: this.fb.array([
                    //this.fb.control(''),
                    //this.fb.control(''),
                    //this.fb.control(''),
                    //this.fb.control('')
                ]),
                contactList: this.fb.array([
                    //this.fb.control(''),
                    //this.fb.control('')
                ])
            });
    }

    ngOnInit() {
        this.http.get(this.REST_ROOT).subscribe(data => {
            this.rows = data;
        })
       /* this.rows = {
            dom: "Bfrtip",
            ajax: (data, callback, settings) => {
                this.http.get(this.REST_ROOT)
                    .pipe(
                        map((data: any) => (data.data || data)),
                        catchError(this.handleError),
                    )
                    .subscribe((data) => {
                        console.log('data from rest endpoint', data);
                        callback({
                            aaData: data.slice(0, 100)
                        })
                    })
            },
            columns: [
                { data: "CustomerID" },
                { data: "FirstName" },
                { data: "MiddleName" },
                { data: "LastName" },
                { data: "EmailAddress" },
                { data: "CustomerTypeDescription" },
            ]
        };*/
  }

    private handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

    onWizardComplete(data) {
        console.log(data);
        var addList = [];
        var arrAddress = data.get('addresses') as FormArray
        var arrContactList = data.get('contactList') as FormArray
        var phoneList = [];
        var i = 0, j = 0;
     
        for (let address of arrAddress.controls) {
            
            if (i % 4 == 0) {
                addList.push({ AddressLine1: "", AddressLine2: "", City: "", State: "" });
                j++;
                var element = addList[j - 1];
                element.AddressLine1 = address.value;
                addList[j - 1] = element;
            }
            else if (i % 4 == 1) {
                var element = addList[j - 1];
                element.AddressLine2 = address.value;
                addList[j - 1] = element;
            }
            else if (i % 4 == 2) {
                var element = addList[j - 1];
                element.City = address.value;
                addList[j - 1] = element;
            }
            else {
                var element = addList[j - 1];
                element.State = address.value;
                addList[j - 1] = element;

            }
            i++;
        }
        j = 0; i = 0;
        for (let contact of arrContactList.controls) {
            if (i % 3 == 0) {
                phoneList.push({ PhoneExt: "", PhoneNumber: "", CustomerPhoneNumberType: "" });
                j++;
                var element = phoneList[j - 1];
                element.PhoneExt = contact.value;
                phoneList[j - 1] = element;
            }
            else if (i % 3 == 1) {
                var element = phoneList[j - 1];
                element.PhoneNumber = contact.value;
                phoneList[j - 1] = element;
            }
            else {
                var element = phoneList[j - 1];
                element.CustomerPhoneNumberType = contact.value;
                phoneList[j - 1] = element;
            }
            i++;
        }
        this.http.put(this.REST_ROOT + "/" + data.get('CustomerID').value, {
            CustomerID: data.get('CustomerID').value,
            FirstName: data.get('FirstName').value,
            MiddleName: data.get('MiddleName').value,
            LastName: data.get('LastName').value,
            EmailAddress: data.get('EmailAddress').value,
            addresses: addList,
            contactList: phoneList
        }).subscribe(data => {
            console.log('fuel-ux wizard complete', data)
        });
    }

    onPage(event) {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            console.log('paged!', event);
        }, 100);
    }


    toggleExpandRow(row) {
        console.log('Toggled Expand Row!', row);
        this.addresses = row.addresses;
        this.table.rowDetail.toggleExpandRow(row);
    }
    toggleExpandRow1(row) {
        debugger;
        console.log('Toggled Expand Row!', row);
        console.log('table', this.table);
        this.myTableAddress.rowDetail.toggleExpandRow(row);
        
    }
    toggleExpandRow2(row) {
        console.log('Toggled Expand Row!', row);
        this.table.rowDetail.toggleExpandRow(row);

    }

    onDetailToggle(event) {
        console.log('Detail Toggled', event);
    }
    show(event) {
        var arrAddress;
        var arrContact;

        console.log(this.myForm)
        console.log(this.fb)
        arrAddress = this.myForm.get('addresses') as FormArray;
        debugger;
        while (arrAddress.length !== 0) {
            arrAddress.removeAt(0)
        }
        while (this.myForm.value.addresses.length !== 0) {
            this.myForm.value.addresses.removeAt(0)
        }
        for (var value of event.addresses) {
           // arr.push(this.fb.group({ name: 'address' }));
            arrAddress.push(this.fb.control(value.AddressLine1));
            this.addressList.push(value.AddressLine1);
            arrAddress.push(this.fb.control(value.AddressLine2));
            this.addressList.push(value.AddressLine2);
            arrAddress.push(this.fb.control(value.City));
            this.addressList.push(value.City);
            arrAddress.push(this.fb.control(value.State));
            this.addressList.push(value.State);
        }
        arrContact = this.myForm.get('contactList') as FormArray
        for (var value of event.contactList) {
            // arr.push(this.fb.group({ name: 'address' }));
            arrContact.push(this.fb.control(value.PhoneExt));
            this.contactList.push(value.PhoneExt);
            arrContact.push(this.fb.control(value.PhoneNumber));
            this.contactList.push(value.PhoneNumber);
            arrContact.push(this.fb.control(value.CustomerPhoneNumberType));
            this.contactList.push(value.CustomerPhoneNumberType);
        }

        //for (let address of event.addresses) {
         //   this.addressList.push( { AddressLine1: address.AddressLine1, AddressLine2: address.AddressLine2, City: address.City, State: address.State });
        //}
        //console.log("Address List: "+ this.addressList)
        //for (let contact of event.contactList) {
         //   this.contactList.push( { PhoneExt: contact.PhoneExt, PhoneNumber: contact.PhoneNumber });
        //}
        //console.log("Contact List: " + this.contactList);
        this.myForm.reset();
        this.myForm.setValue({
            CustomerID:event.CustomerID,
            FirstName: event.FirstName,
            MiddleName: event.MiddleName,
            LastName: event.LastName,
            EmailAddress: event.EmailAddress,
            addresses: this.addressList,
            contactList: this.contactList
        });
        
        //console.log('Address: ' + this.myForm.get('addresses').value )
        this.mdModal.show();//.css('display', 'block');
        //console.log(arr.controls);
        console.log(this.myForm);
    }
}
