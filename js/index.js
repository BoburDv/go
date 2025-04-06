const elGameZone = document.getElementById("gameZone")
const elSecondGameZone = document.getElementById("secondGameZone")
const elUser = document.getElementById("user")
const elRobot = document.getElementById("robot")
const elHands = document.querySelectorAll(".hand")
const elRefreshGame = document.getElementById("refreshGame")
const elStatus = document.getElementById("status")
const elScore = document.getElementById("score")
const elGameZoneInner = document.getElementById("gameZoneInner")
const elModeChanger = document.getElementById("modeChanger")
const elRuleImage = document.getElementById("ruleImage")



function sectionSwapper(boolean) {
    if (boolean) {
        elGameZone.classList.add("hidden");
        elSecondGameZone.classList.remove("hidden");
    }
    else {
        elGameZone.classList.remove("hidden");
        elSecondGameZone.classList.add("hidden");
    }
}


let score = 0;
function UiChanger(variant) {
    elUser.src = `./img/${variant}.svg`;
    const robot = robotChooser()
    setTimeout(() => {
        elRobot.src = `./img/${robot}.svg`
        const winner = findWinner(variant, robot)
        elStatus.innerText = `${winner} WIN`
        if (winner == "YOU") {
            score++
        }
        else if (winner == "ROBOT") {
            score--
        }
        elScore.innerText = score;
    }, 1000);
}



elHands.forEach(element => {
    element.addEventListener("click", function (e) {
        UiChanger(e.target.alt)
        sectionSwapper(true)
    })
});



elRefreshGame.addEventListener("click", function () {
    refreshGame()
})
function refreshGame() {
    elRobot.src = "./img/hand-load.svg"
    sectionSwapper(false);
    elStatus.innerText = ""
}



function robotChooser() {
    const hands = ["paper", "scissors", "rock"];
    const randomIndex = Math.trunc(Math.random() * hands.length)
    return hands[randomIndex];
}



function findWinner(user, robot) {
    if (user == robot) {
        return "TIRED";
    } else if (
        (user == "rock" && robot == "scissors") ||
        (user == "paper" && robot == "rock") ||
        (user == "scissors" && robot == "paper")
    ) {
        return "YOU";
    }
    else {
        return "ROBOT";
    }
}



elModeChanger.addEventListener("click", function (){
    const mode = elGameZoneInner.dataset.mode;
    if (mode == "simple"){
        elGameZoneInner.dataset.mode = "advanced"
        elModeChanger.textContent = "SIMPLE"
        elRuleImage.src = "./img/rule-advanced.png"
    } 
    else {
        elGameZoneInner.dataset.mode = "simple"
        elModeChanger.textContent = "ADVANCED"
        elRuleImage.src = "./img/rule-basic.png"
    }
});
