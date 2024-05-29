import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges
} from '@angular/core';
import {Team} from "@app/models/team/team";
import {Player} from "@app/models/player/player";
import {NgOptimizedImage} from "@angular/common";
import {MethodeUtil} from "@app/shared/utils/methods.utils";
import {TeamService} from "@app/services/team/team.service";

@Component({
  selector: 'app-team-item',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './team-item.component.html',
  styleUrl: './team-item.component.scss'
})
export class TeamItemComponent implements OnInit, OnDestroy,OnChanges {


  @Input({required: true}) players: Player[] = [];
  @Input({required: true}) teamName: string = "";
  protected team: Team = {} as Team;

  protected readonly MethodeUtil = MethodeUtil;
  protected readonly teamService = inject(TeamService);

  ngOnInit(): void {
    this.team.name = this.teamName;
    this.team.players = this.players;
    this.team.count = this.players.length;
    this.team.avg = MethodeUtil.avgTeam(this.players);

  }

  ngOnDestroy(): void {
    this.team = {} as Team;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.team.name = this.teamName;
    this.team.players = this.players;
    this.team.count = this.players.length;
    this.team.avg = MethodeUtil.avgTeam(this.players);
  }

  onRemoveTeam(team: Team){
    this.teamService.teamsData[this.teamName] = [];
  }


}
