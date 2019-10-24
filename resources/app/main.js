var vid = document.getElementById("myvideo");
var contador = 0;
var progres = 0;

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
    

  } else {
    vid.play();
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
        console.log("entre");
        var btn_camion = document.createElement("BUTTON");
        btn_camion.className = "button-camion";

        btn_camion.onclick = function () {
          video.currentTime = 12;
          console.log(player.videoPlaying);
          document.body.removeChild(btn_camion);
        };
        document.body.appendChild(btn_camion);
      }
    }

    if (parseInt(player.currentTime) >= 34) {
      if (player.videoPlaying === 1) {
        console.log("entre x2");
        player.videoPlaying = 2;
        vid.pause();

        var divsize = (100).toFixed();
        var posx = (Math.random() * (1080 - divsize)).toFixed();
        var posy = (Math.random() * (400 - divsize)).toFixed();
        var bar = document.getElementById("bar");
        bar.style.display = "block";
      
        var image = document.getElementById("o-content-random");
        
        /*
        image.style.display = "block";
        image.style.left = posx + "px";
        image.style.top = posy + "px";*/

        var slider = document.getElementById("myRange");
        slider.style.display="block";
  
        slider.oninput = function() {
          var bar2 = document.getElementById("bar-increment");
          progres=slider.value;
          bar2.style.width = progres + "%";

          if(progres==60){
            image.style.display = "none";
            video.currentTime = 41;
            vid.play();
          }
        }

       /* image.onclick = function () {
          image.style.display = "none";
          contador++;
          progres += 20;
          console.log(progres);

          var divsize = (100).toFixed();
          var posx = (Math.random() * (1080 - divsize)).toFixed();
          var posy = (Math.random() * (400 - divsize)).toFixed();


          var image2 = document.getElementById("o-image-random");
          image2.style.display = "block";
          image2.style.left = posx + "px";
          image2.style.top = posy + "px";

          var bar2 = document.getElementById("bar-increment");
          bar2.style.width = progres + "%";



          if (contador == 5) {
            image2.style.display = "none";
            video.currentTime = 41;
            vid.play();
          }
        }*/
      }

      //--------------------------------------------Cambio contenedor-------------------------------------------------------------------

      document.onkeydown = function () {
        var tecla = String.fromCharCode(event.keyCode);
        console.log(tecla);
        if (tecla === 'S') {
          video.play();
        }
      }



      if (player.currentTime >= 60) {

        // Repeticion del Video
        if (player.currentTime >= 360) {
          video.currentTime = 120;
        }


        if (player.videoPlaying === 0) {
          //Botones del Video
          //seleccion para ir al video 1
          console.log("LLEGUE");
          player.videoPlaying = -1;
          var btn_partes = document.createElement("BUTTON");
          btn_partes.innerHTML = "opción 1";

          btn_partes.onclick = function () {
            player.videoPlaying = 1;
            video.src = "resources/images/video2.mp4";
            video.play();
            document.body.removeChild(btn_partes);
            document.body.removeChild(btn_ritmos);

          };
          //determino posicion para el boton
          btn_partes.className = "button";
          document.body.appendChild(btn_partes);

          //seleccion para ir al video 2
          var btn_ritmos = document.createElement("BUTTON");
          btn_ritmos.innerHTML = "opción 2";
          player.videoPlaying = -1;
          btn_ritmos.onclick = function () {
            player.videoPlaying = 1;
            video.src = "VIDEOS/ritmos(2).mp4";
            video.play();
            document.body.removeChild(btn_partes);
            document.body.removeChild(btn_ritmos);

          };

          //determino posicion para el boton
          btn_ritmos.className = "button2"
          document.body.appendChild(btn_ritmos);
        }
      }

      if (player.videoPlaying === 1 && player.currentTime >= 10) {
        // Repeticion del Video
        if (player.currentTime >= 20) {
          video.currentTime = 5;
        }

        var btn_loop = document.createElement("BUTTON");
        btn_loop.innerHTML = "videoLoop";
        player.videoPlaying = -1;


        var presion = 0;
        document.onkeydown = function () {
          presion++;
          console.log(presion);
          var img = document.createElement("img");
          if (presion >= 50 && presion <= 80) {
            console.log("puse la imagen");

            img.src = "resources/images/source.gif";
            document.body.appendChild(img);

            if (presion == 80) {
              player.videoPlaying = 0;
              video.src = "resources/images/video.mp4";
              video.play();
              document.body.removeChild(img);

            }
          }
        }

        //determino posicion para el boton
        btn_loop.className = "button"
        document.body.appendChild(btn_loop);

        var btn_loop2 = document.createElement("BUTTON");
        btn_loop2.innerHTML = "videoLoop2";
        player.videoPlaying = -1;


        btn_loop2.onclick = function () {
          player.videoPlaying = 2;
          video.src = "VIDEOS/videoLoop.mp4";
          video.play();
          btn_loop2.body.removeChild(btn_loop2);
        };
        //determino posicion para el boton
        btn_loop2.className = "button2"
        document.body.appendChild(btn_loop2);


      }
    };
  }
}



