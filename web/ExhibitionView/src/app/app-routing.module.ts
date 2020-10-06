import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { from } from 'rxjs';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { UploadComponent } from './upload/upload.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: 'home',component:HomeComponent },
  { path: 'about',component:AboutComponent },
  { path: 'buy',component:PlaceOrderComponent },
  { path: 'upload',component:UploadComponent },
  { path: 'viewAction',component:CustomerDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
