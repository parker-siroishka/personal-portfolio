const URL = location.origin; // root domain

$(document).ready(function() {
  $("#profile-pic").animate({ //be sure to change the class of your element to "header"
      left:'250px',
      opacity:'1.0',
      height:'248px',
      width:'248px'
  }, 1000);
});




// redirects

$("#ret-home").on("click", e => {
    window.location.assign(`${URL}/`);
});

$("#go-p0").on("click", e => {
    window.location.assign(`${URL}/pages/p0.html`);
});

$("#src-p0").on("click", e => {
    window.location.assign(`https://drive.google.com/file/d/1H5PZpiWlJfv92e5IhVExGJdY1EqBo_t6/view?usp=sharing`);
});

$("#det-p0").on("click", e => {
    window.location.assign(`${URL}/pages/p0Details.html`);
});


$("#go-p1").on("click", e => {
    window.location.assign(`${URL}/pages/p1.html`);
});

$("#det-p1").on("click", e => {
    window.location.assign(`${URL}/pages/p1Details.html`);
});

$("#src-p1").on("click", e => {
    window.location.assign(`https://drive.google.com/file/d/1mfmX1FTgTr_CaiX3CXfjiq1QPZaq5X4K/view?usp=sharing`);
});

$("#go-p2").on("click", e => {
  window.location.assign(`${URL}/pages/p2.html`);
});

$("#det-p2").on("click", e => {
  window.location.assign(`${URL}/pages/p2Details.html`);
});

$("#go-arcurve").on("click", e => {
  window.location.assign(`https://www.arcurve.com/`);
})

$("#go-pokemon").on("click", e => {
  window.location.assign(`https://github.com/parker-siroishka/Pokemon-Data-Dashboard`);
})

$("#go-olb").on("click", e => {
  window.location.assign(`https://github.com/openLeaderboard/olb-ios`);
})


particlesJS("particles-js", 
{
    "particles": {
      "number": {
        "value": 50,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#212529"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 2,
          "color": "#212529"
        },
        "polygon": {
          "nb_sides": 6
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 0.11,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 2,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 50.547598989048005,
          "size_min": 7.5821398483572,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#212529",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 4,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "repulse"
        },
        "onclick": {
          "enable": true,
          "mode": "remove"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  });


  $("#slideshow > div:gt(0)").hide();

  setInterval(function() { 
    $('#slideshow > div:first')
    .fadeOut(1000)
    .next()
    .fadeIn(1000)
    .end()
    .appendTo('#slideshow');
  }, 3000);



