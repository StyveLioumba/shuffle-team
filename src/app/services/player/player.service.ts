import {Injectable} from '@angular/core';
import {Player} from "@app/models/player/player";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private data = [{ "uuid": "1000", "name": "JOUEUR 3", "picture": "https://api.dicebear.com/8.x/adventurer/svg?seed=JOUEUR 3", "post": "" }, { "uuid": "1000", "name": "JOUEUR 7", "picture": "https://api.dicebear.com/8.x/adventurer/svg?seed=JOUEUR 7", "post": "" }, { "uuid": "1000", "name": "JOUEUR 2", "picture": "https://api.dicebear.com/8.x/adventurer/svg?seed=JOUEUR 2", "post": "" }, { "uuid": "1000", "name": "JOUEUR 4", "picture": "https://api.dicebear.com/8.x/adventurer/svg?seed=JOUEUR 4", "post": "" }, { "uuid": "1000", "name": "JOUEUR 1", "picture": "https://api.dicebear.com/8.x/adventurer/svg?seed=JOUEUR 1", "post": "" }, { "uuid": "1000", "name": "JOUEUR 8", "picture": "https://api.dicebear.com/8.x/adventurer/svg?seed=JOUEUR 8", "post": "" }, { "uuid": "1000", "name": "JOUEUR 5", "picture": "https://api.dicebear.com/8.x/adventurer/svg?seed=JOUEUR 5", "post": "" }, { "uuid": "1000", "name": "JOUEUR 6", "picture": "https://api.dicebear.com/8.x/adventurer/svg?seed=JOUEUR 6", "post": "" }, { "uuid": "1000", "name": "JOUEUR 9", "picture": "https://api.dicebear.com/8.x/adventurer/svg?seed=JOUEUR 9", "post": "" }, { "uuid": "1000", "name": "JOUEUR 10", "picture": "https://api.dicebear.com/8.x/adventurer/svg?seed=JOUEUR 10", "post": "" } ]
  private players = new BehaviorSubject(new Array<Player>());

  constructor() {
    this.players.next(this.data);
  }

  addPlayer(player: Player) {
    const exist = this.players.value.find((p) => p.name.toLowerCase() === player.name.toLowerCase());
    if (exist) {
      return false;
    }
    this.players.next([...this.players.value, player]);
    return true;
  }

  getPlayersData() {
    return this.players;
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
