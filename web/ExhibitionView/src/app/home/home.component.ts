import { Component, OnInit, inject } from '@angular/core';
import { CartDialogComponent } from '../cart-dialog/cart-dialog.component';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  allImages = [];
  animal: string;
  public name: string;
  public customerName: string;
  public address: string;
  public contact: number;
  constructor(private http: HttpClient, public dialog: MatDialog) { }


  // constructor(public dialog: MatDialog) {}

  openDialog(pic): void {
    const dialogRef = this.dialog.open(CartDialogComponent, {
      width: '300px',
      height: '400px',
      data: { customerName: this.customerName, address: this.address, contact: this.contact, painting: pic }
    });
    console.log("pic", pic);
    console.log("data", this.customerName);
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      console.log("data", this.customerName);
      // console.log("data", this.data);
      // this.animal = result;
    });
  }

  ngOnInit() {
    //getAllImages(){
    this.http.get('http://localhost:4003/findAll', {
      // observe: "response",
      // responseType: "text"
    }).subscribe((data: any) => {
      console.log("findalldata", data);
      this.allImages = data.message;
    }, error => {
      console.log("Error", error);
    });

    //}
  }


}
