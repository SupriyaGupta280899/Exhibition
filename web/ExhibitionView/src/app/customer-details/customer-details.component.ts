import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as moment from 'moment'; 
@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {
  name: string;
  mobileNumber: string;
  address: string;
  date:Date
  buy= [];
  sell= [];
  isSearch:Boolean;
 
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  search() {
    this.isSearch=true;
    let date:any
    if(this.date!=undefined)
    {
     date=new Date(this.date).toDateString()
    }
    // this.http.get('http://localhost:4001/findAll', ).subscribe((data: any) => {
    //   console.log("findall", data);

    // }, error => {
    //   console.log("Error", error);
    // });
    this.buy=[];
    this.sell=[];
  
    let params = new HttpParams()
      .set('name', this.name)
      .set('mobileNumber', this.mobileNumber)
      .set('address', this.address);
   
   
    this.http.get('http://localhost:4001/search', {
      params: params // observe: "response",
      // responseType: "text"
    }).subscribe((data: any) => {
    
      if (data.message.length > 0) {
        params = new HttpParams()
          .set('customerId', data.message[0]._id)

       
        this.http.get('http://localhost:4002/findWithCid', { params: params }).subscribe((data1: any) => {
        
          data1.message.forEach(element => {
           
            if(new Date(element.date).toDateString()==date || date==undefined)
            {
            params = new HttpParams()
              .set('_id', element.paintingId)

            this.http.get('http://localhost:4003/findOne', { params: params }).subscribe((data2: any) => {
              let obj={painting:String,date:null};
             obj.painting=data2.message;
             obj.date=new Date(element.date).toDateString();
            if(element.relation=='Buyer'){this.buy.push(obj);}
            else{
             
              this.sell.push(obj);
            }
              
            }, error => {
              console.log("Error", error);
            })
          }
        })
        
        }
          , error => {
            console.log("Error", error);
          })

      }
      else {
        alert("you are not our customer")
      }

    }, error => {
      console.log("Error", error);
    });
  }
  
}
