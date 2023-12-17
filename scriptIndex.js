var json;
fetchData();
let activeId = -1;
let songTime = 0;
let currentSongTime = 0;
let audio = new Audio("");
async function fetchData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        json = data;
        data.forEach(element => {
            AddSong(element.id, element.artist, element.song)
        });
    } catch (error) {
        console.error('Błąd podczas ładowania pliku JSON:', error);
    }
}
function AddSong(id, artist, song) {
    // Tworzenie struktury HTML w JavaScript
    var musicList = document.getElementById("musicList");
    var divElement = document.createElement("div");
    divElement.className = "songName";
    divElement.id = id;
    divElement.setAttribute("onclick", "ChangeSong(this)");
    var artistParagraph = document.createElement("p");
    artistParagraph.classList.add("artist");
    artistParagraph.textContent = artist;

    var dashParagraph = document.createElement("p");
    dashParagraph.textContent = " - ";

    var songParagraph = document.createElement("p");
    songParagraph.classList.add("song");
    songParagraph.textContent = song;

    // Dodanie elementów do struktury
    divElement.appendChild(artistParagraph);
    divElement.appendChild(dashParagraph);
    divElement.appendChild(songParagraph);

    // Dodanie struktury do kontenera na stronie
    musicList.appendChild(divElement);
}
function ChangeSong(container) {
    let artistContainer = document.getElementById("artist");
    let songContainer = document.getElementById("song");
    let artist = container.children[0].textContent;
    let song = container.children[2].textContent;
    artistContainer.textContent = artist;
    songContainer.textContent = song;
    let list = document.getElementsByClassName("selected");
    Array.from(list).forEach(element => {
        element.classList.remove("selected");
    });
    container.classList.add("selected");
    activeId = parseInt(container.id);

    let audioPath = "music/" + activeId + ".mp3";
    currentSongTime = 0;
    audio.pause();
    audio = new Audio(audioPath);
    audio.oncanplaythrough = function () {
        SetDuration(audio.duration);
    };
    Play();
    PlayAudio(activeId);
}
function Play() {
    let play = document.getElementById("play");
    let pause = document.getElementById("pause");
    play.style.display = "none";
    pause.style.display = "inline";
    PlayAudio(activeId);
    if (activeId == -1) {
        ChangeSong(document.getElementById(0));
    }
    else {
        audio.play();
    }
}
function Pause() {
    let play = document.getElementById("play");
    let pause = document.getElementById("pause");
    play.style.display = "inline";
    pause.style.display = "none";
    audio.pause();
}
function NextSong() {
    if (activeId == -1) {
        ChangeSong(document.getElementById(0));
        activeId = 0;
    }
    else {
        activeId = (activeId + 1) % (json.length);
        ChangeSong(document.getElementById(activeId));
    }
    Play();
}
function PreviousSong() {
    if (activeId == -1) {
        ChangeSong(document.getElementById(0));
    }
    else {
        if (activeId == 0) {
            activeId = json.length - 1;
        }
        else {
            activeId = activeId - 1;
        }
        ChangeSong(document.getElementById(activeId));
    }
    Play();
}
function ChangeProgressionBar(ev) {
    // Odczytaj szerokość kontenera
    let containerRect = ev.getBoundingClientRect();
    let containerWidth = containerRect.width;
    // Odczytaj pozycję X myszki względem okna przeglądarki
    let mouseX = event.pageX;
    // Oblicz procentowy udział pozycji X względem szerokości kontenera
    let percentageFromLeft = ((mouseX - containerRect.left) / containerWidth) * 100;

    let progression = document.getElementById("progression");
    progression.style.width = percentageFromLeft + "%";
    currentSongTime = songTime * percentageFromLeft / 100;
}
function PlayAudio(number) {
    audio.oncanplaythrough = function () {
        SetDuration(audio.duration);
        var intervalId = setInterval(function () {
            var currentTime;
            if (Math.abs(currentSongTime - audio.currentTime) > 1) {
                currentTime = currentSongTime;
                audio.currentTime = currentSongTime;
            }
            else {
                currentTime = audio.currentTime;
                currentSongTime = audio.currentTime;
            }
            ChangeActiveTime(currentTime);
            // Sprawdź, czy odtwarzanie zostało zakończone
            if (currentTime >= audio.duration) {
                clearInterval(intervalId); // Przerwij interwał po zakończeniu odtwarzania
                NextSong();
            }
        }, 100);
    };
    audio.play();
}
function SetDuration(duration) {
    songTime = duration;
    let roundedDuration = Math.floor(duration);
    let seconds = roundedDuration % 60;
    let minutes = (roundedDuration - seconds) / 60;
    let timeRight = document.getElementById("timeRight");
    if (seconds < 10) {
        timeRight.textContent = minutes + ":0" + seconds;
    }
    else {
        timeRight.textContent = minutes + ":" + seconds;
    }
}
function ChangeActiveTime(activeTime) {

    let roundedDuration = Math.floor(activeTime);
    let seconds = roundedDuration % 60;
    let minutes = (roundedDuration - seconds) / 60;
    let timeRight = document.getElementById("timeLeft");
    if (seconds < 10) {
        timeRight.textContent = minutes + ":0" + seconds;
    }
    else {
        timeRight.textContent = minutes + ":" + seconds;
    }

    let percentageFromLeft = activeTime / songTime * 100;
    let progression = document.getElementById("progression");
    progression.style.width = percentageFromLeft + "%";
}