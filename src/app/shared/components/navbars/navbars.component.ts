import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-navbars',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './navbars.component.html',
  styleUrl: './navbars.component.scss'
})
export class NavbarsComponent {

}
