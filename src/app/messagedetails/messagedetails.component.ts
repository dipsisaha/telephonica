import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from '../_services/message.service';

@Component({
  selector: 'app-messagedetails',
  templateUrl: './messagedetails.component.html',
  styleUrls: ['./messagedetails.component.css']
})
export class MessagedetailsComponent implements OnInit {

  public txhash="";
  public listdata=[];
  public errorMsg;

  constructor(public router: Router,private activatedRoute: ActivatedRoute,private _messageService:MessageService) { }

  ngOnInit() {
    this.txhash = this.activatedRoute.snapshot.paramMap.get('txhash');
    this._messageService.searchMessageWithTxHash(this.txhash)
    .subscribe(data =>{
     this.listdata   =  data;  
     console.log(data);
    },
    error =>this.errorMsg  = error );
  }

  backTomessagelist() {
    this.router.navigate(['/']);
  }
}
