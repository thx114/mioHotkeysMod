import { rif, RE, Lock, delay } from 'RIF'
import { Snap } from 'Func/Snap'
import { NetTool } from 'Func/NetTool'
import { HomeSaveTypes } from 'Func/HomeSaveTypes'
import { MouseHighlight } from 'Func/MouseHighlight'
import { ToolsSide } from 'Func/ToolsSide'
import { transportView } from 'Func/transportView'
import { infoPanel } from 'Func/infoPanel'
import { ScrollNav } from 'Func/ScrollNav'
import { editor } from 'Func/editor'
import { smartClose } from 'Func/smartClose'


export const load = () => {
    (window as any)._R = rif;
    if ((window as any).mioHotkeyMod_main) { return null }


    if (typeof (window as any).mioHotkeyMod == 'undefined') {
        (window as any).mioHotkeyMod = {
            KEYS: {
                key: false,
                shift: false,
                ctrl: false,
                alt: false,
                mouse: false,
                long: false,
                wheel: false
            },
            DEBUG: {
                target: null,
                lastGreenedItembackgroundColor: null,
                lastGreenedItem: null,
            },
            loadded: true,
            addObjectTypeSave: []
        }
    };
    ;(window as any).Lock = {}
    ;(window as any).mioHotkeyMod_main = true

    console.log('猫猫快捷键已加载')


    let HOTKEY_ITEMS: any = []
    let KEYUP_EVENTS: any = []
    let MOUSE_EVENTS: any = []
    let DBCLICK_EVENTS: any = []
    let WHEEL_EVENTS: any = []
    let MOUSEOVER_EVENTS: any = []

    ////////////////
    const HotkeyFuncs = [Snap, NetTool, HomeSaveTypes, ToolsSide,infoPanel,MouseHighlight,editor]
    const KeyupFuncs = [MouseHighlight]
    const MouseFuncs = [NetTool,transportView]
    const DBCLICKFuncs = [smartClose]
    const WheelFuncs = [ScrollNav]
    const MouseoverFuncs = [MouseHighlight]
    ////////////////

    HotkeyFuncs.forEach((item) => { HOTKEY_ITEMS.push(item.HOTKEYS) })
    KeyupFuncs.forEach((item) => { KEYUP_EVENTS.push(item.KEYUP_EVENTS) })
    MouseFuncs.forEach((item) => { MOUSE_EVENTS.push(item.MOUSE_EVENTS) })
    DBCLICKFuncs.forEach((item) => { DBCLICK_EVENTS.push(item.DBCLICK_EVENTS) })
    WheelFuncs.forEach((item) => { WHEEL_EVENTS.push(item.WHEEL_EVENTS) })
    MouseoverFuncs.forEach((item) => { MOUSEOVER_EVENTS.push(item.MOUSEOVER_EVENTS) })

    console.log(`${HOTKEY_ITEMS.length} 个热键已加载, ${KEYUP_EVENTS.length + MOUSE_EVENTS.length + MOUSEOVER_EVENTS.length} 个事件已加载`)


    // 按键监听
    document.addEventListener('keydown', async (e) => {
        if (!await Lock('keydown',20)) { return null };


        (window as any).mioHotkeyMod.KEYS.shift = e.shiftKey || false;
        (window as any).mioHotkeyMod.KEYS.alt = e.altKey || false;
        (window as any).mioHotkeyMod.KEYS.ctrl = e.ctrlKey || false;
        (window as any).mioHotkeyMod.KEYS.key = e.code || false;

        console.log('KEY',(window as any).mioHotkeyMod.KEYS)
        async function runHotkeys() {
            if (!await Lock('keydownRUN',20)) { return null };
            
            for (const items of HOTKEY_ITEMS) {
                for (const [keys, func] of items) {
                    if (
                        ((keys.includes('shift')) ? e.shiftKey : !e.shiftKey) &&
                        ((keys.includes('alt')) ? e.altKey : !e.altKey) &&
                        ((keys.includes('ctrl')) ? e.ctrlKey : !e.ctrlKey) &&
                        ((keys.includes(e.code)) || (keys[keys.length - 1].includes('?') ?
                            e.code.includes(keys[keys.length - 1].replace('?', '')) :
                            (keys[keys.length - 1].includes('$') && keys[keys.length - 1].includes(e.code))))
                    ) {
                        await func();
                    }
                }
            }
        }
        await runHotkeys();
        
    })

    // 按键释放监听
    document.addEventListener('keyup', async (e) => {
        if (!await Lock('keyup',50)) { return null };
        (window as any).mioHotkeyMod.KEYS.shift = e.shiftKey || false;
        (window as any).mioHotkeyMod.KEYS.alt = e.altKey || false;
        (window as any).mioHotkeyMod.KEYS.ctrl = e.ctrlKey || false;
        (window as any).mioHotkeyMod.KEYS.key = e.code || false;
        for (const items of KEYUP_EVENTS) {
            await items(e)
        }
        
    })

    // mousedown
    document.addEventListener('mousedown', async function (event) {
        if (!await Lock('mousedown')) { return null };
        (window as any).mioHotkeyMod.KEYS.mousedown = event.button
        for (const func of MOUSE_EVENTS) {
            await func()
        }
    });

    // dblclick
    document.addEventListener('dblclick', async function(event) {
        if (!await Lock('dblclick')) { return null };
        for (const func of DBCLICK_EVENTS) {
            await func()
        }
        console.log('双击的位置：', event.clientX, event.clientY);
      });

    // wheel
    document.addEventListener('wheel', async function(event) {
        if (!await Lock('mousedown',10)) { return null };
        (window as any).mioHotkeyMod.KEYS.wheel = event.deltaY > 0 ? 'down' : 'up';
        for (const func of WHEEL_EVENTS) {
            await func()
        }
      });

    // mouseover
    document.addEventListener('mouseover', async function (event) {
        if (!await Lock('mouseover', 20)) { return null };
        // 获取鼠标悬停的目标元素
        const target = event.target;
        if (!target) { return null };
        (window as any).mioHotkeyMod.DEBUG.target = target;
        for (const func of MOUSEOVER_EVENTS) {
            await func()
        }
    })



    return null
}
