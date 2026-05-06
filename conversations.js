const dialogIngrid = [

  { name: "Leopold", line: "Ursäkta mig frun?" },

  { name: "Ingrid", line: "Ska du också hekla och ha dig, jag har ju redan sagt att det inte var jag!" },

  { name: "Leopold", line: "..." },

  { name: "Ingrid", line: "Jaha, du är herrn som dom sa kan hjälpa mig! Låt mig berätta från början..." },

  { name: "Ingrid", line: "För två dagar sedan var det någon som förgiftade vattnet här i Pildammen. Jag tvättade byfolkets kläder som vilken annan dag, sen plötsligt kom det två konstaplar och anklagade mig för dessa förfärligheter och lögner." },

  { name: "Ingrid", line: "Jag förklarade för dem att det är omöjligt att det skulle vara jag, då jag dagen innan hade kurerat min sjuka son. De gav sig inte, och antar att det måste vara jag för att jag arbetar vid vattnet. Men jag tror det är på grund av att jag inte räknas som fint folk i denna stad." },

  { name: "Leopold", line: "Så du var hemma kvällen när brottet begicks?" },

  { name: "Ingrid", line: "Ja, du förstår – min son har varit sjuk under en längre tid. Han lider av en förfärlig hosta som inte ger sig. Just den kvällen var hans feber högre än vanligt och jag behövde sitta vid hans sängkant och ha koll på hans temperatur vart tionde minut." },

  { type: "info", line: "Hm, denna informationen låter värd att anteckna inför detta mysterium." },

  { name: "Ingrid", line: "Så ingen kan säga om jag talar sanning eller inte, men JAG vet sanningen. Jag hade inget med det att göra!" },

  { name: "Ingrid", line: "Jag tycker du ska ta ett snack med Gustaf Larsson, han har de senaste veckorna hållit hus vid vattentornet. Han arbetar med rören, så han har haft tillgång till vattnet också. Hör med honom vad han sysslade med den kvällen vettja!" },

  { name: "Ingrid", line: "Nu måste jag fortsätta tvätta, annars hänger de mig för att deras nattlinnen inte är tvättade i tid!" },

  { type: "info", line: "Ta upp kartan." }
];


const dialogGustaf = [

  { name: "Leopold", line: "Goddag, är det du som är Gustaf? Jag försöker förstå vad som hände med vattnet i dammen. Ni arbetar här, eller hur?" },

  { name: "Gustaf", line: "Det stämmer. Jag ansvarar för underhållet av ledningarna här i området. Den kvällen var jag här, precis som vanligt när något behöver ses över." },

  { name: "Gustaf", line: "Vi har haft problem med trycket i rören, så jag gick igenom ventilerna och kopplingarna som leder från dammen." },

  { name: "Gustaf", line: "Jag märkte inget ovanligt under arbetet. Inget som tydde på att vattnet redan var påverkat. Allt såg ut som det skulle." },

  { name: "Gustaf", line: "Jag var här hela kvällen. Arbetade med systemet. Det är mitt ansvar att se till att det fungerar, inte att förstöra det." },

  { name: "Gustaf", line: "Det är skönt att de hittade den skyldige så snabbt, man kan ju aldrig lita fullt ut på tjänstefolket, inte sant?" },

  { name: "Leopold", line: "Vad får dig att tro att det är tjänstefolk som är de skyldiga?" },

  { name: "Gustaf", line: "Jag säger inte att det måste vara så… men man får se till omständigheterna." },

  { name: "Gustaf", line: "De som arbetar där rör sig fritt. Ingen ifrågasätter varför de är nära vattnet, eller vad de gör. De syns knappt, trots att de alltid är där." },

  { name: "Gustaf", line: "Om någon skulle vilja få i något i vattnet utan att väcka uppmärksamhet… då är det just en sådan person som har möjligheten." },

  { name: "Gustaf", line: "Jag själv, till exempel, jobbar med rören. Allt jag gör lämnar spår. Ventiler som öppnas, tryck som förändras… det märks direkt om något inte står rätt till." },

  { name: "Gustaf", line: "Men vid kanten av dammen? Där kan man göra mycket utan att någon reagerar." },

  { name: "Leopold", line: "Tack för din tid. Jag beger mig vidare nu." },

  { type: "info", line: "Gå vidare till August." }
];


const dialogAugust = [

  { name: "August", line: "Ursäkta, herrn? Jag har sett att du rör dig omkring här, men jag känner inte igen dig. Vad för dig hit till Pildammen en solig dag som denna?" },

  { name: "Leopold", line: "Jag är här på uppdrag angående brottet som begick häromkvällen. Har du någon information som kan vara mig till nytta? Får jag fråga vad herrn heter?" },

  { name: "August", line: "August Strömbäck var namnet! Just ja, det förgiftade vattnet..." },

  { name: "August", line: "Jag är rädd att jag inte kan vara till så mycket hjälp kring den kvällen, jag befann mig på kvällståget till Lund." },

  { name: "August", line: "Jag hade ett affärsmöte tidigt dagen därpå i Lund som jag inte kunde missa." },

  { name: "August", line: "Det är en olycklig situation, förstås. Men sådant här får konsekvenser. Staden kommer behöva nya lösningar, bättre system… fler leveranser." },

  { name: "August", line: "Det var egentligen dagen därpå jag fick höra om vad som hänt vid dammen." },

  { name: "Leopold", line: "Ni verkar lugn inför något som satt hela staden i oro." },

  { name: "August", line: "Man får försöka hålla huvudet kallt…" },

  { name: "August", line: "Men misstankarna? De pekar nog åt rätt håll." },

  { name: "August", line: "Det är väl inte så konstigt. Man får ju se vilka som faktiskt rör sig där nere vid vattnet till vardags." },

  { name: "August", line: "Men vad vet jag. Jag var ju inte ens i staden den kvällen." },

  { name: "Leopold", line: "Ni säger att ni inte var i staden… Ändå verkar ni ha en ganska tydlig bild av vem som borde misstänkas." },

  { name: "August", line: "Men om ni verkligen vill förstå vad som kan ha hamnat i vattnet… då kanske ni borde tala med apotekaren." },

  { name: "August", line: "Eller hans dotter – hon brukar vara den som faktiskt vet vad som finns på hyllorna. Om någon vet något om gift i denna staden, då är det Doris. Hon är en begåvad ung kvinna." },

  { name: "Leopold", line: "Tack för er tid. Jag går vidare till apoteket." },

  { type: "info", line: "Gå till Doris på Apoteket Lejonet." }
];


const dialogDoris = [

  { name: "Leopold", line: "Goddag, är du Doris Lejon? Apotekarens dotter?" },

  { name: "Doris", line: "Ehm... Ja, det är mitt namn. Min far är inne i apoteket om du behöver några medikament. Jag är själv på väg till tåget och har lite bråttom." },

  { name: "Leopold", line: "Jag söker faktiskt dig, fröken. Jag undersöker nämligen förgiftningen av Pildammens vatten. Jag antar att du har hört talas om det?" },

  { name: "Doris", line: "Jo, hela staden talar om händelsen. Jag begriper mig inte på hur någon skulle vilja utsätta andra för en katastrofal hälsofara." },

  { name: "Doris", line: "Stackars Ingrid som blir anklagad, jag vet att hon inte skulle göra något sådant. Hon är alldeles för upptagen med sin sjuka son." },

  { name: "Doris", line: "Jag hoppas den nya medicinen kan hjälpa honom." },

  { name: "Leopold", line: "Får jag fråga vart fröken befann sig under brottet?" },

  { name: "Doris", line: "Tror du att det kan vara jag?! Jag arbetar med att hjälpa Sveriges befolkning. Jag har studerat medicin och hälsa i flera år. Varför skulle jag vilja utsätta någon för fara?!" },

  { name: "Doris", line: "För din information, herrn, så var jag här på apoteket med min far." },

  { name: "Doris", line: "Vi behövde packa upp varorna från dagens leverans. Den var både försenad och vi fick städa ordentligt då hälften av flaskorna hade brustit i leveransen." },

  { name: "Doris", line: "Eller det är mitt antagande, det är rätt svårt att räkna flaskor när allt bara är krossat glas... De var otroligt vårdslösa i leveransen denna gång!" },

  { name: "Leopold", line: "Du nämnde Ingrid, har hon köpt medicin av er?" },

  { name: "Doris", line: "Ja... Eller, jag har gett henne mediciner vid sidan av för ett bättre pris, men jag ber dig, berätta inte för min far." },

  { name: "Doris", line: "Han är så girig och bara hjälper de som kan betala honom… Eller berätta inte för någon. Kan bara tänka mig vad folk hade sagt om de visste att jag hjälper tjänstefolket på detta viset." },

  { name: "Doris", line: "Jag klarar inte av tanken att folk ska behöva må dåligt när det finns hjälp. Jag ber för en framtid där alla kan få hjälp oavsett deras klass..." },

  { name: "Leopold", line: "Förståeligt. Du har ett stort hjärta. Hur mycket tid har du? Ursäkta för mitt besvär men har du möjlighet att ta ett senare tåg?" },

  { name: "Doris", line: "Gud nej! Tåget till Lund går endast en gång om dagen, prick klockan 15. Missar jag den kommer jag inte iväg förrän imorgon, det går sig inte för!" },

  { name: "Leopold", line: "Okej, intressant. Då förstår jag. Tack för din tid, fröken." }

];