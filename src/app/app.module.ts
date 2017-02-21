import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { AppRoutingModule }     from './app-routing.module';
import { HttpModule }    from '@angular/http';

import { AppComponent }  from './app.component';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroesComponent } from './heroes.component';
import { HeroService } from './services/hero.service';
import { DashboardComponent } from './dashboard.component';
import { HeroSearchComponent } from './heroes-search.component';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './services/in-memory-data.service';


@NgModule({
  imports: [ 
  	AppRoutingModule,
  	BrowserModule,
  	FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
  ],
  declarations: [ 
  	AppComponent,
  	DashboardComponent,
  	HeroDetailComponent,
  	HeroesComponent,
    HeroSearchComponent
  ],
  providers: [ HeroService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
