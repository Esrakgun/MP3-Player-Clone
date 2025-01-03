/* Elementlere ulasip obje olarak Kullanma, Yakalama*/
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const repeatButton = document.getElementById("repeat");
const shuffleButton = document.getElementById("shuffle");
const audio = document.getElementById("audio");
const songImage = document.getElementById("song-image");
const songName = document.getElementById("song-name");
const songArtist = document.getElementById("song-artist");
const pauseButton = document.getElementById("pause");
const playButton = document.getElementById("play");
const playListButton = document.getElementById("playlist");

const maxDuration = document.getElementById("max-duration");
const currentTimeRef = document.getElementById("current-time");

const progressBar = document.getElementById("progress-bar");
const playListContainer = document.getElementById("playlist-container");
const closeButton = document.getElementById("close-button");
const playListSongs = document.getElementById("playlist-songs");

const currentProgress = document.getElementById("current-progress");

//sirasi
let index;

//dongu
let loop = true;

//sarki listesi
const songsList = [
    // 0 1 2
    {
        name: "Stand by me",
        link: "asset/Stand by me - B. B. King.mp3",
        artist: " Ben E. King",
        image: "asset/Ben E.King.png",
    },
    {
        name: "Kiss My Name",
        link: "asset/Antony and the Johnsons - Kiss My Name.mp3",
        artist: "Antony and the Johnsons",
        image: "asset/Anthony and the jhonson.png",
    },
    {
        name: "Alone Apart",
        link: "asset/Alone Apart.mp3",
        artist: "The Sweel Season",
        image: "asset/the Sweel Season.png",
    },
    {
        name: "Boulevard of Broken Dreams",
        link: "asset/Boulevard of Broken Dreams.mp3",
        artist: "Green Day",
        image: "asset/GreenDay.png",
    },
    {
        name: "Thank You",
        link: "asset/Dido - Thank You (Official Video).mp3",
        artist: "Dido",
        image: "asset/Dido.png",
    },
    {
        name: "Here Comes The Rain Again",
        link: "asset/Here Comes The Rain Again.mp3",
        artist: "Hypnogaja",
        image: "asset/Hypnogaja.png",
    },
    {
        name: "Wake Me Up When September Ends",
        link: "asset/Green Day - Wake Me Up When September Ends [Official Music Video].mp3",
        artist: "Green Day",
        image: "asset/Greenday wake me up.PNG",
    },
    {
        name: " Angel",
        link: "asset/Judas Priest - Angel (Audio).mp3",
        artist: "Judas Priest",
        image: "asset/Judas Priest -Angel.png",
    },
];


// Şarkı Atama:

const setSong = (arrayIndex) => {
    let { name, link, artist, image } = songsList[arrayIndex];
    audio.src = link;
    songName.innerHTML = name;
    songArtist.innerHTML = artist;
    songImage.src = image;

    //Zamani Ayarla
    audio.onloadedmetadata = () => {
        maxDuration.innerText = timeFormatter(audio.duration);
    }

    //Şarki Listesini Gizle
    playListContainer.classList.add("hide");

    //sarkiyi Çal /Oynat
    playAudio();
}

// Şarkıyı Çal/Oynatma:
const playAudio = () => {
    audio.play(4)
    pauseButton.classList.remove("hide")
    playButton.classList.add('hide');
}

// Şarkı kendiliğinden bittiğinde sonraki parçaya geçsin:
audio.onended =() =>{
    nextSong()
}

// Şarkıyı Durdur:
const pauseAudio = () => {
    audio.pause()
    pauseButton.classList.add('hide')
    playButton.classList.remove('hide')
}



// Sonrakine Geç/ sonraki Parçaya Geç:

const nextSong = () => {
    if (loop) {
        if (index == (songsList.length - 1)) {
            index = 0
        }
        else {
            index += 1
        }
        setSong(index)
    }
    else {
        let randIndex = Math.floor(Math.random() * songsList.length)
        setSong(randIndex)
    }
    playAudio()
}

// Önceki Şarkıya Geç :
 const previousSong =()=>{
    pauseAudio()
    if (index>0){
        index-=1
    }
    else{
        index =songsList.length-1
    }
    setSong(index)
    playAudio()
 }


// Zaman Düzenleyici:

const timeFormatter = (timeInput)=>{
    let minute =Math.floor(timeInput /60)
    minute = minute <10 ? "0" + minute : minute
    let second = second <10 ? "0" + second : second 
    return `${minute}:${second}`;
}


//tekrar acma, kapama
repeatButton.addEventListener("click",() => {
    if (repeatButton.classList.contains('active')) {
        repeatButton.classList.remove('active')
        audio.loop = false
    }else {
        repeatButton.classList.add('active')
        audio.loop = true
    }
})

//karistirici tiklanildiginda
shuffleButton.addEventListener('click',()=>{
    if (shuffleButton.classList.contains('active')) {
        shuffleButton.classList.remove('active')
        loop = true
    }else {
        shuffleButton.classList.add('active')
        loop = false
    }
})

//anlik zamani yakala
setInterval(() => {
    currentTimeRef.innerHTML = timeFormatter(audio.currentTime)
    //progresi ilerlet
    currentProgress.style.width = (audio.currentTime / audio.duration.toFixed(3))
    
}, 1000); //milnisaniye

//liste ekranini getir
playListButton.addEventListener('click',()=>{
    playListContainer.classList.remove('hide')
})

//listeyi kapat
closeButton.addEventListener('click',()=>{
    playListContainer.classList.add('hide')
})

//liste olusturma
const initializePlaylist = () =>{
    for(let i in songsList){ // 0 1 2 3 4
        playListSongs.innerHTML += `<li class="playlistSong"
        onclick="setSong(${i})">
        <div class="playlist-image-container">
            <img src="${songsList[i].image}"/>
        </div>
        <div class="playlist-song-details">
            <span id="playlist-song-name">
                ${songsList[i].name}
            </span>
            <span id="playlist-song-artist-album">
                ${songsList[i].artist}
            </span>
        </div>
        </li>`
    }
}


//progress bar ayarlama
progressBar.addEventListener('click',(event)=>{

    let coordStart = progressBar.getBoundingClientRect().left

    let coordEnd = event.clientX

    let progress = (coordEnd - coordStart) / progressBar.offsetWidth

    currentProgress.style.width = progress * 100 + "%"

    audio.currentTime = progress * audio.duration

    audio.play()
    pauseButton.classList.remove('hide')
    playButton.classList.add('hide')

})

//zamani guncelle
audio.addEventListener('timeupdate',() => {
    currentTimeRef.innerText = timeFormatter(audio.currentTime)
})


// Sıradaki butona Tıklandığında:

nextButton.addEventListener("click", nextSong)

// Durdur Butonuna Tıklanıldığında:
pauseButton.addEventListener('click', pauseAudio)

// Oynat Butonuna tıklanıldığında :
playButton.addEventListener('click', playAudio)

// Geri Tuşuna Tıklanıldığında:
prevButton.addEventListener('click',previousSong)

// Ekran Yükleme:
window.onload = () => {
    index = 0
    setSong(index)
}

