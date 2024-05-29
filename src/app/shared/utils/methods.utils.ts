import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {MessageService} from "primeng/api";
import {Player} from "@app/models/player/player";

export class MethodeUtil {

  public static createUUID() {
    let uuid = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      uuid += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return uuid;
  }

  public static onShowDialog(
    dynamicData: any = {},
    ref: DynamicDialogRef,
    dialogService: DialogService,
    component: any,
    messageService: MessageService,
    formName: string = "Form"
  ) {
    ref = dialogService.open(component, {
      header: `${formName}`,
      width: '50%',
      contentStyle: {"max-height": "100%", "overflow": "auto"},
      baseZIndex: 11000,
      maximizable: true,
      closable: true,
      draggable: true,
      resizable: true,
      transitionOptions: '600ms cubic-bezier(0.25, 0.8, 0.25, 1)',
      data: {
        dynamicData,
        isEdit: !!dynamicData.uuid,
      },
    });

    ref.onClose.subscribe((result: any) => {
      if (result) {
        messageService.add({severity: 'success', summary: 'Success', detail: result});
      }
    });

    return ref;

  }


  public static transformPictureUrl(player: Player) {
    if (!player.picture) player.picture = 'https://drive.google.com/file/d/1ZgJhimQEfP9x8fhzg7OGELChrrpbgi3s/view?usp=sharing'

    const url = new URL(player.picture);
    let id = url.searchParams.get('id');

    if (id === null) {
      const segments = player.picture.split('/');
      id = segments[5];
    }
    return `https://drive.google.com/thumbnail?id=${id}&sz=w800`
  }

  public static avgTeam(players: Player[]) {
    let totalLevel = players.reduce((acc, player) => acc + player.level, 0);
    let avg = totalLevel / players.length;
    if (isNaN(avg)) return 0;
    return parseFloat(avg.toFixed(1));
  }


  /*shuffledPlayers.map((value, index) => {

    let meneurExist =  teamArray.find((player) => player.post.toLowerCase() === Post.Meneur.toLowerCase());
    let pivotExist =  teamArray.find((player) => player.post.toLowerCase() === Post.Pivot.toLowerCase());
    let ailierExist =  teamArray.find((player) => player.post.toLowerCase() === Post.Ailier.toLowerCase());
    let ailierFortExist =  teamArray.find((player) => player.post.toLowerCase() === Post.AlierFort.toLowerCase());
    let arriereExist =  teamArray.find((player) => player.post.toLowerCase() === Post.Arriere.toLowerCase());

    if (!meneurExist && value.post.toLowerCase() === Post.Meneur.toLowerCase()) {
      teamArray.push(value);
    } else if (!pivotExist && value.post.toLowerCase() === Post.Pivot.toLowerCase()) {
      teamArray.push(value);
    } else if (!ailierExist && value.post.toLowerCase() === Post.Ailier.toLowerCase()) {
      teamArray.push(value);
    } else if (!ailierFortExist && value.post.toLowerCase() === Post.AlierFort.toLowerCase()) {
      teamArray.push(value);
    } else if (!arriereExist && value.post.toLowerCase() === Post.Arriere.toLowerCase()) {
      teamArray.push(value);
    } else {
      teamArray.push(value);
    }


    if (teamArray.length === minEquipe) {
      teamsObject[`team${Math.floor(index / minEquipe) + 1}`] = teamArray;
      teamArray = [];
    }
  });*/
}


