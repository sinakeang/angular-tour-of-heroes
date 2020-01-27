import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HeroesComponent} from './heroes/heroes.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HeroDetailComponent} from './hero-detail/hero-detail.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'heroes', component: HeroesComponent },
];

@NgModule({
  // The method is called forRoot()
  // since you configure the router at the application's root level.
  // The forRoot() method supplies the service providers and directives
  // needed for routing, and performs the initial navigation based on
  // the current browser URL.
  imports: [RouterModule.forRoot(routes)],
  // Export RouterModule so it will be
  // available throughout the app
  exports: [RouterModule]
})
export class AppRoutingModule { }
