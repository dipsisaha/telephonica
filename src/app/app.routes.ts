import { Routes } from '@angular/router'; 
import { MessagelistComponent } from './messagelist/messagelist.component';
import { ApplicationConstants } from './app.constants'
import { NavigationGuard} from './_guard/navigation.guard' 


export const AppRoutes:Routes = [
    { path :'',component : MessagelistComponent,data:{org:'',title: "Message"}},
    { path : 'message',component :MessagelistComponent,data:{org:'',title: "Message"}},
    { path : '**',component : MessagelistComponent,data:{org:'',title: "Message"}},
];