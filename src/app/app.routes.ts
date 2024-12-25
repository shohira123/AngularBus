import { Routes } from '@angular/router';
import { SearchComponent } from './pages/search/search.component';
import { BookingComponent } from './pages/booking/booking.component';
import { UseraccountComponent } from './pages/useraccount/useraccount.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'search',
        pathMatch: 'full'
    },
    {
        path: 'search',
        component: SearchComponent
    },
    {
        path: 'booking/:id',
        component: BookingComponent
    },
    {
        path: 'useraccount/:userid',
        // path: 'useraccount/:userid/:bookid?',
        component: UseraccountComponent
    }

];
