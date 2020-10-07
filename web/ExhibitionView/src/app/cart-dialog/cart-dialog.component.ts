import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import Swal from 'sweetalert2/dist/sweetalert2.js';
// import { MatFormFieldModule } from '@angular/material/form-field';

// import {Component, Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import {MatInputModule} from '@angular/material/input';
export interface DialogData {
  customerName: string,
  address: string,
  contact: number,
  painting: {
    imgType: string,
    name: string,
    status: boolean,
    _id: string
  }
  // animal: string;
  // name: string
}
@Component({
  selector: 'app-cart-dialog',
  templateUrl: './cart-dialog.component.html',
  styleUrls: ['./cart-dialog.component.css']
})
export class CartDialogComponent implements OnInit {
  postId: number;
  customerId: string;
  relation: string = "Buyer";
  constructor(private http: HttpClient, private router: Router,
    public dialogRef: MatDialogRef<CartDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }
  placeOrder() {
    this.http.post<any>('http://localhost:4001/add', {
      "address": `${this.data.address}`,
      "name": `${this.data.customerName}`,
      "mobileNumber": `${this.data.contact}`
    }).subscribe(data => {
      console.log(data);
      if (data) {
        this.customerId = data.message;
        console.log
          ("customer updated Successfully");
        this.http.post<any>('http://localhost:4002/add', {
          "paintingId": `${this.data.painting._id}`,
          "customerId": `${this.customerId}`,
          "relation": `${this.relation}`
        }).subscribe(cprData => {
          // this.postId = data
          console.log(cprData);
          if (cprData) {
            console.log
              ("cpr updated Successfully");
            this.dialogRef.close();
            this.http.put<any>('http://localhost:4003/updateStatus', {
              "_id": `${this.data.painting._id}`,
            }).subscribe(paintingData => {
              // this.postId = data
              console.log(paintingData);
              if (paintingData) {
                console.log
                  ("painting updated Successfully");
                // Swal.fire({
                //   title: "Are you sure?",
                //   text: "Once deleted, you will not be able to recover this imaginary file!",
                //   type: 'warning',
                //   showConfirmButton: true,
                //   showCancelButton: true     
                // })
                this.dialogRef.close();
                alert("Orderd Successfully! Pay the bill at the time of delivery.\nThank you")
                // this.router.navigate(["/book"]);
              }
              else {
                // alert("Sorry couldn,t add book");
                this.dialogRef.close();
                // this.router.navigate(["/book"]);
              }
            });
            // this.dialogRef.close();
            // this.router.navigate(["/book"]);
          }
          else if (!cprData) {
            // alert("Sorry couldn,t add book");
            this.dialogRef.close();
            // this.router.navigate(["/book"]);
          }
        });
        // this.dialogRef.close();
        // this.router.navigate(["/book"]);
      }
      else {
        // alert("Sorry some error occured");
        this.dialogRef.close();
        // this.router.navigate(["/book"]);
      }
    });
  }
}
