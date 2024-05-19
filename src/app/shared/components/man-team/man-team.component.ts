import {Component, computed, inject, signal} from '@angular/core';
import {PlayerService} from "@app/services/player/player.service";
import {TeamService} from "@app/services/team/team.service";
import {AsyncPipe, DatePipe} from "@angular/common";
import {DragDropModule} from "primeng/dragdrop";
import {Player} from "@app/models/player/player";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Team} from "@app/models/team/team";

@Component({
  selector: 'app-man-team',
  standalone: true,
  imports: [
    AsyncPipe,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
    DatePipe
  ],
  templateUrl: './man-team.component.html',
  styleUrl: './man-team.component.scss'
})
export class ManTeamComponent {

  protected readonly fb = inject(FormBuilder);
  protected readonly playerService = inject(PlayerService);
  protected readonly teamService = inject(TeamService);

  protected players$ = this.playerService.getPlayersData();

  availablePlayers = signal(this.players$.value)

  currentDate = computed(() => new Date());

  selectedPlayers: Player[] = []

  draggedPlayer: Player | undefined | null;

  teams : {[key: string]: Player[]} = {};

  protected manTeamForm = this.fb.group({
    name: ['', Validators.required],
    players: [new Array<Player>()]
  });

  onSubmit() {
    if (this.manTeamForm.invalid) {
      return;
    }

    const team:Team = this.manTeamForm.getRawValue() as Team;
    team.players = this.selectedPlayers;

    console.log(this.teams[team.name])

    if (!this.teams[team.name]) {
      this.teams[team.name] = team.players;
      this.selectedPlayers = [];
      this.availablePlayers().filter(player => !team.players.includes(player));
    }
    this.teamService.teamsData = this.teams;
    this.manTeamForm.reset();

  }



  dragStart(player: Player) {
    this.draggedPlayer = player;
  }

  drop() {
    if (this.draggedPlayer) {
      let draggedPlayerIndex = this.findIndex(this.draggedPlayer);

      const existingPlayer = this.selectedPlayers.find(player => player.name === this.draggedPlayer?.name);

      if (existingPlayer) {
        this.availablePlayers.set([...(this.availablePlayers() as Player[]), existingPlayer]);
        this.selectedPlayers = this.selectedPlayers.filter(player => player !== existingPlayer);
        this.draggedPlayer = null;
        return;
      }

      this.selectedPlayers = [...(this.selectedPlayers as Player[]), this.draggedPlayer];
      this.availablePlayers.set(this.availablePlayers().filter((val, i) => i != draggedPlayerIndex));
      this.draggedPlayer = null;
    }
  }

  dragEnd() {
    this.draggedPlayer = null;
  }

  findIndex(product: Player) {
    let index = -1;
    for (let i = 0; i < (this.availablePlayers() as Player[]).length; i++) {
      if (product.name === (this.availablePlayers() as Player[])[i].name) {
        index = i;
        break;
      }
    }
    return index;
  }

}
