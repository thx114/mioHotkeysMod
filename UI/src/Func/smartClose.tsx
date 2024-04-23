
import { rif, IHotkey} from "../RIF"

export const smartClose: IHotkey = {
    PATH: {
        TLE:{
            getpanelList() {
                return [
                    rif().class('panel__Container-c2vm-tle__sc-1et6j5f-0').class('button__ButtonComponent-c2vm-tle__sc-u09bwf-0'),
                    (() => {
                        let item = rif().class('button__ButtonComponent-c2vm-tle__sc-u09bwf-0')
                        return item.items[item.items.length - 1]
                    })() 
                ] 
            } 
        },
        I:[

        ]
    },
    DBCLICK_EVENTS: async () => {
        if((window as any).mioHotkeyMod.KEYS.mousedown != 0){return}
        for (const item of smartClose.PATH.TLE.getpanelList()) {
            if (item) { try { item.click } catch { }; break }
        }
    }
}
