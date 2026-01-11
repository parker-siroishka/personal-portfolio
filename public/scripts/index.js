const URL = location.origin; // root domain

$(document).ready(function() {
  // Smooth profile picture animation
  $("#profile-pic").css({
    'opacity': '0',
    'transform': 'scale(0.8)'
  }).animate({
    'opacity': '1'
  }, 1000).css('transform', 'scale(1)');
  
  // Add scroll animations with intersection observer for better performance
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe all cards for animation
  $('.card').each(function() {
    $(this).css({
      'opacity': '0',
      'transform': 'translateY(30px)',
      'transition': 'all 0.6s ease-out'
    });
    observer.observe(this);
  });

  // Navbar scroll effect
  $(window).scroll(function() {
    if ($(this).scrollTop() > 50) {
      $('.navbar').addClass('scrolled');
    } else {
      $('.navbar').removeClass('scrolled');
    }
  });

  // Smooth hover effects for tech icons
  $('.tech-img').hover(
    function() {
      $(this).parent().addClass('tech-hover');
    },
    function() {
      $(this).parent().removeClass('tech-hover');
    }
  );
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

$("#go-linda").on("click", e => {
  window.location.assign(`https://www.lindaolsen.org/`);
})

$("#det-linda").on("click", e => {
  window.location.assign(`${URL}/pages/lindaOlsenDetails.html`);
})

$("#go-pokemon").on("click", e => {
  window.location.assign(`https://github.com/parker-siroishka/Pokemon-Data-Dashboard`);
})

$("#go-olb").on("click", e => {
  window.location.assign(`https://github.com/openLeaderboard/olb-ios`);
})

$("#go-trekka").on("click", e => {
  // TODO: Add Trekka source URL
  window.location.assign(`#`);
})


// Modern smooth scrolling for navigation
$('a[href^="#"]').on('click', function(event) {
    var target = $(this.getAttribute('href'));
    if( target.length ) {
        event.preventDefault();
        $('html, body').stop().animate({
            scrollTop: target.offset().top - 80
        }, 1000);
    }
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
    thumbnail.style.height = '160px';
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
    title.style.borderBottom = '2px solid #141413';
    title.style.paddingBottom = '10px';
    title.style.marginBottom = '15px';

    var date = document.createElement('p');
    date.classList.add('card-text');
    date.style.fontSize = '0.85em';
    date.style.color = '#666';
    date.style.marginBottom = '10px';
    
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
    teaser.style.marginBottom = '10px';

    var readMore = document.createElement('button');
    readMore.classList.add('btn-sm');
    readMore.textContent = 'Read More';
    readMore.onclick = function() {
      window.open(post.link, '_blank');
    };

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


