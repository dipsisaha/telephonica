import { Routes } from '@angular/router'; 
import { MessagelistComponent } from './messagelist/messagelist.component';
import { MessageComponent } from './message/message.component';
import { MessagedetailsComponent } from './messagedetails/messagedetails.component';
import { AdminlistComponent } from './adminlist/adminlist.component';
import { ApplicationConstants } from './app.constants'
import { NavigationGuard} from './_guard/navigation.guard' 


export const AppRoutes:Routes = [
    { path :'user',component : MessagelistComponent,data:{org:'user',title: "Message"}},
    { path : 'message',component :MessageComponent,data:{org:'user',title: "Create Message"}},
    { path : 'messagedetails/:txhash',component :MessagedetailsComponent,data:{org:'user',title: "Message Details"}},
    { path :'admin',component : AdminlistComponent,data:{org:'admin',title: "Message"}},
    { path : 'admin/messagedetails/:txhash',component :MessagedetailsComponent,data:{org:'admin',title: "Message Details"}},
    
];