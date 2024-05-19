import {Component, inject} from '@angular/core';
import {TeamItemComponent} from "@app/shared/components/team-item/team-item.component";
import {TeamService} from "@app/services/team/team.service";

@Component({
  selector: 'app-auto-team',
  standalone: true,
  imports: [
    TeamItemComponent
  ],
  templateUrl: './auto-team.component.html',
  styleUrl: './auto-team.component.scss'
})
export class AutoTeamComponent {

  protected readonly teamService = inject(TeamService);
  protected readonly Object = Object;
}
