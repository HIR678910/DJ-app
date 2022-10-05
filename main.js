song = "";
lX = 0;
lY = 0;
rX = 0;
rY = 0;
scoreLeft = 0;
scoreRight = 0;

function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(results)
{
  if(results.length > 0);
  {
    console.log(results);
    scoreLeft = results[0].pose.keypoints[9].score;
    console.log("scoreLeft = " + scoreLeft);

    scoreRight = results[0].pose.keypoints[10].score;
    console.log("scoreRight = " + scoreRight);

    lX = results[0].pose.leftWrist.x;
    lY = results[0].pose.leftWrist.y;
    console.log("leftWrist = " + lX + " leftWristY = " + lY);
  
    rX = results[0].pose.rightWrist.x;
    rY = results[0].pose.rightWrist.y;
    console.log("rightWrist = " + rX + " rightWristY = " + rY);

}
}

function modelLoaded()
    {
      console.log('PoseNet Has Stared');
    }


function draw() 
{
    image(video, 0, 0, 600, 500);

    fill("#95f9fc");
   stroke("#197d80");

   if(scoreRight > 0.2){
   circle(rX, rY, 20);

    if(rY >0 && rY <= 100)
    {
        document.getElementById("speed").innerHTML = "Speed = 0.5x";
        song.rate(0.5);
    }

     else if(rY >100 && rY <= 200)
    {
        document.getElementById("speed").innerHTML = "Speed = 1x";
        song.rate(1);
    }

    else if(rY >200 && rY <= 300)
    {
        document.getElementById("speed").innerHTML = "Speed = 1.5x";
        song.rate(1.5);
    }

    else if(rY >300 && rY <= 400)
    {
        document.getElementById("speed").innerHTML = "Speed = 2x";
        song.rate(2);
    }

    else if(rY >400 && rY <= 500)
    {
        document.getElementById("speed").innerHTML = "Speed = 2.5x";
        song.rate(2.5);
    }
   }
if(scoreLeft > 0.2){
    circle(lX, lY, 20);
    NumberLY = Number(lY);
    remove_decimals = floor(NumberLY);
    volume = remove_decimals/500;
    document.getElementById("volume").innerHTML = "Volume = " + volume;
    song.setVolume(volume);

}
   
}

function preload()
{
song = loadSound("harry.m4r");

}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}