import { Component, OnInit, Inject } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import { VERSION } from '@angular/material';
import { Router } from '@angular/router';

export interface DialogData {
  customerName: string,
  address: string,
  contact: number,
  price: number,
  desc: string,
  paintingName: string,
  selectedFile: any,
  painting: {
    price: number;
    name: string;
    imgType: string,
    status: boolean,
    _id: string,
    desc: string;
  }
  // animal: string;
  // name: string
}

// const file_form: FileInput = this.fileForm.get('file').value;
// const file = file_form.files[0]; // in case user didn't selected multiple files

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  public fileUploadQueue;
  customerId: string;
  paintingId: string;
  relation: string = "Seller";
  form: FormGroup;
  file2Control: FormControl;
  multiple: boolean = false;
  accept: string;
  public files;
  // readonly version = VERSION;

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router, public dialogRef: MatDialogRef<UploadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.file2Control = new FormControl(this.files);
  }

  onFileChanged(event) {
    let file = event.target.files[0]
    let pattern = /image-*/;
    let reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  selectedFile: any
  obj: object;
  _handleReaderLoaded(e) {
    let reader = e.target;
    this.selectedFile = reader.result;
    this.data.selectedFile = reader.result;
    this.obj = {
      name: this.data.paintingName,
      price: this.data.price,
      desc: this.data.desc,
      img: this.data.selectedFile,
      imgType: "jpeg"
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  uploadPainting() {
    let file = this.file2Control.value;
    let pattern = /image-*/;
    let reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
    this.http.post<any>('http://roost-worker:4001/add', {
      "address": `${this.data.address}`,
      "name": `${this.data.customerName}`,
      "mobileNumber": `${this.data.contact}`
    }).subscribe(data => {
      if (data) {
        this.customerId = data.message;
        this.dialogRef.close();
        this.http.post('http://roost-worker:4003/add', this.obj).subscribe((paintingData: any) => {
          console.log(paintingData,"paintingdata")
          if (paintingData.message) {
            this.dialogRef.close();
            this.paintingId = paintingData.message;
            console.log(this.paintingId,"paintingid");
            this.http.post<any>('http://roost-worker:4002/add', {
              "paintingId": `${this.paintingId}`,
              "customerId": `${this.customerId}`,
              "relation": `${this.relation}`
            }).subscribe(cprData => {
              if (cprData) {
                this.dialogRef.close();
                console.log(cprData,"cprdata")
                alert("Uploaded Successfully!.\nThank you")
                this.router.navigate(["/home"]);
              }
            }, error => {
              this.dialogRef.close();
              console.log("Error", error);
            });
          }
          else{
            this.dialogRef.close();
            alert("Sorry! Painting could not be uploaded\nPlease provide a unique Painting Name")
          }
        }, error => {
          console.log("Error", error);
        });
      }
    }, error => {
      this.dialogRef.close();
      console.log("Error", error);
    });
  }
  ngOnInit(): void {
    this.form = this.fb.group({
      file: []
    })
  }

}
