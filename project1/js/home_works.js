/// Email checker





const gmailInput = document.querySelector("#gmail_input")
const gmailButton = document.querySelector("#gmail_button");
const gmailResult = document.querySelector("#gmail_result");

const regExp = /^[a-zA-Z0-9._%+-]+@gmail\.com$/
gmailButton.onclick = () => {
    if (regExp.test(gmailInput.value)) {
        gmailResult.innerHTML = "OK"
        gmailResult.style.color = "green"
    } else {
        gmailResult.innerHTML = "NOT OK"
        gmailResult.style.color = "red"
    }
}



/// move block


const parentBlock = document.querySelector(".parent_block");
const childBlock = document.querySelector(".child_block");

let positionX = 0;
let positionY = 0;
let arrow = "right";

function moveBlock() {
    const parentWidth = parentBlock.offsetWidth;
    const parentHeight = parentBlock.offsetHeight;
    const childWidth = childBlock.offsetWidth;
    const childHeight = childBlock.offsetHeight;


    if (arrow === "right") {
        positionX += 1;
        if (positionX + childWidth >= parentWidth) {
            arrow = "down";
        }
    } else if (arrow === "down") {
        positionY += 1;
        if (positionY + childHeight >= parentHeight) {
            arrow = "left";
        }
    } else if (arrow === "left") {
        positionX -= 1;
        if (positionX <= 0) {
            arrow = "up";
        }
    } else if (arrow === "up") {
        positionY -= 1;
        if (positionY <= 0) {
            arrow = "right";
        }
    }


    childBlock.style.left = `${positionX}px`;
    childBlock.style.top = `${positionY}px`;


    requestAnimationFrame(moveBlock);
}


setInterval(() => moveBlock(),0)









//// timer

const startButton = document.querySelector("#start");
const stopButton = document.querySelector("#stop");
const resetButton = document.querySelector("#reset");
const secondsOnDisplay = document.querySelector("#seconds");

let seconds = 0
let timerInterval

startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
resetButton.addEventListener("click", resetTimer);

function updateDisplay() {
    secondsOnDisplay.textContent = seconds;
}
function startTimer() {
    if (!timerInterval) {
        timerInterval = setInterval(() => {
            seconds++;
            updateDisplay();
        }, 1000);
    }
}
function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}
function resetTimer() {
    stopTimer();
    seconds = 0;
    updateDisplay();
}

updateDisplay();

const characters = document.querySelector("#characters")

console.log(characters)

const request = new XMLHttpRequest();
request.open("GET", "../data/persons.json");
request.setRequestHeader("Content-type", "application/json");
request.responseType = "json";
request.send()

const renderCharacterList = (data) =>{
    data.forEach((character) => {
        const characterCard = document.createElement("div");
        characterCard.classList.add("character-card");

        const characterImage = document.createElement("img");
        characterImage.setAttribute("src",character.image)

        const characterName = document.createElement("p");
        characterName.innerText = character.name;
        const characterAge = document.createElement("span");
        characterAge.innerText = character.age

        characterCard.append(characterImage);
        characterCard.append(characterName);
        characterCard.append(characterAge);

        characters.append(characterCard)
    })
}

request.onload = () =>{
    const data = request.response;
    console.log(data)
    renderCharacterList(data)
}



