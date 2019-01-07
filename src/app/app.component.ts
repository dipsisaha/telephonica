import { Component } from '@angular/core';
import { Router,NavigationEnd  } from '@angular/router';
import { ApplicationConstants } from './app.constants'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  today: number = Date.now();
 
  constants = ApplicationConstants;
  
  constructor(private router: Router) { 
  }
  
  ngOnInit() {  
        
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0)
        }); 
  }
}
