$(document).ready(function() {

  var go = false;
  var working = true;
  var startTime = 1500;
  var countedTime = 0;
  var workInterval = .1;
  var restInterval = .1;


  function initial() {

    if (working === true) {
      startTime = workInterval * 60;
      var seconds = (startTime - countedTime) % 60;
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      var minutes = Math.floor((startTime - countedTime) / 60);
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      $("#clockDisplay").html("Work: " + minutes + ":" + seconds);
    }

    else {
      startTime = restInterval * 60;
      var seconds = (startTime - countedTime) % 60;
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      var minutes = Math.floor((startTime - countedTime) / 60);
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      $("#clockDisplay").html("Rest: " + minutes + ":" + seconds);
    }
    
    $("#work").html("Work - " + workInterval);
    $("#rest").html("Rest - " + restInterval);
  }

  initial();

  function countDown() {
    if (go === true) {

      var seconds = (startTime - countedTime) % 60;
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      
      var minutes = Math.floor((startTime - countedTime) / 60);
      if (minutes < 10) {
        minutes = "0" + minutes;
      }

      if (countedTime === startTime) {
        switcher();
      }
      
      if (working === true) {
      $("#clockDisplay").html("Work: " + minutes + ":" + seconds);
      }
      else {
      $("#clockDisplay").html("Rest: " + minutes + ":" + seconds);  
      }
      countedTime += 1;
    }
  }

  var clockStart = setInterval(countDown, 1000);

  daybreak = new Audio("sounds/DaybreakRooster.wav");

  dusk = new Audio("sounds/DuskWolf.wav");

  function switcher() {
    if (working === true) {
      dusk.play();
      dusk.onplay = function () {alert("Time for a break!");};
      countedTime = 0;
      startTime = restInterval * 60;
      working = false;
      clockStart();
    }
    else {
      daybreak.play();
      daybreak.onplay = function () {alert("Time to work!");};
      countedTime = 0;
      startTime = workInterval * 60;
      working = true;
      clockStart();
    }
  }

  $("#play").click(function() {
    if (go === false) {
    go = true;
    clockStart();
    }
  });

  $("#pause").click(function() {
    go = false;
  });

  $("#reset").click(function() {
    go = false;
    countedTime = 0;
    initial();
  });

  $("#switch").click(function() {
    if (working === true) {
      go = false;
      countedTime = 0;
      working = false;
      initial();
    }
    else {
      go = false;
      countedTime = 0;
      working = true;
      initial();
    }
  });

  $("#work").click(function() {
    go = false;
    countedTime = 0;
    workInterval = prompt("What work interval (in minutes) would you like?");
    initial();
  });

  $("#rest").click(function() {
    go = false;
    countedTime = 0;
    restInterval = prompt("What rest interval (in minutes) would you like?");
    initial();
  });

});