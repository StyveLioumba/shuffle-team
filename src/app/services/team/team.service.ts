import {Injectable} from '@angular/core';
import {Player} from "@app/models/player/player";
import {BehaviorSubject} from "rxjs";

enum Post {
  Meneur = 'Meneur(se)',
  Pivot = 'Pivot',
  Ailier = 'Ailier(e)',
  AlierFort = 'Ailier(e) fort(e)',
  Arriere = 'Arriere'
}

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
    const nbTeams: number = lengthOfPlayers % minEquipe !== 0 ? Math.floor(lengthOfPlayers / minEquipe) : lengthOfPlayers / minEquipe; // 👈

    // const nbTeams = Math.ceil(players.length / minEquipe);

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

    for (let i = 0; i < nbTeams; i++) {
      teamsObject[`team${i + 1}`] = [];
    }

    let teamIndex = 1;

    for (const player of shuffledPlayers) {

      let meneurExist = teamArray.some((player) => player.post.toLowerCase() === Post.Meneur.toLowerCase());
      let pivotExist = teamArray.some((player) => player.post.toLowerCase() === Post.Pivot.toLowerCase());
      let ailierExist = teamArray.some((player) => player.post.toLowerCase() === Post.Ailier.toLowerCase());
      let ailierFortExist = teamArray.some((player) => player.post.toLowerCase() === Post.AlierFort.toLowerCase());
      let arriereExist = teamArray.some((player) => player.post.toLowerCase() === Post.Arriere.toLowerCase());

      if (meneurExist && player.post.toLowerCase() === Post.Meneur.toLowerCase()) continue;

      if (pivotExist && player.post.toLowerCase() === Post.Pivot.toLowerCase()) continue;

      if (ailierExist && player.post.toLowerCase() === Post.Ailier.toLowerCase()) continue;

      if (ailierFortExist && player.post.toLowerCase() === Post.AlierFort.toLowerCase()) continue;

      if (arriereExist && player.post.toLowerCase() === Post.Arriere.toLowerCase()) continue;

      teamArray.push(player);

      if (teamArray.length === minEquipe) {
        teamsObject[`team${teamIndex}`] = teamArray;
        teamIndex++;
        teamArray = [];
      }
    }


    // Si le dernier groupe est inférieur à minEquipe, on le fusionne avec le groupe précédent
    if (teamArray.length > 0) {
      const derniereCle = Object.keys(teamsObject).pop() as string;
      teamsObject[derniereCle] = teamsObject[derniereCle].concat(teamArray);
    }

    Object.keys(teamsObject).forEach((key) => {
      let data = teamsObject[key];
      substitutePlayer= [...substitutePlayer, ...data]
    });

    substitutePlayer = this.difference(shuffledPlayers, substitutePlayer);

    teamsObject[`unselected`] = substitutePlayer;

    return teamsObject;
  }

  createStableTeam(shuffledPlayers: Player[], minEquipe: number = 5) {

    let teamArray: Player[] = [];
    let teamIndex = 1;
    const teamsObject: { [key: string]: Player[] } = {};

    let teamArrayLength = 0;

    while (teamArrayLength < minEquipe){

      for (const player of shuffledPlayers) {

        teamArrayLength = teamArray.length;
        if (teamArrayLength === minEquipe) {
          break;
        }

        // let meneurExist = teamArray.some((player) => player.post.toLowerCase() === Post.Meneur.toLowerCase());
        let pivotExist = teamArray.some((player) => player.post.toLowerCase() === Post.Pivot.toLowerCase());
        let ailierExist = teamArray.some((player) => player.post.toLowerCase() === Post.Ailier.toLowerCase());
        // let ailierFortExist = teamArray.some((player) => player.post.toLowerCase() === Post.AlierFort.toLowerCase());
        let arriereExist = teamArray.some((player) => player.post.toLowerCase() === Post.Arriere.toLowerCase());

        // if (meneurExist && player.post.toLowerCase() === Post.Meneur.toLowerCase()) continue;

        if (pivotExist && player.post.toLowerCase() === Post.Pivot.toLowerCase()) continue;

        if (ailierExist && player.post.toLowerCase() === Post.Ailier.toLowerCase()) continue;

        // if (ailierFortExist && player.post.toLowerCase() === Post.AlierFort.toLowerCase()) continue;

        if (arriereExist && player.post.toLowerCase() === Post.Arriere.toLowerCase()) continue;

        teamArray.push(player);
      }

      teamArrayLength = teamArray.length;
    }

    return teamArray;
  }

  difference(arr1:Player[], arr2:Player[]) {
    return arr1.filter(element => !arr2.includes(element));
  }

}
