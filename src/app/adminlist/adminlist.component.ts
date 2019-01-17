import { Component, OnInit } from '@angular/core';
import {IMyDrpOptions} from 'mydaterangepicker';
import { MessageService } from '../_services/message.service';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminlist',
  templateUrl: './adminlist.component.html',
  styleUrls: ['./adminlist.component.css']
})
export class AdminlistComponent implements OnInit {

  private model;
  public listdata=[];
  public detaildata=[];
  public errorMsg;
  public modalview=false;
  myDateRangePickerOptions: IMyDrpOptions = {
    dateFormat: 'mmm dd yyyy',
    
  };

  constructor(private _messageService:MessageService,private router: Router) { }
  config: PerfectScrollbarConfigInterface = { 
    suppressScrollX: true,
    suppressScrollY: false
    } 

  ngOnInit() {

    let currentDate = new Date();   
    let priorDate = new Date(new Date().setDate(new Date().getDate() - 30) );

    this.model = { beginDate: {year: priorDate.getFullYear(), month: priorDate.getMonth()+1, day: priorDate.getDate()},
   				   endDate: {year: currentDate.getFullYear(), month: currentDate.getMonth()+1, day: currentDate.getDate()}
      };

      this.searchMessageList(null,null);
  }

onDateRangeChanged(event){
    let beginDate=0;
    let endDate=0;
 
    if(event.beginJsDate && event.endJsDate){	
      beginDate = new Date(this.getFormattedDate(event.beginDate)).getTime();
      endDate = new Date(this.getFormattedDate(event.endDate)).getTime();
      
    } 

    this.searchMessageList(beginDate,endDate);
 }

 getFormattedDate(date){
  return date.year + '-' + date.month + '-' + date.day;
}


searchMessageList(bDate,eDate){
  let beginDate=0;
  let endDate=0;
  if(this.model){			
    if(this.model.beginDate && this.model.endDate){
        beginDate = new Date(this.getFormattedDate(this.model.beginDate)).getTime();
        endDate = new Date(this.getFormattedDate(this.model.endDate)).getTime(); 	
      }
  }

if(bDate && eDate){
  beginDate=bDate;
   endDate=eDate;
}

  this._messageService.searchMessageForAdmin(beginDate,endDate).subscribe(data =>{
    this.listdata   = data;    
    console.log(data);                                                 
  },error =>this.errorMsg  = error ); 
    console.log(this.listdata);
}

viewdetails(txhash){
  console.log(txhash);
  this.router.navigate(['admin/messagedetails/',txhash]);
}

clickMe(txhash){
  this.detaildata=[];
  this.modalview=true; 
  this._messageService.searchMessageWithTxHash(txhash)
    .subscribe(data =>{
     this.detaildata   =  data;  
     console.log(data);
    },
    error =>this.errorMsg  = error );
  
}

close() {
  this.modalview=false;
}

}
