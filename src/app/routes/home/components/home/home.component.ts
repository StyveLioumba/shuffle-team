import {Component, inject, OnInit} from '@angular/core';
import {PlayerFormComponent} from "@app/shared/components/player-form/player-form.component";
import {TeamFormComponent} from "@app/shared/components/team-form/team-form.component";
import {TabMenuModule} from "primeng/tabmenu";
import {MenuItem} from "primeng/api";
import {NavbarsComponent} from "@app/shared/components/navbars/navbars.component";
import {FooterComponent} from "@app/shared/components/footer/footer.component";
import {LocalStorageService} from '@app/services/local-storage/local-storage.service';
import {PlayerService} from "@app/services/player/player.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    PlayerFormComponent,
    TeamFormComponent,
    TabMenuModule,
    NavbarsComponent,
    FooterComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  items: MenuItem[] | undefined;

  activeItem: MenuItem | undefined;
  private readonly localStorageService = inject(LocalStorageService);
  private readonly playerService = inject(PlayerService);
  private readonly LOCAL_STORAGE_KEY: string = 'players';

  ngOnInit() {
    this.items = [
      {label: 'Joueurs', icon: 'pi pi-fw pi-user', routerLink: ['players']},
      {label: 'Equipes', icon: 'pi pi-fw pi-users', routerLink: ['teams']},
      {label: 'Tournoi', icon: 'pi pi-fw pi-sitemap', routerLink: ['chart']},
    ];

    this.activeItem = this.items[0];

    let players = this.localStorageService.getItem(this.LOCAL_STORAGE_KEY);
    if (players) {
      this.playerService.players.next(players);
    }
  }
}
