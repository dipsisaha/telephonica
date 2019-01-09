import { Component, OnInit } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { MessageService } from '../_services/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-messagelist',
  templateUrl: './messagelist.component.html',
  styleUrls: ['./messagelist.component.css']
})
export class MessagelistComponent implements OnInit {

  public listdata=[];
  public errorMsg;
  public txhash;
  public txHashnotification=false;
  public modalview=false;
  public token ; 

  constructor(private router: Router,private _messageService:MessageService) { }
  config: PerfectScrollbarConfigInterface = { 
    suppressScrollX: true,
    suppressScrollY: false
    } 

  ngOnInit() {

    if(sessionStorage.getItem('txHashtoken')!=null){
      this.txHashnotification = true;
      this.token = sessionStorage.getItem('txHashtoken');
    }

      this._messageService.getAllMessageList().subscribe(data =>{
        this.listdata   = data;    
        console.log(data);                                                 
    },error =>this.errorMsg  = error ); 
  }

  messageWindow() {
    this.router.navigate(['/message']);
  }
  searchTxHash(txhash){

    this.router.navigate(['/messagedetails/',txhash]);
  }
  clearSearch(){
  	this.txhash = '';
  }
  clickMe(){
      this.modalview=true;  
  }
  close() {
    this.modalview=false;
  }

  // copy to clipboard

  copyInputMessage(inputElement){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
    sessionStorage.removeItem('txHashtoken');
    sessionStorage.clear();
    this.txHashnotification = false;
    this.close();
  }

}
