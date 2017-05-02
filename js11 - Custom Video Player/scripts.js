const player = document.querySelector('.player');
const video = document.querySelector('video');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');


//pause and play video
toggle.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('play', changeMark);
video.addEventListener('pause', changeMark);

function togglePlay() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}
function changeMark() {
    if (this.paused) {
        toggle.textContent = '►';
    } else {
        toggle.textContent = '❚ ❚';
    }
}

//跳著播或回播
function jump(){
    video.currentTime+=parseFloat(this.dataset.skip);
}
skipButtons.forEach(button=>button.addEventListener('click',jump));


//控制音量和播放速度
function slide(){
    video[this.name]=this.value;
}
ranges.forEach(range=>range.addEventListener('mouseup',slide));


//progress bar show progress
function handleProgress(){
    let percent=(video.currentTime/video.duration)*100;
    progressBar.style.flexBasis=`${percent}%`;
}
video.addEventListener('timeupdate',handleProgress);

//click progress bar
function handleBar(e){
    let percentage=(e.offsetX/progress.offsetWidth);
    video.currentTime=video.duration*percentage;
}
progress.addEventListener('click',handleBar);