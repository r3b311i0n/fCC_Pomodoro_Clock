require("../styles/styles.css");

class Pomodoro {
    timer;
    session;
    respite;
    sessionPlus;
    sessionMin;
    breakPlus;
    breakMin;
    mins;
    sessionMinutes;
    breakMinutes;
    secs = 59;
    pause;
    onBreak = false;
    logo;

    constructor() {
        this.logo = document.getElementsByClassName("logo");
        this.sessionPlus = document.getElementById("sessionPlus");
        this.sessionMin = document.getElementById("sessionMin");
        this.breakPlus = document.getElementById("breakPlus");
        this.breakMin = document.getElementById("breakMin");
        this.timer = document.getElementsByClassName("timer");
        this.session = document.getElementsByClassName("session");
        this.respite = document.getElementsByClassName("break");

        this.sessionPlus.addEventListener("click", this.sessionAdd);
        this.sessionMin.addEventListener("click", this.sessionSub);
        this.breakPlus.addEventListener("click", this.breakAdd);
        this.breakMin.addEventListener("click", this.breakSub);
        this.timer[0].addEventListener("click", this.timerClick);
    }

    async minCountdown() {
        if (this.mins < 0) {
            if (!this.onBreak) {
                this.onBreak = true;
                this.logo[0].innerHTML = "break!";
                this.mins = this.breakMinutes - 1;
                await this.minCountdown();
                return Promise.resolve();
            }
            else {
                this.onBreak = false;
                this.logo[0].innerHTML = "session";
                this.mins = this.sessionMinutes - 1;
                await this.minCountdown();
                return Promise.resolve();
            }
        }

        this.timer[0].innerHTML = this.mins + ":" + this.secs;
        await this.secCountdown();
        return Promise.resolve();
    }

    async secCountdown() {
        if (this.secs < 0) {
            this.secs = 59;
            --this.mins;
            await this.minCountdown();
            return Promise.resolve();
        }

        if (this.secs < 10) {
            this.timer[0].innerHTML = this.mins + ":0" + this.secs;
        } else {
            this.timer[0].innerHTML = this.mins + ":" + this.secs;
        }
        return new Promise(async(resolve) => {
            this.pause = window.setTimeout(async() => {
                --this.secs;
                await this.secCountdown();
                resolve();
            }, 1000);
        });
    }

    timerClick = async() => {
        this.logo[0].innerHTML = "session";

        this.sessionMinutes = parseInt(this.session[0].innerHTML);
        this.breakMinutes = parseInt(this.respite[0].innerHTML);
        this.timer[0].removeEventListener("click", this.timerClick);
        this.timer[0].addEventListener("click", this.pauseTimer);
        this.sessionPlus.removeEventListener("click", this.sessionAdd);
        this.sessionMin.removeEventListener("click", this.sessionSub);
        this.breakPlus.removeEventListener("click", this.breakAdd);
        this.breakMin.removeEventListener("click", this.breakSub);

        this.mins = this.sessionMinutes - 1;

        await this.minCountdown();
    };

    resumeTimer = async() => {
        this.timer[0].removeEventListener("click", this.resumeTimer);
        this.timer[0].addEventListener("click", this.pauseTimer);
        this.sessionPlus.removeEventListener("click", this.sessionAdd);
        this.sessionMin.removeEventListener("click", this.sessionSub);
        this.breakPlus.removeEventListener("click", this.breakAdd);
        this.breakMin.removeEventListener("click", this.breakSub);

        if (this.onBreak && this.breakMinutes !== parseInt(this.respite[0].innerHTML)) {
            this.breakMinutes = parseInt(this.respite[0].innerHTML);
            this.mins = this.breakMinutes - 1;
            this.secs = 59;
        }
        else if (!this.onBreak) {
            if (this.sessionMinutes !== parseInt(this.session[0].innerHTML)) {
                this.sessionMinutes = parseInt(this.session[0].innerHTML);
                this.breakMinutes = parseInt(this.respite[0].innerHTML);
                this.mins = this.sessionMinutes - 1;
                this.secs = 59;
            }
            else if (this.breakMinutes !== parseInt(this.respite[0].innerHTML)) {
                this.breakMinutes = parseInt(this.respite[0].innerHTML);
            }
        }

        await this.minCountdown();
    };

    pauseTimer = () => {
        this.timer[0].removeEventListener("click", this.pauseTimer);
        this.timer[0].addEventListener("click", this.resumeTimer);
        if (this.onBreak) {
            this.breakPlus.addEventListener("click", this.breakAdd);
            this.breakMin.addEventListener("click", this.breakSub);
        } else {
            this.sessionPlus.addEventListener("click", this.sessionAdd);
            this.sessionMin.addEventListener("click", this.sessionSub);
            this.breakPlus.addEventListener("click", this.breakAdd);
            this.breakMin.addEventListener("click", this.breakSub);
        }

        window.clearTimeout(this.pause);
    };

    sessionAdd = () => {
        let time = parseInt(this.timer[0].innerHTML);
        this.session[0].innerHTML = time + 1;
        this.timer[0].innerHTML = time + 1;
    };

    sessionSub = () => {
        if (parseInt(this.session[0].innerHTML) === 1) {
            return;
        }

        let time = parseInt(this.timer[0].innerHTML);
        this.session[0].innerHTML = time - 1;
        this.timer[0].innerHTML = time - 1;
    };

    breakAdd = () => {
        let time = parseInt(this.respite[0].innerHTML);
        this.respite[0].innerHTML = time + 1;
    };

    breakSub = () => {
        if (parseInt(this.respite[0].innerHTML) === 1) {
            return;
        }

        let time = parseInt(this.respite[0].innerHTML);
        this.respite[0].innerHTML = time - 1;
    };
}

window.onload = function () {
    new Pomodoro();
};