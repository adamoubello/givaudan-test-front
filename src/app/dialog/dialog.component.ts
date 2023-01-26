//dialog-box.component.ts
import { Component, Inject, Optional } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Customer, CustomerAction } from '../core/models/customer';

/*export interface UsersData {
  name: string;
  id: number;
}*/

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

  action:string;
  local_data:any;
  formdata: any;
  userName: string;
  local_customer: Customer;
  local_action:any;

  constructor( public dialogRef: MatDialogRef<DialogComponent>,
               //@Optional() is used to prevent error if no data is passed
               @Optional() @Inject(MAT_DIALOG_DATA) public data: CustomerAction) {
    
    //this.local_data = {...data};
    this.local_customer = data.cust;
    this.local_action = data.action
    //this.action = this.local_data.action;
    console.log(this.local_customer);
    /*if(this.local_action == 'add') {
      this.local_customer.id = "10";
      this.local_customer.firstName = "test";
      this.local_customer.lastName = "testing";
      this.local_customer.role = "admin";
      this.local_customer.amount = 20;
    }*/
  }

  ngOnInit() { 
    this.formdata = new FormGroup({ 
       id: new FormControl(this.local_customer.id),
       firstName: new FormControl(this.local_customer.firstName),
       lastName: new FormControl(this.local_customer.lastName),
       role: new FormControl(this.local_customer.role),
       amount: new FormControl(this.local_customer.amount)
    }); 
  }

  onClickSubmit(data: any) {
    this.userName = data.userName;
  }

  doAction(formdata: any){
    console.log(formdata);
    this.dialogRef.close({event:this.local_action, data: formdata.value});
  }

  closeDialog(){
    
    this.dialogRef.close({event:'Cancel'});
  }

}
