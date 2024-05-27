import {ChangeDetectionStrategy, Component, computed, inject, Input} from '@angular/core';
import {Player} from "@app/models/player/player";
import {PlayerService} from "@app/services/player/player.service";
import {NgOptimizedImage} from "@angular/common";
import {MethodeUtil} from "@app/shared/utils/methods.utils";
import {RatingModule} from "primeng/rating";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-player-item',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RatingModule,
    FormsModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './player-item.component.html',
  styleUrl: './player-item.component.scss'
})
export class PlayerItemComponent {
  @Input({required: true}) player: Player = {} as Player;
  private readonly playerService = inject(PlayerService);

  player$ = computed(() => {
    this.player.picture = MethodeUtil.transformPictureUrl(this.player);
    return this.player;
  });

  onDelete(player: Player) {
    this.playerService.deletePlayer(player);
  }
}
