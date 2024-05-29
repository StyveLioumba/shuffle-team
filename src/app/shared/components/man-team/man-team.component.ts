import {Component, computed, inject, Input, OnChanges, OnDestroy, signal, SimpleChanges} from '@angular/core';
import {PlayerService} from "@app/services/player/player.service";
import {TeamService} from "@app/services/team/team.service";
import {AsyncPipe, DatePipe, JsonPipe, NgClass, NgOptimizedImage} from "@angular/common";
import {DragDropModule} from "primeng/dragdrop";
import {Player} from "@app/models/player/player";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Team} from "@app/models/team/team";
import {MethodeUtil} from "@app/shared/utils/methods.utils";

@Component({
  selector: 'app-man-team',
  standalone: true,
  imports: [
    AsyncPipe,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
    DatePipe,
    NgOptimizedImage,
    NgClass,
    JsonPipe
  ],
  templateUrl: './man-team.component.html',
  styleUrl: './man-team.component.scss'
})
export class ManTeamComponent implements OnChanges, OnDestroy{

  @Input({required: true}) reset: boolean = false;

  protected readonly MethodeUtil = MethodeUtil;
  protected readonly fb = inject(FormBuilder);
  protected readonly playerService = inject(PlayerService);
  protected readonly teamService = inject(TeamService);
  protected readonly Object = Object;

  protected players$ = this.playerService.players;

  availablePlayers = signal(this.players$.value)

  availablePlayersCount=this.availablePlayers().length;

  currentDate = computed(() => new Date());

  protected onSubmitted = signal(false);

  selectedPlayers: Player[] = []

  draggedPlayer: Player | undefined | null;

  teams : {[key: string]: Player[]} = {};

  protected manTeamForm = this.fb.group({
    name: ['', Validators.required],
    players: [new Array<Player>()]
  });

  onSubmit() {
    if (this.manTeamForm.invalid) {
      this.onSubmitted.set(true);
      return;
    }

    const team:Team = this.manTeamForm.getRawValue() as Team;
    team.players = this.selectedPlayers;
    team.name = team.name.toLowerCase().trim()
      .replace(/\s/g, '_')
      .normalize('NFD').replace(/[\u0300-\u036f]/g, "");

    if (!this.teams[team.name]) {
      this.teams[team.name] = team.players;
      this.selectedPlayers = [];
      this.availablePlayers().filter((player:Player) => !team.players.includes(player));
    }
    this.teamService.teamsData = this.teams;
    this.manTeamForm.reset();

  }

  onSelect(player:Player){
    const existingPlayer = this.selectedPlayers.find(p => p.name === player.name);
    if (!existingPlayer) {
      this.selectedPlayers = [...this.selectedPlayers, player];
      this.availablePlayers.set(this.availablePlayers().filter((p:Player) => p !== player));
      return;
    }
    this.availablePlayers.set([...this.availablePlayers(), existingPlayer]);
    this.selectedPlayers = this.selectedPlayers.filter(p => p !== existingPlayer);
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
      this.availablePlayers.set(this.availablePlayers().filter((val: Player, i:number) => i != draggedPlayerIndex));
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['reset'].currentValue) {
      this.availablePlayers.set(this.players$.value);
      this.teamService.teamsData = {};
    }
  }

  ngOnDestroy(): void {
  }

  onResetAll() {
    this.availablePlayers.set(this.players$.value);
    this.teamService.teamsData = {};
  }

  get name() {
    return this.manTeamForm.get('name')!;
  }

}
