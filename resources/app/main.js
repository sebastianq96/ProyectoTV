//Declaracion SerialPort
var serial;
var port = 'COM5'; // variable que indica el puerto serial utilizado por el Arduino

//----------

var vid = document.getElementById("myvideo");
var audio = document.getElementById("myaudio");
audio.volume = 0.2;
var contador = 0;
var progres = 0;
var tempslider = 0;
var points = 0;
var number = Math.floor(Math.random() * 6) + 1;
var data = "";
var pesoContenedorMax = 0;
var pesoContenedorMin = 0;

function setup() {
  // Crea un objeto del tipo SerialPort
  serial = new p5.SerialPort();

  // Determina el método que se llama para listar los puertos seriales conectados
  serial.onList(portList);

  // Abre la conexión con el puerto donde está conectado el Arduino
  serial.open(port);

  // Determina el método que se llama cuando hay datos en el puerto
  serial.onData(getData);
}

// Método que muestra por consola los puertos seriales conectados al PC
function portList(ports) {
  console.log('Listado de puertos seriales:');
  // recorre el listado de puertos seriales y los muestra por consola
  for (var i = 0; i < ports.length; i++) {
    console.log(ports[i]);
  }
}

// Método que llama al recibir datos desde el puerto serial
function getData() {
  data = serial.readLine();  // lee los datos desde el puerto serial
  trim(data);                    // elimina los espacios en blanco al principio y final de los datos, si los hay
  if (!data) return;             // si los datos leídos están vacíos no hace nada
  console.log(data); 
  initPlayer()            // muestra los datos leídos 
}


//_---------------------------------------------Slide-Contenedores----------------------------------------------------------------------
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
  menu.innerHTML = "<div id='circle-content' class='o-circle-content'> <div id='circle' class='o-circle'> <p class='o-text-circle'>" + points + "/5</p></div></div>";

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

  //---------------------------------------Selección aleatoria del video
  var selection = document.getElementById("myvideo");
  console.log(number);

  selection.innerHTML = "<source src='resources/images/video" + number + ".mp4' type='video/mp4'>";


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

        if (number === parseInt(data)) {
          video.currentTime = 24;
          player.videoPlaying = 2;
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


        // Get the modal
        var modal = document.getElementById('myModal');
        var modal2 = document.getElementById('myModal2');

        // Get the button that opens the modal
        //var btn = document.getElementById("myBtn");
        var btnSi = document.getElementById("myBtnSi");
        var btnSi2 = document.getElementById("myBtnSi2");

        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];

        // Get the button that opens the modal
        var mensaje = document.getElementById("myMensaje");


        document.getElementById("peso").innerHTML = "Peso: " + peso + " kg";

        if (parseInt(player.currentTime) === 41) {
          vid.pause();
          bar.style.display = "block";
          slider.style.display = "block";
          btn_continuar.style.display = "block";
          btn_continuar.style.animation = "fadeIn 2s;";
          bar.style.animation = "fadeIn 2s;";
          slider.style.animation = "fadeIn 2s;";
          if (number == 1) {
            pesoContenedorMax = 27400;
            pesoContenedorMin = 26000;
          }

          if (number == 2) {
            pesoContenedorMax = 26030;
            pesoContenedorMin = 25687;
          }

          if (number == 3) {
            pesoContenedorMax = 30825;
            pesoContenedorMin = 29797;
          }

          if (number == 4) {
            pesoContenedorMax = 30825;
            pesoContenedorMin = 29797;
          }

          if (number == 5) {
            pesoContenedorMax = 20500;
            pesoContenedorMin = 17500;
          }
          if (number == 6) {
            pesoContenedorMax = 20500;
            pesoContenedorMin = 17250;
          }

          btn_continuar.onclick = function () {

            if (peso >= pesoContenedorMin && peso <= pesoContenedorMax) {

              video.currentTime = 42;
              player.videoPlaying = 3;
              vid.play();
              bar.style.display = "none";
              slider.style.display = "none";
              btn_continuar.style.display = "none";
              btnSi.style.display = "none";
              modal.style.display = "none";
              modal2.style.display = "none";
              btnSi.style.display = "none";

            }

            if (peso < pesoContenedorMin) {
              modal.style.display = "block";
              //mensaje.textContent  = "Estas despediciando espacio";
              btnSi.style.display = "block";
              bar.style.display = "none";
              slider.style.display = "none";
              btn_continuar.style.display = "none";
            }
            if (peso > pesoContenedorMax) {
              modal2.style.display = "block";
              //mensaje.textContent  = "Estas despediciando espacio";
              btnSi.style.display = "block";
              bar.style.display = "none";
              slider.style.display = "none";
              btn_continuar.style.display = "none";

            }

            btnSi.onclick = function () {
              //mensaje.textContent  = "se elimino correctamente";
              btnSi.style.display = "none";
              modal.style.display = "none";

              bar.style.display = "block";
              slider.style.display = "block";
              btn_continuar.style.display = "block";
              btn_continuar.style.animation = "fadeIn 2s;";
              bar.style.animation = "fadeIn 2s;";
              slider.style.animation = "fadeIn 2s;";
            }

            // When the user clicks on <span> (x), close the modal
            span.onclick = function () {
              //mensaje.textContent  = "se elimino correctamente";
              btnSi.style.display = "none";
              modal.style.display = "none";

              bar.style.display = "block";
              slider.style.display = "block";
              btn_continuar.style.display = "block";
              btn_continuar.style.animation = "fadeIn 2s;";
              bar.style.animation = "fadeIn 2s;";
              slider.style.animation = "fadeIn 2s;";
            }

            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function (event) {
              if (event.target == modal) {
                btnSi.style.display = "none";
                modal.style.display = "none";

                bar.style.display = "block";
                slider.style.display = "block";
                btn_continuar.style.display = "block";
                btn_continuar.style.animation = "fadeIn 2s;";
                bar.style.animation = "fadeIn 2s;";
                slider.style.animation = "fadeIn 2s;";
              }
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

        if (number == 1) {
          if (data == 'a') {
            video.currentTime = 73;//tunel bueno
            player.videoPlaying = 4;
            data = "";
          }

          if (data === 's') {
            video.currentTime = 102;
            player.videoPlaying = -3;
            data = "";

          }

          if (data === 'd') {
            video.currentTime = 102;
            player.videoPlaying = -3;
            data = "";

          }
        }

        if (number == 2) {
          if (data == 'd') {
            video.currentTime = 73;//tunel bueno
            player.videoPlaying = 4;
            data = "";
          }

          if (data === 's') {
            video.currentTime = 102;
            player.videoPlaying = -3;
            data = "";

          }

          if (data === 'a') {
            video.currentTime = 102;
            player.videoPlaying = -3;
            data = "";

          }
        }

        if (number == 3) {
          if (data == 's') {
            video.currentTime = 73;//tunel bueno
            player.videoPlaying = 4;
            data = "";
          }

          if (data === 'd') {
            video.currentTime = 102;
            player.videoPlaying = -3;
            data = "";

          }

          if (data === 'a') {
            video.currentTime = 102;
            player.videoPlaying = -3;
            data = "";

          }
        }

        if (number == 4) {
          if (data == 's') {
            video.currentTime = 73;//tunel bueno
            player.videoPlaying = 4;
            data = "";
          }

          if (data === 'd') {
            video.currentTime = 102;
            player.videoPlaying = -3;
            data = "";

          }

          if (data === 'a') {
            video.currentTime = 102;
            player.videoPlaying = -3;
            data = "";

          }
        }

        if (number == 5) {
          if (data == 's') {
            video.currentTime = 73;//tunel bueno
            player.videoPlaying = 4;
            data = "";
          }

          if (data === 'd') {
            video.currentTime = 102;
            player.videoPlaying = -3;
            data = "";

          }

          if (data === 'a') {
            video.currentTime = 102;
            player.videoPlaying = -3;
            data = "";

          }
        }

        if (number == 6) {
          if (data == 's') {
            video.currentTime = 73;//tunel bueno
            player.videoPlaying = 4;
            data = "";
          }

          if (data === 'd') {
            video.currentTime = 102;
            player.videoPlaying = -3;
            data = "";

          }

          if (data === 'a') {
            video.currentTime = 102;
            player.videoPlaying = -3;
            data = "";

          }
        }

      }
    }

    if (parseInt(player.currentTime) >= 92 && player.videoPlaying == 4) {
      vid.pause();
    }

    if (parseInt(player.currentTime) >= 118 && player.videoPlaying == -3) {
      video.currentTime = 71;
      player.videoPlaying = 3;
    }
  }
}


