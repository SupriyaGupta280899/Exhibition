import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  allImages = [];
  constructor(private http: HttpClient) { }
  
  ngOnInit(){
  //getAllImages(){
    this.http.get('http://localhost:4003/findAll',{
      // observe: "response",
      // responseType: "text"
    }).subscribe((data:any) => {
      console.log("findalldata",data);
    this.allImages = data.message;
    }, error => {
        console.log("Error", error);
    });

  //}
}
  

}
