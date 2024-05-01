
import { info } from "info";
import { rif, RE, IHotkey, delay, RIF, Click, on } from "../RIF"
const closeInfo = async () => {
    let times = 0
    while (times < 10) {
        await delay(20)
        const infoP = document.querySelector('.active-infoview-panel_aTq')
        if (infoP) {
            times = 99
            Click(infoP.querySelector('.close-button_wKK'))
        }
        times++

    }
}
export const infoPanel: IHotkey = {
    PATH: {
    },
    HOTKEYS: RE(
        ['KeyI'], async () => {
            await closeInfo()
        },
        ['shift', 'KeyI'], async () => {
            on.func('infoPanel.claerMode', 'r')
            info(`clearMode > ${on.func('infoPanel.claerMode')}`)
        },
        ['KeyB'], async () => {
            if (!on.func('infoPanel.claerMode')) return
            await closeInfo()
        },
    ),
    MOUSE_EVENTS: async () => {
        if (!on.func('infoPanel.claerMode')) return
        await closeInfo()
    }
}