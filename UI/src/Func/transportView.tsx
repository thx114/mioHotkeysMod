
import { rif, RE, IHotkey, delay, RIF, Click } from "../RIF"
function enableItems(buttons: RIF, items: number[]) {
    buttons.items.forEach((item, index) => {
        if (items&&items.includes(index)) {
            buttons.getItems([index])[0].state('active_m64').enable
        } else {
            buttons.getItems([index])[0].state('active_m64').disable
        }
    })
}
export const transportView: IHotkey = {
    PATH: {
        get title() { const i = rif().class('header_H_U').class('icon_OVK').items[0] as any; if (i) return i.src },
        get assetPanel() { return rif().class('asset-panel_VFR').items.length },
        get selectedAsset() { const i = rif().class('asset-grid_H7_').class('selected.item_KJ3').class('thumbnail_kkU').items[0] as any; if (i) return i.src },
        get buttons() { return rif().class('infomodes-panel_B0O').class('button_ECf') }
    },
    MOUSE_EVENTS: async () => {
        await delay(200)
        const P = transportView.PATH

        if (
            P.assetPanel &&
            (() => { const i = P.title; if (i) return i.includes('Transport') })()
        ) {
            if(!P.selectedAsset)return;
            if (P.selectedAsset.includes('Bus')) enableItems(P.buttons, [12, 13]);
            else if (P.selectedAsset.includes('Train')) enableItems(P.buttons, [12, 14]);
            else if (P.selectedAsset.includes('Tram')) enableItems(P.buttons, [12, 15]);
            else if (P.selectedAsset.includes('Subway')) enableItems(P.buttons, [12, 16]);
            else if (P.selectedAsset.includes('Ship')) enableItems(P.buttons, [12, 17]);
        }
    }
}