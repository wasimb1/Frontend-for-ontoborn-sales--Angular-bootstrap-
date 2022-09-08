import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { UserRegistrationComponent } from './components/user-components/user-registration/user-registration.component';
import { UserLoginComponent } from './components/user-components/user-login/user-login.component';
import { UserProfileComponent } from './components/user-components/user-profile/user-profile.component';
import { CreateSaleComponent } from './components/sales-component/create-sale/create-sale.component';
import { AllSalesComponent } from './components/sales-component/all-sales/all-sales.component';
import { SingleSaleComponent } from './components/sales-component/single-sale/single-sale.component';
import { UpdateSaleComponent } from './components/sales-component/update-sale/update-sale.component';
import { DeleteSaleComponent } from './components/sales-component/delete-sale/delete-sale.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: 'register', component: UserRegistrationComponent },
  { path: 'login', component: UserLoginComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'new-sale', component: CreateSaleComponent },

  {
    path: 'sales',
    component: AllSalesComponent,
    children: [
      { path: ':id', component: SingleSaleComponent },
      { path: ':id/update', component: UpdateSaleComponent },
      { path: ':id/delete', component: DeleteSaleComponent },
    ],
  },
  { path: '', component: HomePageComponent },
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
