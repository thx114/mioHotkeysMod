// 对齐快捷键
import { rif,RE,IHotkey,delay} from "../RIF"
export const ToolsSide : IHotkey = {
    PATH:{
        get rangeUp(){
            return rif().class('item-content_nNz').hasHtml(['笔刷粗细']).class('button_KVN').hasHtml('Up')},
        get rangeDown(){
            return rif().class('item-content_nNz').hasHtml(['笔刷粗细']).class('button_KVN').hasHtml('Down')},

        get strengthUp(){
            return rif().class('item-content_nNz').hasHtml(['笔刷强度']).class('button_KVN').hasHtml('Up')},
        get strengthDown(){
            return rif().class('item-content_nNz').hasHtml(['笔刷强度']).class('button_KVN').hasHtml('Down')},

        get ReplaceTreeAge(){return rif().class('tool-options-panel_Se6').class('button_KVN').hasHtml('ReplaceTreeAge')},
        get Replace(){return rif().class('tool-options-panel_Se6').class('content_ZIz').hasHtml('ReplaceTreeAge').class('button_KVN').hasHtml('Replace.svg')},

        PlaceMode(mode:'Point'|'Straight'|'SimpleCurve'|'Circle'){
            return rif().class('item-content_nNz').hasHtml('摆放模式').class('button_KVN').hasHtml(`${mode}.svg`)
        },

        Spacing(mode:'Up'|'Down'){
            return rif().class('item-content_nNz').hasHtml('MeasureEven').class('button_KVN').hasHtml(`${mode}`)
        },

        Rotate(mode:'Up'|'Down'){
            return rif().class('item-content_nNz').hasHtml('旋转').class('button_KVN').hasHtml(`${mode}`)
        },
        
        Themes(mode:'European'|'American'){
            return rif().class('item-content_nNz').hasHtml('地区主题').class('button_KVN').hasHtml(`${mode}.svg`)
        },

        get PrefabType(){
            return rif().class('tool-options-panel_Se6').class('button_KVN').hasHtml(`PrefabType`)
        },

        Type(type:'TreesDeciduous'|'TreesNeedle'|'Bushes'|1|2|3|4|5){
            const _type = typeof type === 'string'?type:`_ptQ">${type}`
            return rif().class('item-content_nNz').hasHtml('TreesDeciduous').class('button_KVN').hasHtml(`${_type}`)
        },

        Flow(mode:'Up'|'Down'|'indicator'){
            return rif().class('item-content_nNz').hasHtml(['流量','深度']).class('button_KVN').hasHtml(`${mode}`)
        },

        Radius(mode:'Up'|'Down'|'indicator'){
            return rif().class('item-content_nNz').hasHtml('半径').class('button_KVN').hasHtml(`${mode}`)
        },

        Age(age:'AllYYTC'|'Sapling'|'Teen'|'Adult'|'Elderly'|'Dead'){
            return rif().class('item-content_nNz').hasHtml('年龄').class('button_KVN').hasHtml(`${age}`)
        },


    },
    HOTKEYS:RE(

        ['shift','KeyW'],async()=>ToolsSide.PATH.Flow('Up').click,
        ['shift','KeyS'],async()=>ToolsSide.PATH.Flow('Down').click,
        ['shift','KeyA'],async()=>ToolsSide.PATH.Radius('Down').click,
        ['shift','KeyD'],async()=>ToolsSide.PATH.Radius('Up').click,
        ['shift','KeyQ'],async()=>ToolsSide.PATH.Flow('indicator').click,
        ['shift','KeyE'],async()=>ToolsSide.PATH.Radius('indicator').click,

        ['shift','KeyW'],async()=>ToolsSide.PATH.rangeUp.click,
        ['shift','KeyS'],async()=>ToolsSide.PATH.rangeDown.click,
        ['shift','KeyA'],async()=>ToolsSide.PATH.strengthDown.click,
        ['shift','KeyD'],async()=>ToolsSide.PATH.strengthUp.click,

        ['ctrl','KeyE'],async()=>ToolsSide.PATH.ReplaceTreeAge.click,
        ['ctrl','KeyR'],async()=>ToolsSide.PATH.Replace.click,

        ['ctrl','Digit1'],async()=>ToolsSide.PATH.PlaceMode('Point').click,
        ['ctrl','Digit2'],async()=>ToolsSide.PATH.PlaceMode('Straight').click,
        ['ctrl','Digit3'],async()=>ToolsSide.PATH.PlaceMode('SimpleCurve').click,
        ['ctrl','Digit4'],async()=>ToolsSide.PATH.PlaceMode('Circle').click,

        ['alt','KeyA'],async()=>ToolsSide.PATH.Spacing('Down').click,//
        ['alt','KeyD'],async()=>ToolsSide.PATH.Spacing('Up').click,

        ['alt','KeyQ'],async()=>ToolsSide.PATH.Rotate('Down').click,//
        ['alt','KeyE'],async()=>ToolsSide.PATH.Rotate('Up').click,

        ['alt','KeyW'],async()=>ToolsSide.PATH.Themes('European').click,//
        ['alt','KeyS'],async()=>ToolsSide.PATH.Themes('American').click,

        ['ctrl','KeyD'],async()=>ToolsSide.PATH.PrefabType.click,//

        ['shift','Digit1'],async()=>ToolsSide.PATH.Type('TreesDeciduous').click,//
        ['shift','Digit2'],async()=>ToolsSide.PATH.Type('TreesNeedle').click,
        ['shift','Digit3'],async()=>ToolsSide.PATH.Type('Bushes').click,
        ['shift','Digit4'],async()=>ToolsSide.PATH.Type(1).click,
        ['shift','Digit5'],async()=>ToolsSide.PATH.Type(2).click,
        ['shift','Digit6'],async()=>ToolsSide.PATH.Type(3).click,
        ['shift','Digit7'],async()=>ToolsSide.PATH.Type(4).click,
        ['shift','Digit8'],async()=>ToolsSide.PATH.Type(5).click,

        ['alt','Unidentified'],async()=>ToolsSide.PATH.Age('AllYYTC').click,//
        ['alt','Digit1'],async()=>ToolsSide.PATH.Age('Sapling').click,
        ['alt','Digit2'],async()=>ToolsSide.PATH.Age('Teen').click,
        ['alt','Digit3'],async()=>ToolsSide.PATH.Age('Adult').click,
        ['alt','Digit4'],async()=>ToolsSide.PATH.Age('Elderly').click,
        ['alt','Digit5'],async()=>ToolsSide.PATH.Age('Dead').click,

    )
}