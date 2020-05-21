class Timer {
    constructor(mins, secs) {
        this.mins = mins || 25
        this.secs = secs || 0
        this.currMins = this.mins
        this.currSecs = this.secs
        this.running = false
    }
    start() {
        if (this.currMins == 0 && this.currSecs == 0) {
            pauseBtn.classList.toggle("timer-extension-hidden")
            return
        }
        this.running = true
        minsInput.disabled = true
        secsInput.disabled = true
        this.timerId = setInterval(() => {
            this.currSecs--
            if (this.currSecs < 0) {
                this.currMins--
                this.currSecs = 59
            }
            if (this.currMins <= 0 && this.currSecs <= 0) {
                this.stop()
                pauseBtn.classList.toggle("timer-extension-hidden")
            }
            this.show()

        }, 1000)
    }
    stop() {
        this.running = false
        clearInterval(this.timerId)
    }
    show() {
        minsInput.value = timer.currMins < 10 ? "0" + timer.currMins : timer.currMins
        secsInput.value = timer.currSecs < 10 ? "0" + timer.currSecs : timer.currSecs
    }
    update() {
        if (!this.running) {
            this.mins = localStorage.getItem("mins")
            this.secs = localStorage.getItem("secs")
            this.currMins = localStorage.getItem("mins")
            this.currSecs = localStorage.getItem("secs")
        }
    }
    reset() {
        this.stop()
        minsInput.disabled = false
        secsInput.disabled = false
        startBtn.classList.remove("timer-extension-hidden")
        this.currMins = this.mins
        this.currSecs = this.secs
    }

}
