navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || 
navigator.msGetUserMedia 
|| navigator.mozGetUserMedia;

const modelParams = {
    flipHorizontal: true, // flip e.g for video
    imageScaleFactor: 0.2, // reduce input image size for gains in speed.
    maxNumBoxes: 10, // maximum number of boxes to detect
    iouThreshold: 0.5, // ioU threshold for non-max suppression
    scoreThreshold: 0.89 // confidence threshold for predictions.
  };


const video=document.querySelector('#video');
const canvas = document.querySelector("#canvas");
const context = canvas.getContext('2d');
let model;

handTrack.startVideo(video).then(status => {
  if (status) {
    navigator.getUserMedia(
      { video: {} },
      stream => {
        video.srcObject = stream;
        //runDetection();
        setInterval(runDetection, 1);
      },
      err => console.log(err)
    );
  }
});
function runDetection(){
    model.detect(video).then(predictions=>{
        if (predictions.length !== 0) {
            let handused = predictions[0].bbox;
            let x = handused[0];
            let y = handused[1];
            
            window.scrollTo(x,y*5);
            
        }
        else
        {
            var scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;
            y=y+scrollTop;
        }
            
    });
}
handTrack.load(modelParams).then(lmodel => {
    model = lmodel;
  });