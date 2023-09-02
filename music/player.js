const trackList=["Microcosm","Dementia","Re-Ignite","Aether","Speed Of Light","SpaceTime",
"Uncertainty","Supernova","Vacuum","Illusion"]
const imgList=['abovetheworld.jpg','Vacuum.jpg','Dementia.jpg']
const recordsName=['Above the World','Vacuum','Dementia']
const links=['https://band.link/PKurm','https://band.link/yLpSM','https://band.link/bL6DR']

let track_index=0
let music=document.createElement('audio')

const masterPlay = document.getElementById('masterPlay')
const miniPlay=document.querySelector('.mini-player__play')
const mobilePlayerPlay=document.querySelector('.mobile_player__playback_play')

const currentTime=document.querySelectorAll('.current-time')
const trackDuration=document.querySelectorAll('.track-duration')

const seekSlider=document.querySelectorAll('.seek_slider')

const currVolume=document.querySelectorAll('.vol')
const progressBar=document.querySelectorAll('.progress-bar')
const tracklistTrack=document.querySelectorAll('.tracklist__track')
const wave=document.querySelector('.wave')
const lyrics=document.querySelector('.lyrics')
const commentDots=document.querySelector('.fa-comment-dots')
const close=document.querySelector('.close')
const popup=document.querySelector('.popup')
const popupContent=document.querySelector('.popup_content')
const trackName=document.querySelectorAll('.trackname')
const showLyricsButton=document.querySelector('.fa-comment-dots')

const mobilePlayerImg=document.querySelector('.mobile_player__img')
const mobilePlayer=document.querySelector('.mobile_player')
const miniPlayer=document.querySelector('.mini-player')

const streamLinks=document.querySelector('.streams-links')
const playBtnLink=document.querySelector('.play_btn_link')


let updateTimer
let startTrack

let isPlaying=false

loadTrack(track_index)

function loadTrack(track_index) {
    clearInterval(updateTimer);

    reset();

    music.src=`tracks/${trackList[track_index]}.mp3`
    music.load()

    updateTimer=setInterval(setUpdate,1000)


    music.addEventListener('ended',nextTrack)
}

function reset(){
    currentTime[0].textContent='00:00'
    trackDuration[0].textContent='00:00'
    seekSlider[0].value=0    

    currentTime[1].textContent='00:00'
    trackDuration[1].textContent='00:00'
    seekSlider[1].value=0   
}

function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack()
}

function playTrack(){
    music.play()
    isPlaying=true
    masterPlay.classList.remove('fa-play')
    masterPlay.classList.add('fa-pause')
    miniPlay.classList.remove('fa-play')
    miniPlay.classList.add('fa-pause')
    mobilePlayerPlay.classList.remove('fa-play')
    mobilePlayerPlay.classList.add('fa-pause')
    progressBar[0].classList.add('shown_progressBar')
    tracklistTrack[track_index].after(progressBar[0])
    wave.classList.add('shown_wave')
    tracklistTrack[track_index].prepend(wave)
    lyrics.setAttribute('src',`lyrics/${trackList[track_index]}.txt`)
    lyrics.classList.add('uncover')
    trackName[0].textContent=trackList[track_index]
    trackName[1].textContent=trackList[track_index]
}

function playStart() {
    track_index=startTrack;
    loadTrack(track_index);
    playTrack()
    isPlaying=true
    tracklistTrack[track_index].prepend(wave)
}

function pauseTrack(){
    music.pause()
    isPlaying=false
    masterPlay.classList.remove('fa-pause')
    masterPlay.classList.add('fa-play')
    miniPlay.classList.remove('fa-pause')
    miniPlay.classList.add('fa-play')
    mobilePlayerPlay.classList.remove('fa-pause')
    mobilePlayerPlay.classList.add('fa-play')
}


function nextTrack() {
    if (track_index < trackList.length  ) {
        track_index+=1
    }
    else {
        track_index=0
    }
    tracklistTrack[track_index].after(progressBar[0])
    tracklistTrack[track_index].prepend(wave)
    loadTrack(track_index);
    isPlaying && playTrack()
}


function prevTrack() {
    if (track_index >0) {
     track_index-=1
    }
    else {
        track_index=trackList.length-1
    }
    tracklistTrack[track_index].after(progressBar[0])
    tracklistTrack[track_index].prepend(wave)
    loadTrack(track_index)
    isPlaying && playTrack()
}

function seekTo(){
    let seekto=music.duration * (seekSlider[0].value / 100)
    music.currentTime=seekto
}

function seekToMobile(){
    let seekto=music.duration * (seekSlider[1].value / 100)
    music.currentTime=seekto
}

function setVolume(){
    music.volume=currVolume[0].value / 100 
    music.volume=currVolume[1].value / 100 
}

function mute(){
    music.volume=0
    currVolume[0].value=0
    currVolume[1].value=0
}

function fullVolume(){
    music.volume=1
    currVolume[0].value=100
    currVolume[1].value=100
}

function setUpdate() {
    let seekPosition = 0
    if(!isNaN(music.duration)){
        seekPosition=music.currentTime * (100 / music.duration)
        seekSlider[0].value=seekPosition
        seekSlider[1].value=seekPosition

        let currentMinutes = Math.floor(music.currentTime / 60)
        let currentSeconds=Math.floor(music.currentTime-currentMinutes * 60)
        let durationMinutes=Math.floor(music.duration / 60)
        let durationSeconds=Math.floor(music.duration - durationMinutes * 60)

        if(currentSeconds < 10) {currentSeconds="0" + currentSeconds}
        if(durationSeconds < 10) {durationSeconds="0" + durationSeconds}
        if(currentMinutes < 10) {currentMinutes="0" + currentMinutes}
        if(durationMinutes < 10) {durationMinutes="0" + durationMinutes}

        currentTime[0].textContent=currentMinutes + ":" + currentSeconds
        trackDuration[0].textContent=durationMinutes + ":" + durationSeconds

        currentTime[1].textContent=currentMinutes + ":" + currentSeconds
        trackDuration[1].textContent=durationMinutes + ":" + durationSeconds
    }
}



const coverImg=document.querySelector('.mini_cover')
const cardImg=document.querySelectorAll('.card__img')
const miniPlayerImg=document.querySelector('.mini-player__img')
const cover=document.querySelectorAll('.cover')
const discName=document.querySelector('.disc_name')


Array.from(cardImg).forEach(el=>{
    el.addEventListener('click',(e)=>{
        popup.classList.add('open')
        coverImg.src=imgList[e.target.id-1]
        miniPlayerImg.src=imgList[e.target.id-1]
        mobilePlayerImg.src=imgList[e.target.id-1]

        discName.textContent=recordsName[e.target.id-1]
        
        Array.from(tracklistTrack).forEach(track=>{
            
            if (e.target.id==='2') {
                
                track.style.display='flex'
                if (track.textContent!=='Vacuum') {
                    track.style.display='none'
                    
                }
                streamLinks.setAttribute('href',links[1])
                playBtnLink.setAttribute('href',links[1])
                track_index=8
                startTrack=track_index

                loadTrack(startTrack)
            } 
            else if (e.target.id==='3') {
                track.style.display='flex'
                
                if (track.textContent!=='Dementia') {
                    track.style.display='none'
                }
                streamLinks.setAttribute('href',links[2])
                playBtnLink.setAttribute('href',links[2])
                track_index=1
                startTrack=track_index
                loadTrack(startTrack)
            }
            else {
                streamLinks.setAttribute('href',links[0])
                playBtnLink.setAttribute('href',links[0])
                track_index=0
                startTrack=track_index
                loadTrack(startTrack)
            track.style.display='flex'
          
            }
        })
    })
})

function closePlayer(){
    popup.classList.remove('open')
    pauseTrack()
    progressBar[0].classList.remove('shown_progressBar')
}

let isOpened=false

function showhideLyrics() {
    isOpened ? hideLyrics() : showLyrics()
}

function showLyrics() {
    isOpened=true
    let parent= mobilePlayerImg.parentNode
    parent.removeChild(mobilePlayerImg)
    parent.prepend(lyrics)
    lyrics.classList.add('uncover')
    commentDots.style.background='white'
    commentDots.style.color='#202020'
}

function hideLyrics() {
    isOpened=false
    let parent= lyrics.parentNode
    parent.removeChild(lyrics)
    parent.prepend(mobilePlayerImg)
    lyrics.classList.remove('uncover')
    commentDots.style.background='none'
    commentDots.style.color='white'
}


for (let i=0;i<tracklistTrack.length;i++) { 

    tracklistTrack[i].addEventListener('click',()=>{    
        track_index=i;
        tracklistTrack[track_index].after(progressBar[0])
        loadTrack(track_index);
        playTrack()
        })
}

function hideMobilePlayer() {
    mobilePlayer.classList.add('hidden_player')
    mobilePlayer.classList.remove('shown_player')
}

miniPlayer.addEventListener('click',(e)=>{
    if (e.target.id!=='miniPlay' && e.target.id!=='next') {
    mobilePlayer.classList.add('shown_player')
    mobilePlayer.classList.remove('hidden_player')
    }
})














