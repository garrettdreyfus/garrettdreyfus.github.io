
var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
if(!isChrome){
  alert("Sorry this requires Chrome");
}
if( /Android|webOS|iPhone|iPad|iPod|#292929Berry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  alert("Sorry this doesn't work on mobile");
}
var futurecolor= "#292929";
var audio
var processor
var ctx
var source;
function init(url){
  console.log(url);
  ctx = new webkitAudioContext()
  audio = new Audio(url)
    // 2048 sample buffer, 1 channel in, 1 channel out  
  processor = ctx.createJavaScriptNode(document.getElementById('freq').value*2048, 1, 1)
  var html = document.documentElement;
  var counter = 0;
  var overlay = document.getElementById('overlay');
  audio.addEventListener('canplaythrough', function(){
    source = ctx.createMediaElementSource(audio);
    source.connect(processor);
    source.connect(ctx.destination);
    processor.connect(ctx.destination);
    audio.play();
  }, false);
  // loop through PCM data and calculate average
  // volume for a given 2048 sample buffer
  processor.onaudioprocess = function(evt){
    counter+=2;
    var input = evt.inputBuffer.getChannelData(0);
    var len = input.length;
    var total = i = 0;
    var rms;
    while ( i < len ) total += Math.abs( input[i++] )
    rms = Math.sqrt( total / len );
    var div = document.createElement('div');
    div.style.height = ( (rms * 50) ) + '%';
    div.style.left = counter + "px";
    div.style.opacity = ( (rms *1) +0.1 );
    div.style.background=futurecolor;
    document.body.appendChild(div);
    if(counter> window.innerWidth/2 ){
      document.body.style.left = -(counter-window.innerWidth/2) +"px";
      firstchild = document.body.children[2];
      firstchild.parentNode.removeChild(firstchild);
    }
    
  }
}
function invert(){
  if(futurecolor=="white"){
    document.body.style.background="white";
    futurecolor="#292929";
    changeAllDivs('#292929');
    textbox = document.getElementById('textbox')
    textbox.style.background ="white";
    textbox.style.color ="#292929";
    document.getElementById('tag').style.background ="#fff";
    document.getElementById('tag').style.color ="#292929";
    bar = document.getElementById('wrapper');
    for(var i=0; i<bar.children.length; i++){
      bar.children[i].style.color="#292929";
      bar.children[i].style.background="white";
    }
  }
  else{
    document.body.style.background="#292929";
    futurecolor="white";
    changeAllDivs('white');
    textbox = document.getElementById('textbox')
    textbox.style.background ="#292929";
    textbox.style.color ="white";
    document.getElementById('tag').style.background ="#292929";
    document.getElementById('tag').style.color ="#fff";
    document.getElementById('upload').style.color ="#292929";
    document.getElementById('sample').style.color ="#292929";
    bar = document.getElementById('wrapper');
    for(var i=0; i<bar.children.length; i++){
      bar.children[i].style.color="white";
      bar.children[i].style.background="#292929";
    }
  }
}
function changeAllDivs(color) {
  var bars = document.getElementsByTagName('div');
  for(i=0; i<bars.length; i++) {
    if(bars[i].id != "textbox"){
      bars[i].style.backgroundColor =color;
    }
  }
}
function upload(){
  var file = document.getElementById('hideupload').files[0];
  url = URL.createObjectURL(file)
  init(url)
}
function disconnectEverything(callback){
  audio.pause();
  source.disconnect(processor);
  source.disconnect(ctx.destination);
  processor.disconnect(ctx.destination);
  callback.call();
}
function back(){
  disconnectEverything(function(){
    initialstate = document.body.children.length
    for(var i=3;i<=initialstate; i++){
      firstchild = document.body.children[2];
      firstchild.parentNode.removeChild(firstchild);
    }
  })
  document.body.style.left="0px";
}
