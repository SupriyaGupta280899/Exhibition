import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  constructor(private http: HttpClient) { }
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
  selectedFile :any
  _handleReaderLoaded(e) {
    let reader = e.target;
    this.selectedFile = reader.result;
    console.log(this.selectedFile)
  }

  myfunc()
  {
    //send object's data from UI, imageType extract it from this.selectedFile
    let obj = {
      name : "supriya",
      price : 100,
      desc : "aaa",
      img : this.selectedFile,
      imgType : "jpeg"
    }
    
    this.http.post('http://localhost:4003/add',obj,{
      observe: "response",
      responseType: "text"
    }).subscribe((data:any) => {
      console.log("Updates",data);
    }, error => {
        console.log("Error", error);
    });
  }
  ngOnInit(): void {
  }

}
