var json;
fetchData();
let buttonPhase = 1;
let buttonPhaseTable = ["Rozpocznij test", "Zakończ test", "Resetuj test"];
let amountOfSongs = 0;
let amountOfTime = 0;
let currentTime = 0;
let songIndexes = [];
let audio = new Audio();
let audioId = -1;

async function fetchData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        json = data;
    } catch (error) {
        console.error('Błąd podczas ładowania pliku JSON:', error);
    }
}
function CreateSongContainer(id) {
    // Tworzenie elementu div z klasą "singleSongContainer"
    var singleSongContainer = document.createElement("div");
    singleSongContainer.className = "singleSongContainer";

    // Tworzenie elementu div z klasą "singleSong"
    var singleSong = document.createElement("div");
    singleSong.className = "singleSong";

    // Tworzenie elementu div z klasą "author"
    var authorDiv = document.createElement("div");
    authorDiv.className = "author";

    // Tworzenie inputa z klasą "authorInput" dla autora
    var authorInput = document.createElement("input");
    authorInput.className = "authorInput";
    authorInput.type = "text";
    authorInput.placeholder = "Autor";
    // Dodawanie inputa do diva "author"
    authorDiv.appendChild(authorInput);

    // Analogicznie tworzymy elementy dla pola "song"
    var songDiv = document.createElement("div");
    songDiv.className = "song";

    var songInput = document.createElement("input");
    songInput.className = "songInput";
    songInput.type = "text";
    songInput.placeholder = "Tytuł";

    songDiv.appendChild(songInput);

    // Analogicznie tworzymy elementy dla pola "fragment"
    var fragmentDiv = document.createElement("div");
    fragmentDiv.className = "fragment";

    // Tworzenie pierwszego przycisku (Play)
    //var playButton = document.createElement("svg");
    var playButton = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    playButton.setAttribute("onclick", "Play(" + id + ")");
    playButton.classList.add("play");
    //playButton.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    playButton.setAttribute("height", "60");
    playButton.setAttribute("width", "60");
    playButton.setAttribute("viewBox", "0 0 384 512");

    //var playPath = document.createElement("path");
    var playPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    playPath.setAttribute("fill", "#C9FFE2");
    playPath.setAttribute("d", "M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z");

    playButton.appendChild(playPath);

    // Dodawanie przycisku Play do diva "fragment"
    fragmentDiv.appendChild(playButton);

    // Analogicznie tworzymy elementy dla przycisków Pause i Restart
    //var pauseButton = document.createElement("svg");
    var pauseButton = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    pauseButton.setAttribute("onclick", "Pause(" + id + ")");
    pauseButton.classList.add("pause");
    //pauseButton.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    pauseButton.setAttribute("height", "60");
    pauseButton.setAttribute("width", "60");
    pauseButton.setAttribute("viewBox", "0 0 320 512");

    //var pausePath = document.createElement("path");
    var pausePath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    pausePath.setAttribute("fill", "#C9FFE2");
    pausePath.setAttribute("d", "M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z");

    pauseButton.appendChild(pausePath);

    fragmentDiv.appendChild(pauseButton);

    //var restartButton = document.createElement("svg");
    var restartButton = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    restartButton.setAttribute("onclick", "Restart(" + id + ")");
    restartButton.classList.add("restart");
    //restartButton.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    restartButton.setAttribute("height", "60");
    restartButton.setAttribute("width", "60");
    restartButton.setAttribute("viewBox", "0 0 512 512");

    //var restartPath = document.createElement("path");
    var restartPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    restartPath.setAttribute("fill", "#C9FFE2");
    restartPath.setAttribute("d", "M125.7 160H176c17.7 0 32 14.3 32 32s-14.3 32-32 32H48c-17.7 0-32-14.3-32-32V64c0-17.7 14.3-32 32-32s32 14.3 32 32v51.2L97.6 97.6c87.5-87.5 229.3-87.5 316.8 0s87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3s-163.8-62.5-226.3 0L125.7 160z");

    restartButton.appendChild(restartPath);

    fragmentDiv.appendChild(restartButton);

    // Dodawanie diva "fragment" do diva "singleSong"
    singleSong.appendChild(authorDiv);
    singleSong.appendChild(songDiv);
    singleSong.appendChild(fragmentDiv);

    // Tworzenie diva "answerContainer"
    var answerContainer = document.createElement("div");
    answerContainer.className = "answerContainer";

    // Dodawanie paragrafów do diva "answerContainer"
    var answerParagraph1 = document.createElement("p");
    answerParagraph1.textContent = "Odpowiedź:";

    var answerParagraph2 = document.createElement("p");
    answerParagraph2.className = "answer";
    answerParagraph2.textContent = "========";

    answerContainer.appendChild(answerParagraph1);
    answerContainer.appendChild(answerParagraph2);

    // Dodawanie diva "answerContainer" do diva "singleSongContainer"
    singleSongContainer.appendChild(singleSong);
    singleSongContainer.appendChild(answerContainer);

    // Dodawanie całej struktury do body dokumentu
    //document.body.appendChild(singleSongContainer);
    document.getElementById("testContainer").appendChild(singleSongContainer);
}
function BeginTest(button) {
    let buttonDescription = button.children[0];
    buttonDescription.textContent = buttonPhaseTable[buttonPhase];
    if (buttonPhase == 0) {
        audio.pause();
        DisableEnableSliders(false);
        while (document.getElementById("testContainer").firstChild) document.getElementById("testContainer").removeChild(document.getElementById("testContainer").lastChild);
    }
    else if (buttonPhase == 1) {
        DisableEnableSliders(true);
        amountOfSongs = parseInt(document.getElementById("amountOfSongsNumber").value);
        amountOfTime = parseInt(document.getElementById("songFragmentMenagmentNumberMinutes").value) * 60 + parseInt(document.getElementById("songFragmentMenagmentNumberSeconds").value);
        for (let i = 0; i < amountOfSongs; i++) {
            CreateSongContainer(i);
        }
        SetSongs();
    }
    else if (buttonPhase == 2) {
        DisableClass("authorInput");
        DisableClass("songInput");
        setAnswers();
    }
    buttonPhase = (buttonPhase + 1) % 3;
}
function DisableEnableSliders(value) {
    let fromSlider = document.getElementById("fromSlider");
    fromSlider.disabled = value;
    let toSlider = document.getElementById("toSlider");
    toSlider.disabled = value;
    let fromInput = document.getElementById("fromInput");
    fromInput.disabled = value;
    let toInput = document.getElementById("toInput");
    toInput.disabled = value;
    let amountOfSongsSlider = document.getElementById("amountOfSongsSlider");
    amountOfSongsSlider.disabled = value;
    let amountOfSongsNumber = document.getElementById("amountOfSongsNumber");
    amountOfSongsNumber.disabled = value;
    let songFragmentMenagmentSlider = document.getElementById("songFragmentMenagmentSlider");
    songFragmentMenagmentSlider.disabled = value;
    let songFragmentMenagmentNumberMinutes = document.getElementById("songFragmentMenagmentNumberMinutes");
    songFragmentMenagmentNumberMinutes.disabled = value;
    let songFragmentMenagmentNumberSeconds = document.getElementById("songFragmentMenagmentNumberSeconds");
    songFragmentMenagmentNumberSeconds.disabled = value;
}
function DisableClass(className) {
    let list = document.getElementsByClassName(className);
    Array.from(list).forEach((element) => {
        element.disabled = true;
    });
}
function setAnswers() {
    let list = document.getElementsByClassName("answer");
    for (let i = 0; i < list.length; i++) {
        list[i].textContent = json[songIndexes[i]].artist + " - " + json[songIndexes[i]].song;
    }
}
function SetSongs() {
    let minValue = parseInt(document.getElementById("fromInput").value) - 1;
    let maxValue = parseInt(document.getElementById("toInput").value) - 1;
    //Math.floor(Math.random() * 11);
    songIndexes = [];
    for (let i = 0; i < amountOfSongs; i++) {
        let value = -1;
        do {
            value = Math.floor(Math.random() * (maxValue - minValue)) + minValue;
        } while (songIndexes.includes(value));
        songIndexes.push(value);
    }
    console.log(songIndexes);
}
function Play(id) {
    if (audioId != id) {
        audioId = id;
        ChangeSong(songIndexes[id]);
    }
    audio.play();
}
function Pause(id) {
    if (audioId != id) {
        return;
    }
    audio.pause();
}
function Restart(id) {
    if (audioId != id) {
        return;
    }
    currentTime = 0;
}
function ChangeSong(id) {
    currentTime = 0;
    let audioPath = "music/" + id + ".mp3";
    audio.pause();
    audio = new Audio(audioPath);
    audio.oncanplaythrough = function () {
        var intervalId = setInterval(function () {
            if (Math.abs(currentTime - audio.currentTime) > 1) {
                audio.currentTime = currentTime;
            }
            else {
                currentTime = audio.currentTime;
            }
            if (audio.currentTime > amountOfTime) {
                clearInterval(intervalId); // Przerwij interwał po zakończeniu odtwarzania
                audio.pause();
                audio = new Audio();
            }
        }, 100);
    };
}