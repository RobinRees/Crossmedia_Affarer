const dialogNameDOM = document.getElementById("dialog-name");
const dialogTextDOM = document.getElementById("dialog-text");
const continueButtonDOM = document.getElementById("continue-button");
const exitButtonDOM = document.getElementById("exit-button");

const dialogIngridLeopold = [
    { "name": "Leopold", "line": "Ursäkta mig frun?" },
    { "name": "Ingrid", "line": "Ska du också hekla och ha dig, jag har ju redan sagt att det inte var jag!" },
    { "name": "Leopold", "line": "..." },
    { "name": "Ingrid", "line": "Jaha, du är herrn´ som dom sa kan hjälpa mig! Låt mig berätta från början..." },
    { "name": "Ingrid", "line": "Jag förklarade för dem att det är omöjligt att det skulle vara jag, då jag dagen innan hade kurerat min sjuka son. De gav sig inte, och antar att det måste vara jag för att jag arbetar vid vattnet. Men jag tror det är på grund av att jag inte räknas som “fint folk” i denna stad." },

]

let currentIndex = 0;

function updateDialog() {
    const currentDialog = dialogIngridLeopold[currentIndex];

    dialogNameDOM.textContent = currentDialog.name;
    dialogTextDOM.textContent = currentDialog.line;
}

updateDialog();

continueButtonDOM.addEventListener("click", () => {
    currentIndex++;

    if (currentIndex >= dialogIngridLeopold.length) {
        continueButtonDOM.style.display = "none";
        exitButtonDOM.style.display = "inline"
    }

    updateDialog();
});