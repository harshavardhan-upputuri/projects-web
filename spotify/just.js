let songIndex=1;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');


let songItems= Array.from(document.getElementsByClassName('songItem'));


let songs =[
    {songName:'Blinding Lights', filePath:"songs/1.mp3", coverPath:"covers/1.jpg"},
    {songName:"Shape of You" , filePath:"songs/2.mp3", coverPath:"covers/2.jpg"},
    {songName:"Someone Like You", filePath:"songs/3.mp3", coverPath:"covers/3.jpg"},
    {songName:"Levitating", filePath:"songs/4.mp3", coverPath:"covers/4.jpg"},
    {songName:"Bohemian Rhapsody", filePath:"songs/5.mp3", coverPath:"covers/5.jpg"},
    {songName:"Stay", filePath:"songs/6.mp3", coverPath:"covers/6.jpg"},
    {songName:"Uptown Funk", filePath:"songs/7.mp3", coverPath:"covers/7.jpg"},
    {songName:"Believer", filePath:"songs/8.mp3", coverPath:"covers/8.jpg"},
    {songName:"Counting Stars", filePath:"songs/19.mp3", coverPath:"covers/9.jpg"} 
    
]
songItems.forEach((element,i)=>{
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
    let ae = new Audio(`songs/${i}.mp3`);
    ae.preload = 'metadata';  

     
    ae.oncanplay = () => {
        
        const minutes = Math.floor(ae.duration / 60);  
        const seconds = Math.floor(ae.duration % 60);  
        const formattedTime = `${minutes}:${  seconds}`;

        
        element.getElementsByClassName('timestamp')[0].innerText = formattedTime;
         
    };
    
})
 
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        
        gif.style.opacity=1;
    }else{
        audioElement.pause();
        masterPlay.classList.add('fa-play-circle');
        masterPlay.classList.remove('fa-pause-circle');
        gif.style.opacity=0;
    }
    
})

audioElement.addEventListener('timeupdate',()=>{
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value= progress;
    if(audioElement.currentTime >= audioElement.duration){
        audioElement.currentTime=0;
        audioElement.play();
    }
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = (myProgressBar.value*audioElement.duration)/100;
})


const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click' , (e)=>{
       
        if(e.target.classList.contains('fa-play-circle')){
            makeAllPlays();
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
             
            songIndex = parseInt(e.target.id);
            gif.style.opacity=1;
            audioElement.src= `songs/${songIndex+1}.mp3`;
            audioElement.currentTime=0;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.play();
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
        }else{
            e.target.classList.add('fa-play-circle');
            e.target.classList.remove('fa-pause-circle');
            audioElement.pause();
            masterPlay.classList.add('fa-play-circle');
            masterPlay.classList.remove('fa-pause-circle');
        }
    })
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex >= 9){
        songIndex=1;
    }
    else{
        songIndex++;
    }
    audioElement.src=`songs/${songIndex}.mp3`;
    masterSongName.innerText= songs[songIndex-1].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex <=0){
        songIndex=9;
    }else{
        songIndex--;
    }
    audioElement.src= `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

 
 