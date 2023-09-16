import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonListComponent } from './pages/pokemon-list/pokemon-list.component';
import { AlgoComponent } from './algo/algo.component';
import { PokemonDetailsComponent } from './pages/pokemon-details/pokemon-details.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    PokemonListComponent,
    AlgoComponent,
    PokemonDetailsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
