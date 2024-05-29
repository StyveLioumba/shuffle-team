import {Player} from "@app/models/player/player";

export interface Team {
  name: string;
  avg: number;
  count: number;
  substitutePlayers: Player[];
  players: Player[];
}
