import {Injectable} from '@angular/core';
import {Player} from "@app/models/player/player";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private data = [{ "uuid": "1000", "name": "j3", "picture": "https://api.dicebear.com/8.x/adventurer/svg?seed=j3", "post": "" }, { "uuid": "1000", "name": "j7", "picture": "https://api.dicebear.com/8.x/adventurer/svg?seed=j7", "post": "" }, { "uuid": "1000", "name": "j2", "picture": "https://api.dicebear.com/8.x/adventurer/svg?seed=j2", "post": "" }, { "uuid": "1000", "name": "j4", "picture": "https://api.dicebear.com/8.x/adventurer/svg?seed=j4", "post": "" }, { "uuid": "1000", "name": "j1", "picture": "https://api.dicebear.com/8.x/adventurer/svg?seed=j1", "post": "" }, { "uuid": "1000", "name": "j8", "picture": "https://api.dicebear.com/8.x/adventurer/svg?seed=j8", "post": "" }, { "uuid": "1000", "name": "j5", "picture": "https://api.dicebear.com/8.x/adventurer/svg?seed=j5", "post": "" }, { "uuid": "1000", "name": "j6", "picture": "https://api.dicebear.com/8.x/adventurer/svg?seed=j6", "post": "" }, { "uuid": "1000", "name": "j9", "picture": "https://api.dicebear.com/8.x/adventurer/svg?seed=j9", "post": "" }, { "uuid": "1000", "name": "j10", "picture": "https://api.dicebear.com/8.x/adventurer/svg?seed=j10", "post": "" } ]
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
