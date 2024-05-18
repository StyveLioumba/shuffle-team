import {Component, OnInit} from '@angular/core';
import {PlayerFormComponent} from "@app/shared/components/player-form/player-form.component";
import {TeamFormComponent} from "@app/shared/components/team-form/team-form.component";
import {TabMenuModule} from "primeng/tabmenu";
import {MenuItem} from "primeng/api";
import {NavbarsComponent} from "@app/shared/components/navbars/navbars.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    PlayerFormComponent,
    TeamFormComponent,
    TabMenuModule,
    NavbarsComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  items: MenuItem[] | undefined;

  activeItem: MenuItem | undefined;

  ngOnInit() {
    this.items = [
      { label: 'Joueurs', icon: 'pi pi-fw pi-user', routerLink: ['players'] },
      { label: 'Equipes', icon: 'pi pi-fw pi-users', routerLink: ['teams'] },
      { label: 'Tournoi', icon: 'pi pi-fw pi-users', routerLink: ['chart'] },
    ];

    this.activeItem = this.items[0];
  }
}
