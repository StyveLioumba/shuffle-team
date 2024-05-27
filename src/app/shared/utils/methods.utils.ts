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


  public static transformPictureUrl(player:Player){
    const url = new URL(player.picture);
    const id = url.searchParams.get('id');
    return `https://drive.google.com/thumbnail?id=${id}&sz=w800`
  }
}


