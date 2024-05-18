import {Player} from "@app/models/player/player";

export interface Team {
  name: string;
  players: Player[];
}
