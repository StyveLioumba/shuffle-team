import {Component, inject} from '@angular/core';
import {PlayerService} from "@app/services/player/player.service";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {FileUploadModule} from "primeng/fileupload";
import {TableModule} from "primeng/table";
import {RippleModule} from "primeng/ripple";
import {InputTextModule} from "primeng/inputtext";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {DialogModule} from "primeng/dialog";
import {FormsModule} from "@angular/forms";
import {AsyncPipe, JsonPipe, NgIf} from "@angular/common";
import {PlayerFormComponent} from "@app/shared/components/player-form/player-form.component";
import {PlayerItemComponent} from "@app/shared/components/player-item/player-item.component";
import {SheetXlsxInputComponent} from "@app/shared/components/sheet-xlsx-input/sheet-xlsx-input.component";

@Component({
  selector: 'app-list-player',
  standalone: true,
  imports: [
    ToastModule,
    ToolbarModule,
    FileUploadModule,
    TableModule,
    RippleModule,
    InputTextModule,
    ConfirmDialogModule,
    DialogModule,
    FormsModule,
    NgIf,
    PlayerFormComponent,
    JsonPipe,
    AsyncPipe,
    PlayerItemComponent,
    SheetXlsxInputComponent
  ],
  templateUrl: './list-player.component.html',
  styleUrl: './list-player.component.scss'
})
export class ListPlayerComponent {
  protected readonly playerService = inject(PlayerService)
  players$ = this.playerService.players;

}
