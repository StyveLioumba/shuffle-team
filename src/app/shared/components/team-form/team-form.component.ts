import {Component, inject} from '@angular/core';
import {PaginatorModule} from "primeng/paginator";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {Player} from "@app/models/player/player";
import {Team} from "@app/models/team/team";

@Component({
  selector: 'app-team-form',
  standalone: true,
    imports: [
        PaginatorModule,
        ReactiveFormsModule
    ],
  templateUrl: './team-form.component.html',
  styleUrl: './team-form.component.scss'
})
export class TeamFormComponent {
  private readonly fb = inject(FormBuilder)
  protected teamForm = this.fb.group({
    name: [''],
  });

  onSubmit() {
    if (this.teamForm.invalid) {
      return;
    }

    const team: Team = {
      name: this.teamForm.value.name!,
    } as Team

    console.log(team)
  }
}
