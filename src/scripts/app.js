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

    constructor() {
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

    minCountdown() {
        if (this.mins < 0) {
            return;
        }

        this.timer[0].innerHTML = this.mins + "." + 10;
        this.secCountdown();
    }

    secCountdown(secs = 10) {
        if (secs < 0) {
            --this.mins;
            this.minCountdown();
        }

        this.timer[0].innerHTML = this.mins + "." + secs;
        setTimeout(() => {
            this.secCountdown(--secs);
        }, 1000);
    }

    timerClick = () => {
        this.timer[0].removeEventListener("click", this.timerClick);
        this.sessionPlus.removeEventListener("click", this.sessionAdd);
        this.sessionMin.removeEventListener("click", this.sessionSub);
        this.breakPlus.removeEventListener("click", this.breakAdd);
        this.breakMin.removeEventListener("click", this.breakSub);

        this.mins = parseInt(this.timer[0].innerHTML) - 1;

        this.minCountdown();
    };

    sessionAdd = () => {
        let time = parseInt(this.timer[0].innerHTML);
        this.session[0].innerHTML = time + 1;
        this.timer[0].innerHTML = time + 1;
    };

    sessionSub = () => {
        let time = parseInt(this.timer[0].innerHTML);
        this.session[0].innerHTML = time - 1;
        this.timer[0].innerHTML = time - 1;
    };

    breakAdd = () => {
        let time = parseInt(this.respite[0].innerHTML);
        this.respite[0].innerHTML = time + 1;
    };

    breakSub = () => {
        let time = parseInt(this.respite[0].innerHTML);
        this.respite[0].innerHTML = time - 1;
    };
}

window.onload = function () {
    new Pomodoro();
};