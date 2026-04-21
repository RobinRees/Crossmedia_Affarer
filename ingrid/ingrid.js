const dialogNameDOM = document.getElementById("dialog-name");
const dialogTextDOM = document.getElementById("dialog-text");
const continueButtonDOM = document.getElementById("continue-button");
const exitButtonDOM = document.getElementById("exit-button");

const dialogIngridLeopold = [
    { "name": "Leopold", "line": "Ursäkta mig frun?" },
    { "name": "Ingrid", "line": "Ska du också hekla och ha dig, jag har ju redan sagt att det inte var jag!" },
    { "name": "Leopold", "line": "..." },
    { "name": "Ingrid", "line": "Jaha, du är herrn´ som dom sa kan hjälpa mig! Låt mig berätta från början..." },
    { "name": "Ingrid", "line": "För två dagar sedan var det någon som förgiftade vattnet här i Pildammen. Jag tvättade byfolkets kläder som vilken annan dag, sen plötsligt kom det två konstaplar och anklagade mig för dessa förfärligheter." },
    { "name": "Ingrid", "line": "Jag förklarade för dem att det är omöjligt att det skulle vara jag, då jag dagen innan hade kurerat min sjuka son. De gav sig inte, och antar att det måste vara jag för att jag arbetar vid vattnet. Men jag tror det är på grund av att jag inte räknas som “fint folk” i denna stad." },
    { "name": "Leopold", "line": "Så du var hemma kvällen när brottet begicks?" },
    { "name": "Ingrid", "line": "Ja, du förstår – min son har varit sjuk under en längre tid. Han lider av en förfärlig hosta som inte ger sig. Just den kvällen var hans feber högre än vanligt och jag behövde sitta vid hans sängkant och ha koll på hans temperatur vart tionde minut." },
    { "name": "Ingrid", "line": "Så ingen kan säga om jag talar sanning eller inte, men JAG vet sanningen. Jag hade inget med det att göra! Jag tycker du ska ta ett snack med Gustaf Larsson, han har de senaste veckorna hållit hus vid vattentornet. Han arbetar med rören, så han har haft tillgång till vattnet också, hör med honom vad han sysslade med den kvällen vettja! Nu måste jag fortsätta tvätta, annars hänger de mig för att deras nattlinnen inte är tvättade i tid!" },

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

    if (currentIndex >= dialogIngridLeopold.length - 1) {
        continueButtonDOM.style.display = "none";
        exitButtonDOM.style.display = "inline"
    }

    updateDialog();
});


exitButtonDOM.addEventListener("click", () => {
    window.location.href = "../index.html";
});