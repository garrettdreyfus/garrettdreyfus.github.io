$(document).ready(function(){
  $(Bass).hide();
  $("Guitar").hide();
  $("#back").hide();
  $( "#Bass_select" ).click(function() {
    $(Bass).fadeIn();
    $("#Bass_select").fadeOut();
    $("#Guitar_select").fadeOut();
    $("#back").fadeIn();
    $("#or").fadeOut();
  });
  $("#Guitar_select" ).click(function() {
    $(Guitar).fadeIn();
    $("#Bass_select").fadeOut();
    $("#Guitar_select").fadeOut();
    $("#back").fadeIn();
    $("#or").fadeOut();
  });
  $("#back").click(function(){
    $(Bass).fadeOut();
    $("#Guitar").fadeOut();
    $("#back").fadeOut();
    $("#Bass_select").fadeIn();
    $("#Guitar_select").fadeIn();
    $("#or").fadeIn();
  });
});
