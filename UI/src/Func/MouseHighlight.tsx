import { RE,delay } from "RIF"

export const MouseHighlight = ({
    highlight: async () => {
        const keys = (window as any).mioHotkeyMod.KEYS
        const hoveredElement = (window as any).mioHotkeyMod.DEBUG.target
        if ((keys.alt && keys.shift) && !hoveredElement.classList.contains('style--default')) {
            let backgroundColor = hoveredElement.style.backgroundColor || ''
            hoveredElement.style.backgroundColor = 'lightgreen'
            //     let Loc = window.MIOMOD_SAVE.loc == 'cn' ?
            //         '<p>shift + alt + z : 输出元素</p> <p>shift + alt + Num1 : 输出资产信息</p><p>shift + alt + Num2 : 输出悬浮框</p><p>shift + alt + Num3 : 输出设置详情</p><p>shift + alt + Num4 : 输出鼠标悬浮框</p>' :
            //         '<p>shift + alt + z : Output the DOM element under the mouse cursor</p> <p>shift + alt + Num1 : Output Asset Information</p><p>shift + alt + Num2 : Output Tooltip</p><p>shift + alt + Num3 : Output Settings Details</p><p>shift + alt + Num4 : Output Mouse Hover Box</p>'
            //     InfoP.Update(Loc,
            //         {
            //             fontFamily : "Noto Sans SC",
            //             fontWeight : 'bold',
            //             textShadow: '1.000000rem 1.000000rem 5.000000rem rgba(0, 0, 0, 1.000000)',
            //             fontSize: '20.000000rem',
            //             justifyContent: 'flex-start'
            //         }
            //     )
            hoveredElement.addEventListener('mouseout', function () {
                hoveredElement.style.backgroundColor = backgroundColor || '';
            }, { once: true });
            (window as any).mioHotkeyMod.DEBUG.lastGreenedItem = hoveredElement;
            (window as any).mioHotkeyMod.DEBUG.lastGreenedItembackgroundColor = backgroundColor;
        } else if (!keys.alt && (window as any).mioHotkeyMod.DEBUG.lastGreenedItem) {
            (window as any).mioHotkeyMod.DEBUG.lastGreenedItem.style.backgroundColor = (window as any).mioHotkeyMod.DEBUG.lastGreenedItembackgroundColor || ''
        }
    },
    PATH: {},
    MOUSEOVER_EVENTS: async () => await MouseHighlight.highlight(),
    KEYUP_EVENTS: async (event: any) => {
        if ((!event.shift && !event.alt) && (window as any).mioHotkeyMod.DEBUG.lastGreenedItem) {
            (window as any).mioHotkeyMod.DEBUG.lastGreenedItem.style.backgroundColor = (window as any).mioHotkeyMod.DEBUG.lastGreenedItembackgroundColor || ''
        }
    },
    HOTKEYS: RE(
        ['alt', 'shift', 'KeyE'], async () => {
            const e = (window as any).mioHotkeyMod.DEBUG.lastGreenedItem;
            console.log(e.innerHTML, e)
            ;(window as any).mioHotkeyMod.DEBUG.lastGreenedItem && ((window as any).mioHotkeyMod.DEBUG.lastGreenedItem.style.backgroundColor = 'blue')
            await delay(400)
            ;(window as any).mioHotkeyMod.DEBUG.lastGreenedItem.style.backgroundColor = ''
        }
    )


})