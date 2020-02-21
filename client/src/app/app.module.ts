import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { TokenInterceptor } from './shared/classes/interceptor';
import { MoviePageComponent } from './movie-page/movie-page.component';
import { MainPageComponent } from './main-page/main-page.component';

@NgModule({
  declarations: [
    AppComponent,
    MoviePageComponent,
    MainPageComponent
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
