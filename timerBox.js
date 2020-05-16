const div = document.createElement("DIV")
div.innerHTML = ` 
<div id="timer-extension-wrapper" >
    <div id="timer-extension-wrapper-header">
        Timer
    </div>
    <div class="theme">
        <div id="dark"></div>
        <div id="light"></div>
    </div>
    <div id="box">
        <div id="time">
        <input type="number" name="mins" id="mins" min="0" max="99">
        <input type="number" name="secs" id="secs" min="0" max="59">
        </div>
        <div id="buttons">
        <button id="start"></button>
        <button id="pause" class="hidden"></button>
        <button id="reset"></button>
    </div>
    </div>
   
</div>`
document.body.appendChild(div)