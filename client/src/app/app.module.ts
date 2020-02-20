import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { TokenInterceptor } from './shared/classes/interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule
  ],
  providers: [ 
    {
      provide:HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    }     
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
