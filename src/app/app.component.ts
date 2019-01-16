import { Component } from '@angular/core';
import { Router,NavigationEnd,ActivatedRoute  } from '@angular/router';
import { ApplicationConstants } from './app.constants';
import { DatePipe } from '@angular/common';
import { DataService } from "./_services/data.service";
import { filter, map, switchMap } from 'rxjs/operators';

const ORG_TYPE = 'user';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  Clock = Date.now();
  public orgName = 'user';
  public errorMsg;
 
  constants = ApplicationConstants;
  
  constructor(private router: Router,private activatedRoute: ActivatedRoute, private data:DataService) { 
  }
  
  ngOnInit() {  

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => route.firstChild),
      switchMap(route => route.data),
      map((data) => {
        if (data.org) {
          // If a route has a title set (e.g. data: {org: "Foo"}) then we use it
          return data.org;

          console.log("=--------"+data.org);
        } else {
          return ORG_TYPE;
        }
      })
    ).subscribe(
      data=>{this.orgName=data;
        console.log("=+++++++++++"+this.orgName);
        sessionStorage.setItem('org', this.orgName);
      },error =>this.errorMsg  = error
    );

    setInterval(() => {
      this.Clock = Date.now();
    }, 1000);
        
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0)
        }); 
  }
}
