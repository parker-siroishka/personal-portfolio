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


// Particle JS specs
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


  // Education slideshow slide change animations
  $("#slideshow > div:gt(0)").hide();

  setInterval(function() { 
    $('#slideshow > div:first')
    .fadeOut(1000)
    .next()
    .fadeIn(1000)
    .end()
    .appendTo('#slideshow');
  }, 3000);


// Medium Blog api
const MdFetch = async (username) => {
  const res = await fetch(
    `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/${username}`
  );
  return await res.json();
}

const data = MdFetch('@parkersiroishka_25031');


/**
 * <div class="col">
              <div class="card shadow-sm">
                <img class ="p0-thumbnail" src="../media/p2_details/p2-thumbnail.JPG">
                <div class="card-body">
                  <h3>Peek-a-Boo with You</h3>
                  <p class="card-text">
                    A two-way video conferencing application that is designed to foster a closer relationship between those who can't be together in person. Designed specifically
                    with the COVID-19 pandemic in mind, this application allows grandparents to interact in a meaningful way with their young grandchildren.
                    <br>  <strong>Made with: JavaScript, WebRTC, HTML/CSS.</strong> 
                  </p>
 */

data.then(function(res){

  blogDiv = document.getElementById('blog-container');
  res.items.forEach(post => {
    var col = document.createElement('div');
    col.classList.add('col');

    var card = document.createElement('div');
    card.classList.add('shadow-sm', 'card');

    var thumbnail = document.createElement('img');
    thumbnail.classList.add('p0-thumbnail');
    
    // Extract image from content if thumbnail is empty
    var imageSrc = post.thumbnail;
    if (!imageSrc || imageSrc === '') {
      // Look for the first image in the content
      var imgMatch = post.content.match(/<img[^>]+src="([^"]+)"/);
      if (imgMatch) {
        imageSrc = imgMatch[1];
      } else {
        // Fallback to a default image or the feed image
        imageSrc = res.feed.image || 'https://via.placeholder.com/400x225/cccccc/666666?text=No+Image';
      }
    }
    
    thumbnail.src = imageSrc;
    thumbnail.style.width = '100%';
    thumbnail.style.height = '225px';
    thumbnail.style.objectFit = 'cover';
    thumbnail.alt = post.title;
    
    // Handle image load errors
    thumbnail.onerror = function() {
      this.src = 'https://via.placeholder.com/400x225/cccccc/666666?text=Image+Not+Available';
    };

    var cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    var title = document.createElement('h3');
    title.textContent = post.title;
    title.style.borderBottom = '2px solid #F5CB5C';
    title.style.paddingBottom = '10px';
    title.style.marginBottom = '15px';

    var date = document.createElement('p');
    date.classList.add('card-text');
    date.style.fontSize = '0.9em';
    date.style.color = '#666';
    date.style.marginBottom = '15px';
    
    // Format the date nicely
    var pubDate = new Date(post.pubDate);
    date.textContent = pubDate.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    var teaser = document.createElement('p');
    var str = post.content;
    // Remove HTML tags and clean up the content
    str = str.replace(/<[^>]*>/g, '');
    if(str.length > 200) str = (str.substring(0,200) + '...');
    teaser.textContent = str;
    teaser.classList.add('card-text');
    teaser.style.marginBottom = '15px';

    var readMore = document.createElement('a');
    readMore.href = post.link;
    readMore.textContent = 'Read More →';
    readMore.style.color = '#F5CB5C';
    readMore.style.textDecoration = 'none';
    readMore.style.fontWeight = 'bold';

    // Assemble the card structure
    card.appendChild(thumbnail);
    cardBody.appendChild(title);
    cardBody.appendChild(date);
    cardBody.appendChild(teaser);
    cardBody.appendChild(readMore);
    card.appendChild(cardBody);
    col.appendChild(card);
    blogDiv.appendChild(col);

  });
})


