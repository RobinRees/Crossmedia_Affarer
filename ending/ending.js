const submitButton = document.getElementById('submit-button');
const mainSection = document.querySelector('main');
const answerSection = document.getElementById('answer-section');

submitButton.addEventListener('click', () => {

    const checkedInputs = document.querySelectorAll('#suspects-section input[type="checkbox"]:checked');

    if (checkedInputs.length === 0) {
        alert("Du måste välja minst en misstänkt!");
        return;
    }

    const selectedValues = Array.from(checkedInputs).map(input => input.value);
    const selectedNames = Array.from(checkedInputs).map(input => input.parentElement.textContent.trim());

    const guilty = ['gustaf', 'august'];

    // Räkna hur många av de valda som faktiskt är skyldiga
    const correctHits = selectedValues.filter(val => guilty.includes(val)).length;
    const totalSelected = selectedValues.length;

    let resultTitle = "";
    let resultClass = "";

    // Logik för rätt/fel/delvis
    if (correctHits === 2 && totalSelected === 2) {
        resultTitle = "RÄTT";
    } else if (correctHits > 0) {
        resultTitle = "DELVIS rätt";
    } else {
        resultTitle = "FEL";
    }

    // 3. Formatera namnen snyggt (t.ex. "Doris, Ingrid och Gustaf")
    let namesDisplay = "";
    if (selectedNames.length === 1) {
        namesDisplay = selectedNames[0];
    } else {
        const lastBox = selectedNames.pop();
        namesDisplay = selectedNames.join(', ') + " och " + lastBox;
    }

    answerSection.innerHTML = `
            <h1>Du hade ${resultTitle}!</h1>
            <p>Du angav <b>${namesDisplay}</b> som skyldig/skyldiga.</p>
            <p>De skyldiga var faktiskt <b>Gustaf Larsson</b> och <b>August Strömbäck</b>.</p>
            <div class="story-explanation">
                <p>Förgiftningen av vattnet vid Pildammen visade sig vara ett medvetet samarbete mellan Gustaf Larsson och August Strömbäck. Gustaf, som arbetade med stadens vattenledningar, hade den kunskap som krävdes för att påverka systemet utan att väcka misstanke. Genom att skapa en kris kunde han framstå som den som kunde lösa problemet och därmed vinna större inflytande över stadens vattenprojekt.<br><br>
Samtidigt såg August en möjlighet till ekonomisk vinning. Som handelsman levererade han varor till stadens apotek, och i takt med att fler insjuknade ökade efterfrågan och därmed även hans förtjänst. Utöver detta skulle en kris i vattenförsörjningen skapa behov av nya leveranser och byggprojekt, något han kunde dra ytterligare nytta av.<br><br>
Deras alibin visade sig dock bristfälliga. Gustaf påstod sig ha arbetat vid ledningarna hela kvällen, men saknade någon som kunde bekräfta detta. August hävdade att han befann sig på resa med tåg från Lund, men detta stämmer inte överens med tågtiderna.<br><br>
Tillsammans utnyttjade de situationen, Gustaf genom sin kontroll över systemet och August genom att dra nytta av konsekvenserna och hans tillgång till toxiska medicinska medel. Under tiden riktades misstankarna mot Ingrid, vars ställning i samhället gjorde henne till en enkel måltavla, trots att hon var oskyldig.<br><br>
</p>
<p><b>Ledtrådarna som fanns i spelet:</b></p>
<p>- Gustaf var ensam under tiden brottet skedde – alltså kan ingen som kan backa upp hans story.</p>
<p>- August påstår att han befann sig på kvällståget till Lund, men efter att du pratat med Doris vet du att tåget går enbart en gång om dagen vid klockan 15.</p>
<p>- August nämnde att det kommer "behövas fler leveranser”, vilket gynnar honom då han är en handelsman som är ansvarig för leveranser.</p>
<p>- Doris berättade att leveransen var försenad den kvällen och hälften av flaskorna var trasiga, alltså var August försenad och dessutom har han tagit flaskor med giftiga medel – därefter har han förstört leveransen så inte det ska märkas att det saknas flaskor.</p><br>
            </div>
            <hr color="black">
            <h2>Tack för att du spelade!</h2>
            <p>Tack för att du ville ta del av vårt spel "Grumliga Affärer", vi hoppas att du fann det underhållande.</p>
                    `;

    // 5. Växla vy
    mainSection.style.display = 'none';
    answerSection.style.display = 'block';
    window.scrollTo(0, 0);
});