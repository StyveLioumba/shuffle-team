import {Injectable} from '@angular/core';
import {Player} from "@app/models/player/player";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private teams = new BehaviorSubject<{ [key: string]: Player[] }>({});

  get teamsData() {
    return this.teams.value;
  }

  set teamsData(teams: { [key: string]: Player[] }) {
    this.teams.next(teams);
  }

  private shuffleArray(array: Player[]): Player[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  shuffleTeam(players: Player[], minEquipe: number = 5) {
    // Vérifier si le tableau est supérieur ou égal à minEquipe
    if (players.length < minEquipe) {
      return {};
    }

    const lengthOfPlayers: number = players.length;
    let restOfPlayers: number = lengthOfPlayers % minEquipe;
    const nbTeams: number = lengthOfPlayers % minEquipe !== 0 ? Math.floor(lengthOfPlayers / minEquipe) : lengthOfPlayers / minEquipe;
    const avgTeams: number = Math.floor(lengthOfPlayers / nbTeams);
    let substitutePlayer: Player[] = [];


    // Mélanger le tableau des noms
    let shuffledPlayers = this.shuffleArray([...players]);


    if (lengthOfPlayers % minEquipe !== 0) {

      if (restOfPlayers === nbTeams) {
        minEquipe++;
      }

      if (restOfPlayers !== nbTeams) {
        minEquipe = Math.floor(lengthOfPlayers / nbTeams);
        restOfPlayers = lengthOfPlayers % minEquipe;
        substitutePlayer = shuffledPlayers.splice(0, restOfPlayers);
      }
    }

    // Créer des équipes en fonction de minEquipe
    const teamsObject: { [key: string]: Player[] } = {};
    let teamArray: Player[] = [];


    shuffledPlayers.map((value, index) => {
      teamArray.push(value);

      if (teamArray.length === minEquipe) {
        teamsObject[`team${Math.floor(index / minEquipe) + 1}`] = teamArray;
        teamArray = [];
      }
    });

    // Si le dernier groupe est inférieur à minEquipe, on le fusionne avec le groupe précédent
    if (teamArray.length > 0) {
      const derniereCle = Object.keys(teamsObject).pop() as string;
      teamsObject[derniereCle] = teamsObject[derniereCle].concat(teamArray);
    }

    teamsObject[`substitute`] = substitutePlayer;

    return teamsObject;
  }
}
