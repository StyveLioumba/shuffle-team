import {Component, Input, inject, ChangeDetectionStrategy} from '@angular/core';
import {Player} from "@app/models/player/player";
import {PlayerService} from "@app/services/player/player.service";

@Component({
  selector: 'app-player-item',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './player-item.component.html',
  styleUrl: './player-item.component.scss'
})
export class PlayerItemComponent {
  @Input({required:true}) player: Player = {} as Player;
  private readonly playerService = inject(PlayerService);

  onDelete(player:Player) {
    this.playerService.deletePlayer(player);
  }
}
