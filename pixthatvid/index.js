function factors(num)
{
 var
  n_factors = [],
  i;
 for (i = 1; i <= Math.floor(Math.sqrt(num)); i += 1)
  if (num % i === 0)
  {
     n_factors.push(i);
     if (num / i !== i)
      n_factors.push(num / i);
    }
 n_factors.sort(function(a, b){return a - b;});  // numeric sort
 return n_factors;
}
function commonfactors(x,y){
  x = factors(x);
  y = factors(y);
  z=[]
  for(var i =0; i<x.length; i++){
    if(x[i] in y){
      z.push(x[i])
    }
  }
  return z
}
var toggle=0;
function playpause(){
  if(toggle==0){
    vid.play();
    a = document.getElementById('playpause')
    a.innerHTML="Pause";
    a.text="Pause";
    document.body.style.background="#383838";
    toggle=1;
  }
  else{
    vid.pause();
    a = document.getElementById('playpause')
    a.innerHTML="Play";
    a.text="Play";
    document.body.style.background="#fff";
    toggle=0;
  }
}
function upload(){
  file = document.getElementById('hideupload');
  url = URL.createObjectURL(file.files[0])
  document.getElementById('vid').src =url;
  document.getElementById('vid').load()
  canvaswidth = vid.videoWidth;
  canvasheight = vid.videoHeight;
  window.slidefactors = commonfactors(canvaswidth,canvasheight)
  window.sidelength.max=window.slidefactors.length-1;
  window.sidelength.max=window.slidefactors.length-1;
 
}
document.addEventListener('DOMContentLoaded', function(){
    window.sidelength = document.getElementById('sidelength');
		var vid = document.getElementById('vid');
		var canvas = document.getElementById('c');
		var context = canvas.getContext('2d');
		var back = document.createElement('canvas');
		var backcontext = back.getContext('2d');
		var canvaswidth,canvasheight;
		vid.addEventListener('play', function(){
      canvaswidth = vid.videoWidth;
      canvasheight = vid.videoHeight;
      canvas.width = canvaswidth;
      window.slidefactors = commonfactors(canvaswidth,canvasheight)
      if(window.slidefactors.length<5) window.slidefactors = factors(canvaswidth)
      window.sidelength.max=window.slidefactors.length-1;
      canvas.height = canvasheight;
      back.width = canvaswidth;
      back.height = canvasheight;
      draw(vid,context,backcontext,canvaswidth,canvasheight);
		},false);

},false);
var customFloor = function(value, roundTo) {
	return Math.floor(value / roundTo) * roundTo;
}
function squareit(x,sidelength,data,width){
//BLACK DOT TEST CONFIRMS IT IS FUNCTION
  if(sidelength!=1){
    var averages = [0,0,0,0];
    for(var row=0; row<sidelength; row++){
      for(var column=0; column<sidelength*4;column++){
        averages[column%4]+=data[column+x+(row*width*4)]
      }
    }
    averages[0]/=(sidelength*sidelength);
    averages[1]/=(sidelength*sidelength);
    averages[2]/=(sidelength*sidelength);
    averages[3]/=(sidelength*sidelength);
    for(var rowx=0; rowx<sidelength; rowx++){
      for(var columnx=0; columnx<sidelength*4;columnx++){
        data[columnx+x+(rowx*width*4)] = averages[columnx%4];
      }
    }
  }
}
function draw(video,context,backcontext,width,height) {
    var sidelength = slidefactors[parseInt(window.sidelength.value)];
		if(video.paused || video.ended) return false;
		// First, draw it into the backing canvas
		backcontext.drawImage(video,0,0,width,height);
		// Grab the pixel data from the backing canvas
		var idata = backcontext.getImageData(0,0,width,height);
		var data = idata.data;
		//Loop through the pixels, turning them grayscale
		var videowidth = video.videoWidth;
		for(var squaretopleft = 0; squaretopleft < data.length; squaretopleft+=(sidelength*4)) {
				if((customFloor(squaretopleft,videowidth*4)/videowidth*4)%(sidelength*16)==0){
					squareit(squaretopleft,sidelength,data,videowidth);
				}
		}
		idata.data =data;
		// Draw the pixels onto the visible canvas
		context.putImageData(idata,0,0);
		// Start over!
		setTimeout(function(){ draw(video,context,backcontext,width,height); }, 0);
}

