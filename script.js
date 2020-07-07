$(document).ready(function() {

  //default work/rest intervals
  var working = true;
  var workInterval = 25;
  var restInterval = 5;

  resetClock();

  function resetClock() {
    go = false;
    countedTime = 0;
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
    } else {
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
        swapWorkRest();
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

  function swapWorkRest() {
    if (working === true) {
      var dusk = document.getElementById("dusk");
      dusk.play();
      setTimeout(function(){alert("Time for a break!");},100);
      countedTime = 0;
      startTime = restInterval * 60;
      working = false;
      clockStart();
    }
    else {
      var daybreak = document.getElementById("daybreak");
      daybreak.play();
      setTimeout(function(){alert("Time for work!");},100);
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

  $("#stop").click(function() {
    resetClock();
  });

  $("#switch").click(function() {
    working = (working === true) ? false : true;
    resetClock();
  });

  $("#work").click(function() {
    var workPrompt = parseInt(prompt("What work interval (in minutes) would you like?"));
    if (Number.isInteger(workPrompt) && workPrompt !== 0) workInterval = workPrompt;
    working = true;
    resetClock();
  });

  $("#rest").click(function() {
    var restPrompt = parseInt(prompt("What rest interval (in minutes) would you like?"));
    if (Number.isInteger(restPrompt) && restPrompt !== 0) restInterval = restPrompt;
    working = false;
    resetClock();
  });

});