import {Component, inject} from '@angular/core';
import {SheetService} from "@app/services/sheet/sheet.service";
import {AsyncPipe, JsonPipe} from "@angular/common";

@Component({
  selector: 'app-sheet-xlsx-input',
  standalone: true,
  imports: [
    JsonPipe,
    AsyncPipe
  ],
  templateUrl: './sheet-xlsx-input.component.html',
  styleUrl: './sheet-xlsx-input.component.scss'
})
export class SheetXlsxInputComponent {
  protected readonly sheetService = inject(SheetService);
}
