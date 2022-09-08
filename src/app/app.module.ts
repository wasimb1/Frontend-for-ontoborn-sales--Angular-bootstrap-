import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserRegistrationComponent } from './components/user-components/user-registration/user-registration.component';
import { UserLoginComponent } from './components/user-components/user-login/user-login.component';
import { UserProfileComponent } from './components/user-components/user-profile/user-profile.component';
import { CreateSaleComponent } from './components/sales-component/create-sale/create-sale.component';
import { UpdateSaleComponent } from './components/sales-component/update-sale/update-sale.component';
import { DeleteSaleComponent } from './components/sales-component/delete-sale/delete-sale.component';
import { SingleSaleComponent } from './components/sales-component/single-sale/single-sale.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageComponent } from './components/home-page/home-page.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AllSalesComponent } from './components/sales-component/all-sales/all-sales.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SalesModule } from './modules/sale/sales.module';
import { UserModule } from './modules/user/user.module';
@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationComponent,
    UserLoginComponent,
    UserProfileComponent,
    CreateSaleComponent,
    UpdateSaleComponent,
    DeleteSaleComponent,
    SingleSaleComponent,
    HomePageComponent,
    HeaderComponent,
    FooterComponent,
    AllSalesComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SalesModule,
    UserModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
