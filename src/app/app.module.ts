import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule  }    from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { AppRoutes } from './app.routes';
import { HttpModule } from '@angular/http';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule,HTTP_INTERCEPTORS  } from '@angular/common/http';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule} from 'ngx-pagination'; 
import { TabModule} from 'angular-tabs-component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { CeilPipe } from 'angular-pipes';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';


import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component'


import { NavbarService } from './navbar/navbar.service'
import { CommonService } from './_services/common.service';
import { TitleService } from './_services/title.service';
import { AuthenticationService } from './_services/authentication.service';
import { DataService } from './_services/data.service'

import { SpinnerComponent } from './_helper/spinner.component';

import { SortPipe } from './_pipe/sort.pipe';
import { DateFormatPipe } from './_pipe/dateformat.pipe';

import { TokenInterceptor} from './_interceptor/tokeninterceptor.interceptor';

import { NavigationGuard} from './_guard/navigation.guard';
import { MessagelistComponent } from './messagelist/messagelist.component';
import { MessageComponent } from './message/message.component';
import { MessagedetailsComponent } from './messagedetails/messagedetails.component';
import { AdminlistComponent } from './adminlist/adminlist.component' 


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SpinnerComponent,
    SortPipe,
    DateFormatPipe,
    CeilPipe,
    MessagelistComponent,
    MessageComponent,
    MessagedetailsComponent,
    AdminlistComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule ,
    RouterModule.forRoot(AppRoutes,{onSameUrlNavigation: 'reload'}),
    HttpModule,
    ReactiveFormsModule,
    HttpClientModule,
    MyDateRangePickerModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    TabModule,
    NgSelectModule ,
    NgIdleKeepaliveModule.forRoot(),
    PerfectScrollbarModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: PERFECT_SCROLLBAR_CONFIG,useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG}, 		
  	NavbarService,CommonService,TitleService,AuthenticationService,NavigationGuard,DataService
  	],
  bootstrap: [AppComponent]
})

export class AppModule { 
	constructor(titleService: TitleService) {
    titleService.init();
  }
}
