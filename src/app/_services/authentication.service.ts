
import {throwError as observableThrowError,  Observable ,  throwError as _throw } from 'rxjs';

import {finalize, map} from 'rxjs/operators';
import { Injectable,Output , EventEmitter,Inject } from '@angular/core';
import { HttpClient,HttpHeaders,HttpErrorResponse,HttpParams } from '@angular/common/http';

import { ApplicationSettings } from '../app.config'
import { ApplicationConstants } from '../app.constants';

@Injectable()
export class AuthenticationService {
	@Output() public spinner:EventEmitter<boolean>=null;
	
	   	
    constructor(private httpClient: HttpClient) {
        this.spinner = new EventEmitter<boolean>();
    }
    
    constants = ApplicationConstants;
    authenticateUser(user): Observable<any> {
       this.spinner.emit(true);
       let headers = new HttpHeaders();
	   headers = headers.set("Content-Type", "application/json");
       
	   return this.httpClient.post(ApplicationSettings.API_ENDPOINT+'/login',user,{headers:headers}).pipe(
	       map(res => {
		    	return res;
	        }, error => {
	        	this.handleError;
	            console.log(error);
	            return error;
	        }),finalize(() => {
	        	this.spinner.emit(false);	           		    	
	        }),);
      
	}   
	
	
    /** 
    * Handle error messages raising out of http error
    * 
    */
    private handleError(error: HttpErrorResponse | any) {
        let errMsg: string;
        console.log("Error message received" + JSON.stringify(error));
        if (error instanceof HttpErrorResponse) {
            const err = error.error || JSON.stringify(error);
            errMsg = `Error in communicating to server`;
        } else {
            errMsg = error.error ? error.error : "Server returned exception";
        }
        console.error(errMsg);
        return observableThrowError(errMsg);
    }

}
