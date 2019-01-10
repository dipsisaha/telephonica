import { Component } from '@angular/core';
import { Router,NavigationEnd,ActivatedRoute  } from '@angular/router';
import { ApplicationConstants } from './app.constants';
import { DatePipe } from '@angular/common';
import { DataService } from "./_services/data.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  Clock = Date.now();
  orgName = 'user';
 
  constants = ApplicationConstants;
  
  constructor(private router: Router,private activatedRoute: ActivatedRoute, private data:DataService) { 
  }
  
  ngOnInit() {  
    //this.data.currentOrgId.subscribe(orgId => this.orgName = orgId);
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
