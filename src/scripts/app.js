require("../styles/styles.css");

class Pomodoro {
    timer;
    session;
    respite;

    constructor() {
        const sessionPlus = document.getElementById("sessionPlus");
        const sessionMinus = document.getElementById("sessionMin");
        const breakPlus = document.getElementById("breakPlus");
        const breakMinus = document.getElementById("breakMin");
        this.timer = document.getElementsByClassName("timer");
        this.session = document.getElementsByClassName("session");
        this.respite = document.getElementsByClassName("break");

        sessionPlus.addEventListener("click", this.sessionPlus);
        sessionMinus.addEventListener("click", this.sessionMin);
        breakPlus.addEventListener("click", this.breakPlus);
        breakMinus.addEventListener("click", this.breakMin);
    }

    sessionPlus = () => {
        let time = parseInt(this.timer[0].innerHTML);
        this.session[0].innerHTML = time + 1;
        this.timer[0].innerHTML = time + 1;
    };

    sessionMin = () => {
        let time = parseInt(this.timer[0].innerHTML);
        this.session[0].innerHTML = time - 1;
        this.timer[0].innerHTML = time - 1;
    };

    breakPlus = () => {
        let time = parseInt(this.respite[0].innerHTML);
        this.respite[0].innerHTML = time + 1;
    };

    breakMin = () => {
        let time = parseInt(this.respite[0].innerHTML);
        this.respite[0].innerHTML = time - 1;
    };
}

window.onload = function () {
    new Pomodoro();
};