song="";
leftWristx="";
rightWristx="";
leftWristy="";
rightWristy="";
scoreleftwrist=0;
scorerightwrist=0;

function preload(){
    song = loadSound("music.mp3");
}


function setup(){
canvas= createCanvas(500,500);
background("white");
canvas.center();
video=createCapture(VIDEO);
video.hide();
poseNet= ml5.poseNet(video, modelLoaded);
poseNet.on("pose", gotPoses);

}



function play(){
    song.play();
    song.setVolume(0.7);
    song.rate(1);
}


function stop(){
    song.stop();
}

function modelLoaded(){
    console.log('posenet is initialised');

}

function gotPoses(results){
  if(results.length>0){
    console.log(results);
    scoreleftwrist=results[0].pose.keypoints[9].score;
    scorerightwrist=results[0].pose.keypoints[10].score;
  leftWristx= results[0].pose.leftWrist.x;
  rightWristx= results[0].pose.rightWrist.x;
  leftWristy= results[0].pose.leftWrist.y;
  rightWristy=results[0].pose.rightWrist.y;
  console.log('leftwristX'+leftWristx + 'rightwristX'+ rightWristx + 'leftwristY'+ leftWristy + 'rightwristy'+ rightWristy);
  }
}


function draw(){
    image(video, 0, 0, 500, 500);
    fill("red");
    stroke("red");
   if(scoreleftwrist>0.2){
    circle(leftWristx, leftWristy, 20);
    noleftwristy= Number(leftWristy);
    removedecimal= floor(noleftwristy);
    volume= removedecimal/500;
    document.getElementById('id-volumn').innerHTML="volume "+ volume;
    song.setVolume(volume);
    }
    
    if(scorerightwrist >0.2){
        circle(rightWristx, rightWristy, 20);
        console.log("text");
        if(rightWristy>0 && rightWristy<=100){
            song.rate(0.5);
            document.getElementById('id-speed').innerHTML="speed= 0.5x";
        }
        else if(rightWristy >100 && rightWristy<=200){
           song.rate(1);
           document.getElementById('id-speed').innerHTML="speed= 1x";
        }

        else if(rightWristy >200 && rightWristy<=300){
            song.rate(1.5);
            document.getElementById('id-speed').innerHTML="speed= 1.5x";
         }

         else if(rightWristy >300 && rightWristy<=400){
            song.rate(2);
            document.getElementById('id-speed').innerHTML="speed= 2x";
         }

         else{
            song.rate(2.5);
            document.getElementById('id-speed').innerHTML="speed= 2.5x";
         }
}
}
