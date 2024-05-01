import { rif, RE, IHotkey, delay, Lock, Fsytle, Click, RIF, on } from "../RIF"

function setNativeValue(element: Element, value: any) {
    const valueSetter = (Object.getOwnPropertyDescriptor(element, 'value') as any).set;
    const prototype = Object.getPrototypeOf(element);
    const prototypeValueSetter = (Object.getOwnPropertyDescriptor(prototype, 'value') as any).set;

    if (valueSetter && valueSetter !== prototypeValueSetter) {
        prototypeValueSetter.call(element, value);
    } else {
        valueSetter.call(element, value);
    }
    element.dispatchEvent(new Event('input', { bubbles: true }));
}

function _class(cls: string, E: Element = document.body) {
    const output = E.querySelector(`.${cls}`) as Element
    if (!output) { console.warn('class未能找到:', cls) }
    return output
}
function _allClass(cls: string, E: Element = document.body) {
    const output = E.querySelectorAll(`.${cls}`) as any
    if (!output) { console.warn('allclass未能找到:', cls) }
    return output
}



var stylesheet = document.styleSheets[0];

const rules = [
    `.editor-item_VnW { padding-top: 0px; padding-bottom: 0px}`,
    `.expandable-header_hQZ { padding-top: 0px; padding-bottom: 0px}`,
    `.toggle_IOi { padding-top: 0px; padding-bottom: 0px}`,
    `.beta-banner_qiZ { display: none}`,
    `.header_MLk {border-top-left-radius: 20rem}`,
    `.toggle_IOi { width: auto}`,
    `.list-item_zT4 {flex:1;display: flex;flex-direction:row; flex-wrap: wrap}`,
    `.editor-item_VnW.editor-item-base_sYx.editor-widget_QQl { padding-top: 0px; padding-bottom: 0px}`,
    `.control_Hds {width: auto}`,
    `.label_Mi4 { padding-left: 0px; padding-right: 0px}`,
    `.label_BbZ { width: 20%}`
];

rules.forEach(rule => {
    stylesheet.insertRule(rule, stylesheet.cssRules.length);
});
function setValue(
    itemName: string[] ,
    value: string[] | string,
    inputClass = 'input_Wfi',
    afterFunc:boolean|Function = false,
    matchFunc:boolean|Function = false,
    repalceFunc = (i:Element[],value:string,index:any)=>{
        setNativeValue(i[0], value)
    }
) {
    if(!afterFunc){
        afterFunc = async () => {
        const item = rif().class('editor-section_zoX').class('button_M6C').hasHtml('ThickStrokeArrowDown');
        item.click
        await delay(50)
        item.click
    }}

    if(!matchFunc){
        matchFunc = (i:Element,itemName_=itemName)=>{
                let match = false;
                itemName.forEach(name => { if (i&&i.innerHTML.includes(name)) { match = true } });
                return match;
            }
            
        }

    Array.from(document.querySelectorAll(".row_d2o"))
        .filter(i => (matchFunc as Function)(i,itemName))
        .map(i => i.querySelectorAll(inputClass))
        .forEach((i: any, index) => {
            let _value
            if (value instanceof Array) {
                _value = value[index]
            }else{
                _value = value
            }
            repalceFunc(i, _value, index)
        })
    setTimeout((afterFunc as Function),50)
}


export const editor: IHotkey = {
    PATH: {},
    HOTKEYS: RE(
        ['F3'], async () => {
            if (!on.Editor) return;
            setValue(["概率", "Probability"], '100', '.slider-input_DXM.input_Wfi')
        },
        ['F4'], async () => {
            if (!on.Editor) return;
            setValue(["父网格", "Parent Mesh"], '0', '.input_Wfi')
        },
        ['F6'], async () => {
            if (!on.Editor) return;
            (window as any).Efunc()
        }
    )
};
;


