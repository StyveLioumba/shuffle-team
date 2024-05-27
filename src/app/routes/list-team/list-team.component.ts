import {Component, inject} from '@angular/core';
import {PlayerService} from "@app/services/player/player.service";
import {TeamService} from '@app/services/team/team.service';
import {AsyncPipe, JsonPipe} from "@angular/common";
import {TeamItemComponent} from "@app/shared/components/team-item/team-item.component";
import {Player} from "@app/models/player/player";
import {TeamChartComponent} from "@app/shared/components/team-chart/team-chart.component";
import {StadiumComponent} from "@app/shared/components/stadium/stadium.component";
import {ToastModule} from "primeng/toast";
import {AutoTeamComponent} from "@app/shared/components/auto-team/auto-team.component";
import {ManTeamComponent} from "@app/shared/components/man-team/man-team.component";

@Component({
  selector: 'app-list-team',
  standalone: true,
  imports: [
    AsyncPipe,
    JsonPipe,
    TeamItemComponent,
    TeamChartComponent,
    StadiumComponent,
    ToastModule,
    AutoTeamComponent,
    ManTeamComponent
  ],
  templateUrl: './list-team.component.html',
  styleUrl: './list-team.component.scss'
})
export class ListTeamComponent {

  protected readonly playerService = inject(PlayerService);
  protected readonly teamService = inject(TeamService);

  protected players$ = this.playerService.players;

  protected readonly Object = Object;
  protected onGenerateTeamManually = false;

  onGenerateTeam(players: Player[]) {
    this.teamService.teamsData = this.teamService.shuffleTeam(players);
  }
}
