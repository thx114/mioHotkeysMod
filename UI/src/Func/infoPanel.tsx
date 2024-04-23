
import { rif,RE,IHotkey,delay, RIF,Click} from "../RIF"
export const infoPanel : IHotkey = {
    PATH:{
        get infoButton(){return rif().class('infoview-menu-toggle_bYF').class('button_ke4')},
    },
    HOTKEYS: RE(
        ['KeyI'],async()=>{
            setTimeout(()=>{
                infoPanel.PATH.infoButton.click
            },100)
    }
)
}