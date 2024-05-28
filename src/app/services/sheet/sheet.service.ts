import {inject, Injectable} from '@angular/core';
import * as XLSX from 'xlsx';
import {Player} from "@app/models/player/player";
import {PlayerService} from '../player/player.service';
import { LocalStorageService } from '../local-storage/local-storage.service';

type AOA = Array<Player>;

@Injectable({
  providedIn: 'root'
})
export class SheetService {

  private readonly playerService = inject(PlayerService);
  private readonly localStorageService = inject(LocalStorageService);
  private readonly fileName: string = `Shuffle-team-${new Date()}.xlsx`;
  private readonly LOCAL_STORAGE_KEY: string = 'players';

  constructor() {
    let players = this.localStorageService.getItem(this.LOCAL_STORAGE_KEY);
    if (players) {
      this.playerService.players.next(players);
    }
  }


  readXlsxData(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      // let sheetToJson = <AOA>(XLSX.utils.sheet_to_json(ws, {header: 1}));
      let sheetToJson = <AOA>(XLSX.utils.sheet_to_json(ws, {raw: true}));
      this.playerService.players.next(sheetToJson);

      this.localStorageService.removeItem(this.LOCAL_STORAGE_KEY)
      this.localStorageService.setItem(this.LOCAL_STORAGE_KEY, sheetToJson);
    };
    reader.readAsBinaryString(target.files[0]);
  }

  export(): void {
    /* generate worksheet */
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.playerService.players.value as any);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
}
