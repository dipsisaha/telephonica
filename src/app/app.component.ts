import { Component } from '@angular/core';
import { Router,NavigationEnd  } from '@angular/router';
import { ApplicationConstants } from './app.constants'
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  Clock = Date.now();
 
  constants = ApplicationConstants;
  
  constructor(private router: Router) { 
  }
  
  ngOnInit() {  
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
