import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,NavigationEnd } from '@angular/router';
import { MessageService } from '../_services/message.service';
import { filter, map, switchMap } from 'rxjs/operators';
import { ApplicationConstants } from '../app.constants';

@Component({
  selector: 'app-messagedetails',
  templateUrl: './messagedetails.component.html',
  styleUrls: ['./messagedetails.component.css']
})
export class MessagedetailsComponent implements OnInit {

  public txhash="";
  public listdata=[];
  public errorMsg;
  constants = ApplicationConstants;

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
    this.router.navigate(['/user']);
  }
  backToadminmessagelist(){
    this.router.navigate(['/admin']);
  }
}
