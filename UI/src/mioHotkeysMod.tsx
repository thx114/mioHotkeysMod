import { rif, RE, Lock, delay, setNativeValue, on, editKey, editValue } from 'RIF'
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
import { debugPanel } from 'Func/debugPanel'
import { Hotkeys } from 'HOTKEYS'


const DEBUG = false
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
            addObjectTypeSave: [],
            eventsID: [],
            funcToggle: {}
        }
    };
    ; (window as any).Lock = {}
        ; (window as any).mioHotkeyMod_main = true

    console.log('MioHotkeyMod loaded');

    (function FuncS() {
        on.func('infoPanel.claerMode', false)
        on.func('transportView', false)

    })()



    let HOTKEY_ITEMS: any = []
    let KEYUP_EVENTS: any = []
    let MOUSE_EVENTS: any = []
    let DBCLICK_EVENTS: any = []
    let WHEEL_EVENTS: any = []
    let MOUSEOVER_EVENTS: any = []
    let MOUSEMOVE_EVENTS: any = []

        ; (window as any).mioHotkeyMod.EVENTS = {
            HOTKEY_ITEMS,
            KEYUP_EVENTS,
            MOUSE_EVENTS,
            DBCLICK_EVENTS,
            WHEEL_EVENTS,
            MOUSEOVER_EVENTS,
            MOUSEMOVE_EVENTS
        }

    ////////////////
    const HotkeyFuncs = [Snap, NetTool, HomeSaveTypes, ToolsSide, infoPanel, MouseHighlight, editor, debugPanel]
    const KeyupFuncs = [MouseHighlight]
    const MouseFuncs = [NetTool, transportView, infoPanel]
    const DBCLICKFuncs = [smartClose]
    const WheelFuncs = [ScrollNav]
    const MouseoverFuncs = [MouseHighlight]
    const StartFuncs = [debugPanel]
    //const MousemoveFuncs = []
    ////////////////

    HotkeyFuncs.forEach((item) => { HOTKEY_ITEMS.push(item.HOTKEYS) })
    KeyupFuncs.forEach((item) => { KEYUP_EVENTS.push(item.KEYUP_EVENTS) })
    MouseFuncs.forEach((item) => { MOUSE_EVENTS.push(item.MOUSE_EVENTS) })
    DBCLICKFuncs.forEach((item) => { DBCLICK_EVENTS.push(item.DBCLICK_EVENTS) })
    WheelFuncs.forEach((item) => { WHEEL_EVENTS.push(item.WHEEL_EVENTS) })
    MouseoverFuncs.forEach((item) => { MOUSEOVER_EVENTS.push(item.MOUSEOVER_EVENTS) })
    StartFuncs.forEach((item) => { if (item.startFunc) { item.startFunc() } })
    //MousemoveFuncs.forEach((item) => { MOUSEMOVE_EVENTS.push(item.MOUSEMOVE_EVENTS) })

    const HotkeysLength = HOTKEY_ITEMS.length
    const EventsLength = (() => {
        let l = 0;
        [KEYUP_EVENTS, MOUSE_EVENTS, DBCLICK_EVENTS, WHEEL_EVENTS, MOUSEOVER_EVENTS].forEach((item) => { l += item.length })
        return l
    })()

    console.log(`${HotkeysLength} Hotkeys and ${EventsLength} Events loaded`)


    // 按键监听
    document.addEventListener('keydown', async (e) => {
        if (!await Lock('keydown', 20)) { return null };

        (window as any).mioHotkeyMod.KEYS.shift = e.shiftKey || false;
        (window as any).mioHotkeyMod.KEYS.alt = e.altKey || false;
        (window as any).mioHotkeyMod.KEYS.ctrl = e.ctrlKey || false;
        (window as any).mioHotkeyMod.KEYS.key = e.code || false;

        if (DEBUG) {
            console.log('keydown', e.code)
        }

        async function runHotkeys() {
            if (!await Lock('keydownRUN', 20)) { return null };

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
        if (!await Lock('keyup', 50)) { return null };
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
    document.addEventListener('dblclick', async function (event) {
        if (!await Lock('dblclick')) { return null };
        for (const func of DBCLICK_EVENTS) {
            await func()
        }
    });

    // wheel
    document.addEventListener('wheel', async function (event) {
        if (!await Lock('mousedown', 10)) { return null };
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

    document.addEventListener('mousemove', async function (event) {
        if (!await Lock('mousemove', 10)) { return null };
        for (const func of MOUSEMOVE_EVENTS) {
            await func()
        }

    })

        ; (window as any).RE = RE
        ; (window as any).setNativeValue = setNativeValue;
    ; (window as any).rif = rif;
    ; (window as any).delay = delay;
    ; (window as any).addevent = (type: string, func: any, id: string = '') => {
        if ((window as any).mioHotkeyMod.eventsID.includes(id) && id != '') { return null }
        (window as any).mioHotkeyMod.EVENTS[type].push(func)
    }
    (window as any).mioevent = () => {
        return (window as any).mioHotkeyMod.EVENTS
    }
    (window as any).hotkey = Hotkeys;

    (window as any).edithotkey = (ID: string, obj: any) => {
        const dir = ID.split('.');

        if(typeof obj == 'undefined'){return editKey((window as any).mioHotkeyMod.EVENTS.HOTKEY_ITEMS[dir[0]],Number(dir[1]))}

        if (obj.key) {
            return (window as any).mioHotkeyMod.EVENTS.HOTKEY_ITEMS[dir[0]] =
                editKey(
                    (window as any).mioHotkeyMod.EVENTS.HOTKEY_ITEMS[dir[0]],
                    Number(dir[1]),
                    obj.key
                )
        }
        if (obj.value) {
            return (window as any).mioHotkeyMod.EVENTS.HOTKEY_ITEMS[dir[0]] =
                editValue(
                    (window as any).mioHotkeyMod.EVENTS.HOTKEY_ITEMS[dir[0]],
                    Number(dir[1]),
                    obj.value
                )
        }
    }
    return null
}
