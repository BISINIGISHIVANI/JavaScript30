const player=document.querySelector('.player');
const video=player.querySelector('.viewer');
const progress=player.querySelector('.progress');
const progressBar=player.querySelector('.progress__filled');
const toggle=player.querySelector('.toggle');
const skipButtons=player.querySelectorAll('[data-skip]');
const ranges=player.querySelectorAll('.player__slider');
const fullScreen=player.querySelector('.screen');
function togglePlay(){
    if(video.paused){
        video.play();
    }else{
        video.pause();
    }
}
function updateButton(){
    const icon=this.paused ? '►' : '❚ ❚';
    toggle.textContent=icon;
}
function toggleScreenPlay(){
    if(video.fullscreenchange){
        video.exitFullscreen();
    }else{
        video.requestFullscreen();
    }
}

function skip(){
    console.log(this.dataset.skip);
    video.currentTime +=parseFloat(this.dataset.skip);
}
function handleRangeUpdate(){
    video[this.name]=this.value;
}
function handleProgress(){
    const percent=(video.currentTime/video.duration)*100;
    progressBar.style.flexBasis=`${percent}%`;
}
function scrub(e){
    const scrubTime=(e.offsetX/progress.offsetWidth)*video.duration;
    video.currentTime=scrubTime;

}
video.addEventListener('click',togglePlay);
video.addEventListener('play',updateButton);
video.addEventListener('pause',updateButton);
video.addEventListener('timeupdate',handleProgress);
toggle.addEventListener('click',togglePlay);
fullScreen.addEventListener('click',toggleScreenPlay);
skipButtons.forEach(button=>button.addEventListener('click',skip));
ranges.forEach(range=>range.addEventListener('change',handleRangeUpdate));
progress.addEventListener('click',scrub);
let mousedown=false;
progress.addEventListener('mousemove',(e)=>mousedown&&scrub(e));
progress.addEventListener('mousedown',()=>mousedown=true);
progress.addEventListener('mouseup',()=>mousedown=false);


