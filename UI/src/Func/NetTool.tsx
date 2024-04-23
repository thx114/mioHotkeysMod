// 对齐快捷键
import { rif,RE,IHotkey,delay} from "../RIF"
export const NetTool : IHotkey = {
    PATH:{
        get NetToolLine(){return rif().class('item-content_nNz').hasHtml('工具模式').class('button_KVN')},
        get level(){return rif().class('item-content_nNz').hasHtml('高度').class('button_KVN').hasHtml('#1e83aa')},
        get levelUp(){return rif().class('item-content_nNz').hasHtml('高度').class('button_KVN').hasHtml('ThickStrokeArrowUp.svg')},
        get levelDown(){return rif().class('item-content_nNz').hasHtml('高度').class('button_KVN').hasHtml('ThickStrokeArrowDown.svg')},
    },
    HOTKEYS:RE(
        ['ctrl','$KeyQ,KeyW,KeyE,KeyR,KeyT,KeyY,KeyU,KeyI'],async()=>{
            const key = (window as any).mioHotkeyMod.KEYS.key
            const enUm: {[key:string]:number}  = {
                'KeyQ':0,
                'KeyW':1,
                'KeyE':2,
                'KeyR':3,
                'KeyT':4,
                'KeyY':5,
                'KeyU':6,
                'KeyI':7,
            }
            const keyNum = enUm[key]
            NetTool.PATH.NetToolLine.get(keyNum).click

        },
        ['shift','KeyW'],async()=>{
            NetTool.PATH.levelUp.click;await delay(50)
        },
        ['shift','KeyS'],async()=>{
            NetTool.PATH.levelDown.click;await delay(50)
        }
    ),
    MOUSE_EVENTS:async()=>{
        const keys = (window as any).mioHotkeyMod.KEYS
        if(keys.mousedown==2 && keys.shift){
            NetTool.PATH.level.click
        }
    },
    // WHEEL_EVENTS:async()=>{
    //     const keys = (window as any).mioHotkeyMod.KEYS

    //     console.log(keys,keys.alt)
    //     if(keys.wheel=='up' && keys.key =='keyW'){
    //         NetTool.PATH.levelDown.click
    //     }else if(keys.wheel=='down' && keys.key =='keyS'){
    //         NetTool.PATH.levelUp.click
    //     }
    // }
}