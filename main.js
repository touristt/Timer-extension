const wrapper = document.querySelector("#timer-extension-wrapper")
const header = document.querySelector("#timer-extension-wrapper-header")
const mins = localStorage.getItem("mins")
const secs = localStorage.getItem("secs")
const theme = localStorage.getItem("theme")
const timer = new Timer(mins, secs)
const time = document.querySelector("#time")
const minsInput = document.querySelector("#mins")
const secsInput = document.querySelector("#secs")
const startBtn = document.querySelector("#start")
const resetBtn = document.querySelector("#reset")
const pauseBtn = document.querySelector("#pause")
const dark = document.querySelector("#dark")
const light = document.querySelector("#light")
const color = "#202124"
const timerLeft = localStorage.getItem("timer-left")
const timerTop = localStorage.getItem("timer-top")

if (timerLeft && timerTop) {
    wrapper.style.left = timerLeft;
    wrapper.style.top = timerTop;
}

location.href.includes("https://leetcode.com/problems/") ? null : wrapper.classList.toggle("hidden")

minsInput.value = timer.mins < 10 ? "0" + timer.mins : timer.mins
secsInput.value = timer.secs < 10 ? "0" + timer.secs : timer.secs

const loadSvgs = async () => {
    const pauseSvg = await (await fetch(chrome.runtime.getURL("images/icons/pause.svg"))).text()
    pauseBtn.innerHTML = pauseSvg
    const startSvg = await (await fetch(chrome.runtime.getURL("images/icons/start.svg"))).text()
    startBtn.innerHTML = startSvg
    const resetSvg = await (await fetch(chrome.runtime.getURL("images/icons/reset.svg"))).text()
    resetBtn.innerHTML = resetSvg
    const darkSvg = await (await fetch(chrome.runtime.getURL("images/icons/moon.svg"))).text()
    dark.innerHTML = darkSvg
    const lightSvg = await (await fetch(chrome.runtime.getURL("images/icons/sun.svg"))).text()
    light.innerHTML = lightSvg
}
loadSvgs()

if (theme == "light") {
    light.classList.add("hidden")
    wrapper.style.background = "transparent"
    header.style.background = "white"
}
else {
    dark.classList.add("hidden")
    wrapper.style.background = color
    header.style.background = "#191919"
}

const start = () => {
    timer.start()
    toggleClasses()
}

const pause = () => {
    timer.stop()
    toggleClasses()
}

const reset = () => {
    timer.running ? toggleClasses() : null
    timer.reset()
    minsInput.value = timer.currMins < 10 ? "0" + timer.currMins : timer.currMins
    secsInput.value = timer.currSecs < 10 ? "0" + timer.currSecs : timer.currSecs
}
const toggleClasses = () => {
    startBtn.classList.toggle("hidden")
    pauseBtn.classList.toggle("hidden")
}

const setDarkTheme = () => {
    localStorage.setItem("theme", "dark")
    dark.classList.toggle("hidden")
    light.classList.toggle("hidden")
    wrapper.style.background = color
    header.style.background = "#191919"
}

const setLightTheme = () => {
    localStorage.setItem("theme", "light")
    dark.classList.toggle("hidden")
    light.classList.toggle("hidden")
    wrapper.style.background = "transparent"
    header.style.background = "white"
}

startBtn.addEventListener("click", start)
pauseBtn.addEventListener("click", pause)
resetBtn.addEventListener("click", reset)
dark.addEventListener("click", setDarkTheme)
light.addEventListener("click", setLightTheme)

minsInput.addEventListener("change", (e) => {
    if (e.target.value < 0) e.target.value = 0
    if (e.target.value > 99) e.target.value = 99
    localStorage.setItem("mins", e.target.value)
    localStorage.setItem("secs", timer.secs)
    timer.update()
})

secsInput.addEventListener("change", (e) => {
    if (e.target.value < 0) e.target.value = 0
    if (e.target.value > 59) e.target.value = 59
    localStorage.setItem("secs", e.target.value)
    localStorage.setItem("mins", timer.mins)
    timer.update()
})


document.onkeyup = function (e) {
    if (e.ctrlKey && e.shiftKey && e.which == 72) {
        wrapper.classList.toggle("hidden")
    }
    else if (e.ctrlKey && e.shiftKey && e.which == 32) {
        if (timer.running) pause()
        else start()
    }
    else if (e.ctrlKey && e.shiftKey && e.which == 81) {
        reset()
    }


};


dragElement(wrapper);
