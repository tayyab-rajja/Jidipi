// 判断是否允许全屏
const fullscreenEnabled =
    document.fullscreenEnabled ||
    document.mozFullScreenEnabled ||
    document.webkitFullscreenEnabled ||
    document.msFullscreenEnabled;



const pdf = document.querySelector('#pdf');
const btn = document.querySelector('#fullscreen');
const controller = document.querySelector('#pdf-controller');
// 全屏
function launchFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullScreen();
    }
}
// 退出全屏
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

if (fullscreenEnabled) {
    btn.addEventListener('click', function () {
        const fullscreenElement =
            document.fullscreenElement ||
            document.mozFullScreenElement ||
            document.webkitFullscreenElement;
        if (fullscreenElement) {
            exitFullscreen();
        } else {
            launchFullscreen(document.documentElement);
        }
    }, false);
    pdf.addEventListener('click', function () {
        const fullscreenElement =
            document.fullscreenElement ||
            document.mozFullScreenElement ||
            document.webkitFullscreenElement;
        if (!fullscreenElement) {
            launchFullscreen(document.documentElement);
        }
    }, false);
}

function fullscreenchanged (event)   {
    if (document.fullscreenElement) {
        // console.log(`Element: ${document.fullscreenElement.id} entered fullscreen mode.`);
        controller.style.opacity= 1;
    } else {
        // console.log('Leaving fullscreen mode.');
        controller.style.opacity= 0;
    }
}

document.addEventListener('fullscreenchange', fullscreenchanged);
