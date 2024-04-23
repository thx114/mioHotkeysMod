import { ModRegistrar } from "cs2/modding";
import { load } from "mioHotkeysMod";

const register: ModRegistrar = (moduleRegistry) => {

    moduleRegistry.append('Game', load);
    moduleRegistry.append('Editor', load);
}

export default register;