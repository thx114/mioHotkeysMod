import { IHotkey, on, RE } from "RIF"

export const debugPanel: IHotkey = {
    PATH: {},
    startFunc: () => {
        if (!document.getElementById('consolePanel')) {


            let consolePanel = document.createElement("div")
            consolePanel.id = 'consolePanel'
            consolePanel.className = 'console-container'
            consolePanel.innerHTML = `
            <textarea id="console-log" class="content__Ej content_AD7 child-opacity-transition_nkS console-log" readonly>
                
            </textarea>
            <input type="text" class="console-input" id="console-input" placeholder="Type here..." >
                
            `
            consolePanel.classList.add('hidden')


            document.body.appendChild(consolePanel);
            //;(document.querySelector('.console-log') as any).style.setProperty('--panelRadius', '20px')

            (function loadStyles() {
                var stylesheet = document.styleSheets[0];

                const rules = [
                    `.console-log {
                        background-color: rgb(244,244,244);
                        color: rgb(0,0,0);
                        padding:10rem;
                        width: 500rem;
                        height: 500rem;
                        border-top-left-radius: 10rem;
                        border-top-right-radius: 10rem;
                    }`,
                    `.console-input {
                        width: 500rem;
                        padding: 5rem;
                        font-size: 16rem;
                        border-bottom-left-radius: 10rem;
                        border-bottom-right-radius: 10rem;
                    }`,
                    `.console-container {
                        position: fixed;
                        top: 300rem;
                    }`,
                    `.hidden {
                        display: none;
                    }`
                ];

                rules.forEach(rule => {
                    stylesheet.insertRule(rule, stylesheet.cssRules.length);
                });
            })();
            setTimeout(function () {
                let logTextarea = document.getElementById('console-log') as any
                let inputField = document.getElementById('console-input') as any



                function logMessage(message: string) {
                    logTextarea.value += message + '\n';
                    logTextarea.scrollTop = logTextarea.scrollHeight;
                }

                const cmdDir = {
                    tv: () => on.func('transportView','r')
                }

                inputField.addEventListener('keydown', function (event: KeyboardEvent) {
                    if (event.code === 'Enter') {
                        let inputText = inputField.value
                        if (inputText !== '') {
                            const input = inputField.value;
                            (window as any).mioHotkeyMod.lastEnterDebugMsg = input
                            logMessage('> ' + inputText);
                            inputField.value = '';
                            let out
                            if ((cmdDir as any)[inputText]) {
                                logMessage((cmdDir as any)[inputText]());
                                return;
                            } else {
                                try {
                                    out = eval(input)
                                } catch (e: any) {
                                    out = e.message
                                }
                            }
                            logMessage('  ' + out);
                        }
                    }
                    else if (event.code === 'Escape') {
                        logTextarea.value = '';
                    }
                    else if (event.code === 'ArrowUp') {
                        inputField.value = (window as any).mioHotkeyMod.lastEnterDebugMsg
                    }
                });

            }, 1000)


            var originalLog = console.log;

            ; (window as any).console.log = function () {
                let logTextarea = document.getElementById('console-log') as any
                for (var i = 0; i < arguments.length; i++) {
                    logTextarea.value += arguments[i] + ' ';
                }
                logTextarea.value += '\n';
                logTextarea.scrollTop = logTextarea.scrollHeight;
                originalLog.apply(console, (arguments as any));
            }

            var originalError = console.error;

            ; (window as any).console.error = function () {
                let logTextarea = document.getElementById('console-log') as any
                for (var i = 0; i < arguments.length; i++) {
                    logTextarea.value += arguments[i] + ' ';
                }
                logTextarea.value += '\n';
                logTextarea.scrollTop = logTextarea.scrollHeight;
                originalError.apply(console, (arguments as any));
            }


        }
    },
    HOTKEYS: RE(
        ['shift', 'F1'], async () => {
            document.getElementById('consolePanel')?.classList.toggle('hidden')
        }
    )
}