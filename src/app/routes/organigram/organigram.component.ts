import {Component, inject} from '@angular/core';
import {TeamChartComponent} from "@app/shared/components/team-chart/team-chart.component";
import {TeamService} from "@app/services/team/team.service";

@Component({
  selector: 'app-organigram',
  standalone: true,
    imports: [
        TeamChartComponent
    ],
  templateUrl: './organigram.component.html',
  styleUrl: './organigram.component.scss'
})
export class OrganigramComponent {
  protected readonly teamService = inject(TeamService);
}
