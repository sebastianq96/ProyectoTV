var vid = document.getElementById("myvideo");
var audio = document.getElementById("myaudio");
audio.volume = 0.2;
var contador = 0;
var progres = 0;
var tempslider = 0;


//_----------------------------------------------------Contenedores----------------------------------------------------------------------
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace("activate", "");
  }
  slides[slideIndex - 1].style.display = "block";
}


//----------------------------------------------Puntaje----------------------------------------------------------------
function puntajes() {
  var element = document.getElementById("container");
  var content = document.getElementById("o-container");
  var puntaje = document.getElementById("point");
  var menu = document.getElementById("o-point");

  content.style.display = "none";
  menu.style.display = "block";
  puntaje.className += "activate";
  element.classList.remove("activate");
  menu.innerHTML = "<div id='circle-content' class='o-circle-content'> <div id='circle' class='o-circle'> <p class='o-text-circle'>" + 1 + "/5</p></div></div>";

}


//---------------------------------------------Contenedores---------------------------------------------------
function contenedor() {
  var element = document.getElementById("container");
  var content = document.getElementById("o-container");
  var puntaje = document.getElementById("point");
  var menu = document.getElementById("o-point");

  menu.style.display = "none";
  content.style.display = "block";
  element.className += "activate";
  puntaje.classList.remove("activate");
}


//-------------------------------------Menu de pausa-------------------------------------------------------------
function playVid() {
  vid.play();
}

function pauseVid() {
  vid.pause();
}

function checkFunction() {
  if (document.getElementById("toggle").checked) {
    vid.pause();
    audio.pause();
  } else {
    vid.play();
    audio.play();
  }
}


//-------------------------------------video interactivo----------------------------------------------------------

var video = null;
var player = {
  currentime: 0,
  videoPlaying: 0,
};

function initPlayer() {
  "use strict";
  video = document.querySelector("video");
  console.log(video);
  //evento que se cuenta del avance del video
  video.ontimeupdate = function () {

    player.currentTime = video.currentTime;
    var ispause = 0;
    //--------------------------------------------pausa video inicial----------------------------------------------------------------
    if (parseInt(player.currentTime) == 9) {
      video.currentTime = 7;
    }

    if (parseInt(player.currentTime) >= 7) {
      if (player.videoPlaying === 0) {
        player.videoPlaying = 1;
        var btn_camion = document.createElement("BUTTON");
        btn_camion.className = "button-camion";

        btn_camion.onclick = function () {
          video.currentTime = 12;
          document.body.removeChild(btn_camion);
        };
        document.body.appendChild(btn_camion);
      }
    }

    if (parseInt(player.currentTime) >= 23) {
      if (player.videoPlaying === 1) {
        video.currentTime = 22;

        //---------------------------------------------------- Aqui va sensor RFID----------------------------------------------------------
        document.onkeydown = function () {
          var tecla2 = String.fromCharCode(event.keyCode);
          if (tecla2 === 'E') {
            video.currentTime = 24;
            player.videoPlaying = 2;
          }
        }
      }
    }

    //------------------------------------------------------- Interacción con slider---------------------------------------------------------
    if (parseInt(player.currentTime) >= 35) {
      if (player.videoPlaying === 2) {
        var bar = document.getElementById("bar");
        var slider = document.getElementById("myRange");
        var btn_continuar = document.getElementById("btn-continuar");
        var peso = progres * 342.5;
        document.getElementById("peso").innerHTML = "Peso: " + peso + " kg";

        if (parseInt(player.currentTime) === 41) {
          vid.pause();
          bar.style.display = "block";
          slider.style.display = "block";
          btn_continuar.style.display = "block";
          btn_continuar.style.animation = "fadeIn 2s;";
          bar.style.animation = "fadeIn 2s;";
          slider.style.animation = "fadeIn 2s;";

          btn_continuar.onclick = function () {
            if (peso === 27400) {
              video.currentTime = 42;
              player.videoPlaying = 3;
              vid.play();
              bar.style.display = "none";
              slider.style.display = "none";
              btn_continuar.style.display = "none";
            } else {
              //falta video para decir que puede llenar mas xD
              
            }
          };

          slider.oninput = function () {
            var bar2 = document.getElementById("bar-increment");
            progres = slider.value;


            tempslider = slider.defaultValue;
            bar2.style.width = progres + "%";
            slider.defaultValue = progres;

            if (progres > tempslider) {
              video.currentTime = 95;
              vid.play();
            }

            if (progres < tempslider) {
              video.currentTime = 98;
              vid.play();
            }
          }
        }

        if (parseInt(player.currentTime) === 96) {
          video.currentTime = 41;
        }

        if (parseInt(player.currentTime) === 100) {
          video.currentTime = 41;
        }
      }
    };
    //--------------------------------------------------Ultima interacción---------------------------------------------------------
    if (parseInt(player.currentTime) >= 71) {
      
        if (player.videoPlaying === 3) {
          video.currentTime = 64;

          document.onkeydown = function () {
            var tecla2 = String.fromCharCode(event.keyCode);

            if (tecla2 === 'A') {
              video.currentTime = 73;//tunel bueno
              player.videoPlaying = 4;
            }
            if (tecla2 === 'B') {
              video.currentTime = 102;
              player.videoPlaying = -3;
              
            }

            if (tecla2 === 'C') {
              video.currentTime = 102;
              player.videoPlaying = -3;
              
            }
          }
        }
    }

    if (parseInt(player.currentTime) >= 92 && player.videoPlaying==4 ) {
      vid.pause();
    }

    if(parseInt(player.currentTime) >= 118 && player.videoPlaying==-3 ) {
      video.currentTime = 71;
      player.videoPlaying = 3;
    }
  }
}


