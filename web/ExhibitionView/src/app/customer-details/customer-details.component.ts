import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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
  // fun(pid) {
  //   console.log(pid,"pid")
  //   this.binfo = true;
  //   let params = new HttpParams()
  //     .set('paintingId', pid)
  //   this.http.get('http://localhost:4002/findWithPid', { params: params }).subscribe((data1: any) => {
  //     let obj = data1.message.filter(item => { return item.relation == 'Buyer' })[0];
  //     params = new HttpParams()
  //       .set('_id', obj.customerId)
  //     this.http.get('http://localhost:4001/findOne', {
  //       params: params
  //     }).subscribe((data: any) => {
  //       this.bname = data.message[0].name;
  //       this.bnumber = data.message[0].mobileNumber;
  //     }, error => {
  //       console.log(error)
  //     });
  //   }, error => {
  //     console.log(error)
  //   })
  // }
  search() {
    this.binfo = false;
    this.isSearch = true;
    let date: any
    if (this.date != undefined) {
      date = new Date(this.date).toDateString()
    }
    this.buy = [];
    this.sell = [];
    let params = new HttpParams()
      .set('name', this.name)
      .set('mobileNumber', this.mobileNumber)
      .set('address', this.address);
    this.http.get('http://localhost:4001/search', {
      params: params
    }).subscribe((data: any) => {
      if (data.message.length > 0) {
        alert("Wait for a minute Your Paintings are still Loading........")
        params = new HttpParams()
          .set('customerId', data.message[0]._id)
        this.http.get('http://localhost:4002/findWithCid', { params: params }).subscribe((data1: any) => {
          if(data1.message.length==0)
          {
            alert("Sorry! No Painting found")
          }
          if(!data1.message.filter(item=>{if(date==undefined)
            {return item}return  new Date(item.date).toDateString() == date  }).length)
          {
            alert("Sorry! No Painting found for specific date")
          }
          console.log(data1,"data1")
          data1.message.forEach(element => {
            if (new Date(element.date).toDateString() == date || date == undefined) {
              params = new HttpParams()
                .set('_id', element.paintingId)
              this.http.get('http://localhost:4003/findOne', { params: params }).subscribe((data2: any) => {
                let obj = { painting: String, date: null };
                obj.painting = data2.message;
                obj.date = new Date(element.date).toDateString();
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
