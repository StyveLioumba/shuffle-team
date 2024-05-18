import {Routes} from '@angular/router';
import {HomeComponent} from "@app/routes/home/components/home/home.component";
import {NotFoundComponent} from "@app/routes/not-found/not-found.component";

export const routes: Routes = [
  {
    path: 'home', component: HomeComponent,title:'Accueil',
    children: [
      {path: '', loadChildren: () => import('./routes/home/home.module').then(m => m.HomeModule)},
    ]
  },
  {path:'not-found',component:NotFoundComponent,title:'Not Found'},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', redirectTo: 'not-found'}
];
