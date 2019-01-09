import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from '../_services/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  model: any = {"to":"","message":""}; 
  public errorMsg;

  constructor(public router: Router,private activatedRoute: ActivatedRoute,private _messageService:MessageService) { }

  ngOnInit() {
  }

  backTomessagelist() {
    this.router.navigate(['/']);
  }

  sendMessage() {
    let currenttime =  Date.now();
    let to = this.model.to;
    let message = this.model.message;
   // let loginReqJson = {"to":this.model.to,"message":this.model.message,"from":9830115801,"vendor":"ABC News","timestamp":currenttime};

   this._messageService.sendMessage(to,message,currenttime)
                   .subscribe(data =>{
                    console.log(data);
                    sessionStorage.setItem('txHashtoken', data['txHash']);
                    this.router.navigate(['/']);
                   },
                   error =>this.errorMsg  = error );
  }

}
