import { Injectable,Output , EventEmitter,Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpHeaders,HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { MessageList } from '../_model/message';
import { ApplicationSettings } from '../app.config'
import { ApplicationConstants } from '../app.constants';
import {finalize, map} from 'rxjs/operators';
import 'rxjs/add/operator/finally';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  @Output() public spinner:EventEmitter<boolean>=null;

  private reqJson = {};
  constants = ApplicationConstants;

  constructor(private http: HttpClient) { 
    this.spinner = new EventEmitter<boolean>();
  }

  getAllMessageList() :Observable<MessageList[]> {

    let _url = "/"+this.constants.API_PREFIX+"/"+this.constants.FUNCTION_GETALLMESSAGE;

    this.spinner.emit(true);
    //this.reqJson=[];
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/json");

    return this.http.get<MessageList[]>(_url,{headers:headers})
    .pipe(
     retry(3), 
     catchError(this.handleError) 
   ).finally(() => {
    this.spinner.emit(false);	    	
  });
  }

  sendMessage(to,message,currenttime):Observable<MessageList[]> {
    let _url = "/"+this.constants.API_PREFIX+"/"+this.constants.FUNCTION_SENDMESSAGE;

    this.spinner.emit(true);
    this.reqJson={"to":to,"message":message,"from":9830115801,"vendor":"ABC News","timestamp":currenttime};
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/json");

    return this.http.post<MessageList[]>(_url,this.reqJson,{headers:headers})
      .pipe(
      retry(3), 
      catchError(this.handleError) 
    ).finally(() => {
      this.spinner.emit(false);	    	
    });
  }

  searchMessageWithTxHash(txhash):Observable<MessageList[]> {
    let _url = "/"+this.constants.API_PREFIX+"/"+this.constants.FUNCTION_MESSAGEQUERY;

    this.spinner.emit(true);
    this.reqJson={"txHash":txhash};
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/json");

    return this.http.post<MessageList[]>(_url,this.reqJson,{headers:headers})
      .pipe(
      retry(3), 
      catchError(this.handleError) 
    ).finally(() => {
      this.spinner.emit(false);	    	
    });

  }

  handleError(error: HttpErrorResponse) {
    return throwError(error.message || "Server Error")
  }

}
