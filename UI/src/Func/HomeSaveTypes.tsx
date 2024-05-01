// 对齐快捷键
import { rif, RE, IHotkey, delay, Lock, Fsytle, Click} from "../RIF"

export const HomeSaveTypes: IHotkey = {
    PATH: {
        get addObject() { return rif().class('editor-toolbar_i1J.toolbar_Qbd').class('button_iZC').hasHtml('Editor/Object.svg').state() },

        get addObject_typeSelect() { return rif().class('panel_WVw.panel_YqS.expanded.collapsible.panel_R8J').class('virtual-list_Amj').get(0) }

    },
    HOTKEYS: RE(
        ['Home'], async () => {
            async function LoadState() {
                if (!await Lock('HomeSaveTypesLOAD',500)) { return null };
                const HomeTypeSave = (window as any).mioHotkeyMod.HomeTypeSave
                if (!HomeTypeSave) { return null }
                for (const dom of HomeTypeSave){
                    let doms = HomeSaveTypes.PATH.addObject_typeSelect.all.hasHtml(dom.name).items
                    doms.items = doms.filter((item:any) => Fsytle(item,'--level') == dom.level)
                    try{
                    Click( doms[0].children[1].children[0] )
                    }catch{
                        Click( doms[0] )
                    }
                    await delay(50)
                }
            }
            async function SaveState() {
                if (!await Lock('HomeSaveTypesSAVE',500)) { return null };
                let clickList = []
                let selectE = HomeSaveTypes.PATH.addObject_typeSelect.class('selected').item
                let level = Fsytle(selectE,'--level')
                clickList.unshift(selectE)

                for (let i = level - 1; i >= 0; i--){
                    while (Fsytle(selectE,'--level') != i){
                        selectE = selectE.previousElementSibling
                    }
                    clickList.unshift(selectE)
                };
                clickList = clickList.map((item:any) => {return {name:item.children[0].innerHTML,level:Fsytle(item,'--level')}});
                (window as any).mioHotkeyMod.HomeTypeSave = clickList;

            }


            HomeSaveTypes.PATH.addObject.click; await delay(500)

            await LoadState();

            await delay(100)
            try{
            HomeSaveTypes.PATH.addObject_typeSelect.item.addEventListener('click', async function (event: MouseEvent) {
                if (!await Lock('HomeSaveTypes')) { return null };
                if (event.button === 0) {
                await delay(500)
                await SaveState()
                }
            })
        }catch{}
        }
    )
}

