import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListPlayerComponent} from "@app/routes/list-player/list-player.component";
import {ListTeamComponent} from "@app/routes/list-team/list-team.component";
import {OrganigramComponent} from "@app/routes/organigram/organigram.component";

const routes: Routes = [
  {path: 'players', component: ListPlayerComponent, title: 'Liste des joueurs'},
  {path: 'teams', component: ListTeamComponent, title: 'Liste des équipes'},
  {path: 'chart', component: OrganigramComponent, title: 'Organisation du tournoi'},
  {path: '', redirectTo: 'players', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
