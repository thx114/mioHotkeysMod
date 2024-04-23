// 对齐快捷键
import { rif,RE,IHotkey,delay} from "../RIF"
export const Snap : IHotkey = {
    LOC: `<p>shift + 1: 无碎格铺路</p>`,
    PATH:{
        get All(){return rif().class('content_ZIz').class('button_KVN').hasHtml('Snap Options/All.svg').state()},
        get ExistingGeometry(){return rif().class('content_ZIz').class('button_KVN').hasHtml('ExistingGeometry.svg').state()},
        get CellLength(){return rif().class('content_ZIz').class('button_KVN').hasHtml('CellLength.svg').state()},
        get StraightDirection(){return rif().class('content_ZIz').class('button_KVN').hasHtml('StraightDirection.svg').state()},
        get ObjectSide(){return rif().class('content_ZIz').class('button_KVN').hasHtml('ObjectSide.svg').state()},
        get GuideLines(){return rif().class('content_ZIz').class('button_KVN').hasHtml('GuideLines.svg').state()},
        get ZoneGrid(){return rif().class('content_ZIz').class('button_KVN').hasHtml('ZoneGrid.svg').state()},
        get ContourLines(){return rif().class('content_ZIz').class('button_KVN').hasHtml('ContourLines.svg').state()},
    },
    HOTKEYS:RE(
        ['shift','Digit1'],async()=>{
            
            Snap.PATH.ExistingGeometry.disable;await delay(75)
            Snap.PATH.CellLength.enable;await delay(75)
            Snap.PATH.StraightDirection.enable;await delay(75)
            Snap.PATH.ObjectSide.disable;await delay(75)
            Snap.PATH.GuideLines.disable;await delay(75)
            Snap.PATH.ZoneGrid.enable;await delay(75)
        }

    )
}