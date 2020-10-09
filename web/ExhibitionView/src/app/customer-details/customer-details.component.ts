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
  date: Date
  buy = [];
  sell = [];
  bname: String;
  bnumber: Number;
  binfo: Boolean;
  isSearch: Boolean;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  search() {
    this.binfo = false;
    this.isSearch = true;
    let date: any
    if (this.date != undefined) {
      date = moment(new Date(this.date)).format("MM/DD/YYYY")
    }
    this.buy = [];
    this.sell = [];
    let params = new HttpParams()
      .set('name', this.name)
      .set('mobileNumber', this.mobileNumber)
      .set('address', this.address);
    this.http.get('http://roost-worker:4001/search', {
      params: params
    }).subscribe((data: any) => {
      if (data.message.length > 0) {
        alert("Wait for a minute Your Paintings are still Loading........")
        params = new HttpParams()
          .set('customerId', data.message[0]._id)
        this.http.get('http://roost-worker:4002/findWithCid', { params: params }).subscribe((data1: any) => {
          if(data1.message.length==0)
          {
            alert("Sorry! No Painting found")
          }
          if(!data1.message.filter(item=>{if(date==undefined)
            {return item}return  moment(new Date(item.date)).format("MM/DD/YYYY") == date  }).length)
          {
            alert("Sorry! No Painting found for specific date")
          }
          console.log(data1,"data1")
          data1.message.forEach(element => {
            if (moment(new Date(element.date)).format("MM/DD/YYYY") == date || date == undefined) {
              params = new HttpParams()
                .set('_id', element.paintingId)
              this.http.get('http://roost-worker:4003/findOne', { params: params }).subscribe((data2: any) => {
                let obj = { painting: String, date: null };
                obj.painting = data2.message;
                obj.date = moment(new Date(element.date)).format("MM/DD/YYYY");
                if (element.relation == 'Buyer') { this.buy.push(obj); }
                else {
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
        alert("Oops!you are not our customer")
      }
    }, error => {
      console.log("Error", error);
    });
  }
}
