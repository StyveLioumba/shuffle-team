import {ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Team} from "@app/models/team/team";
import {Player} from "@app/models/player/player";
import {NgOptimizedImage} from "@angular/common";
import {MethodeUtil} from "@app/shared/utils/methods.utils";

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

  protected readonly MethodeUtil = MethodeUtil;


}
