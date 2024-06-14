import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ProductComponent } from './product/product.component';
import { AuthGuard } from './auth.guard';
import { ShippingComponent } from './shipping/shipping.component';
import { CartComponent } from './cart/cart.component';
import { OrderHistoryComponent } from './order-history/order-history.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegistrationComponent},
    { path: 'product', component: ProductComponent},
   {path:'shipping',component:ShippingComponent,canActivate:[AuthGuard]},
   {path:'cart', component:CartComponent},
   {path:'order-history',component:OrderHistoryComponent}
   

];
