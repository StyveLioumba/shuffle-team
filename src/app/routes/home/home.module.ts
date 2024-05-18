import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {ConfirmationService, MessageService} from "primeng/api";
import {DialogService} from "primeng/dynamicdialog";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeRoutingModule,
  ],
  providers: [
    ConfirmationService,
    MessageService,
    DialogService
  ]
})
export class HomeModule { }
