import {ChangeDetectionStrategy, Component, inject, OnDestroy} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {Player} from "@app/models/player/player";
import {PlayerService} from "@app/services/player/player.service";

@Component({
  selector: 'app-player-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './player-form.component.html',
  styleUrl: './player-form.component.scss'
})
export class PlayerFormComponent implements OnDestroy{
  private readonly fb = inject(FormBuilder)
  private readonly playerService = inject(PlayerService);

  playerForm = this.fb.group({
    name: ['', Validators.required]
  });

  onSubmit() {
    if (this.playerForm.invalid) {
      return;
    }

    const player: Player = {
      uuid: '1000',
      name: this.playerForm.value.name!.toLowerCase(),
      picture: `https://api.dicebear.com/8.x/adventurer/svg?seed=${this.playerForm.value.name!}`,
      post: '',
      level: 0
    }
    this.playerService.addPlayer(player);
    this.playerForm.setValue({name: ''});
  }

  ngOnDestroy(): void {
    this.playerForm.reset();
  }


}
