const div = document.createElement('DIV');
div.innerHTML = ` 
<div id="timer-extension-wrapper" >
    <div id="timer-extension-wrapper-header">
        <div class="timer-extension-theme">
            <div id="timer-extension-dark"></div>
            <div id="timer-extension-light"></div>
        </div>
        <div class="timer-extension-close" title="Hide timer(ctrl+shift+H)">
            <div id="timer-extension-close-dark"></div>
            <div id="timer-extension-close-light"></div>
        </div>
    </div>
    <div id="timer-extension-box">
        <div id="timer-extension-time">
        <input type="number" name="timer-extension-mins" id="timer-extension-mins" min="0" max="99">
        <input type="number" name="timer-extension-secs" id="timer-extension-secs" min="0" max="59">
        </div>
        <div id="timer-extension-buttons">
        <button id="timer-extension-start" title="Start timer(ctrl+shift+Space)"></button>
        <button id="timer-extension-pause"  title="Pause timer(ctrl+shift+Space)" class="timer-extension-hidden"></button>
        <button id="timer-extension-reset"  title="Reset timer(ctrl+shift+Q)"></button>
    </div>
    </div>
   
</div>`;
document.body.appendChild(div);
