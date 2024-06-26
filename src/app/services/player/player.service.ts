import {Injectable} from '@angular/core';
import {Player} from "@app/models/player/player";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  players = new BehaviorSubject(new Array<Player>());

  addPlayer(player: Player) {
    const exist = this.players.value.find((p) => p.name.toLowerCase() === player.name.toLowerCase());
    if (exist) {
      return false;
    }
    this.players.next([...this.players.value, player]);
    return true;
  }

  deletePlayer(player: Player) {
     const players = this.players.value.filter((p) => p.name.toLowerCase() !== player.name.toLowerCase());
    this.players.next(players);
  }

  deleteAllPlayers(): void {
    this.players.value.splice(0, this.players.value.length);
    this.players.next([]);
  }

}
