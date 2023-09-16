import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonListComponent } from './pages/pokemon-list/pokemon-list.component';
import { PokemonDetailsComponent } from './pages/pokemon-details/pokemon-details.component';
import { authGuard } from './auth.guard';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  { path: 'generation/:id', component: PokemonListComponent },
  { path: 'pokemon/:id', component: PokemonDetailsComponent, canActivate:[authGuard]},
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/generation/1', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
