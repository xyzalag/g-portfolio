import $ from 'jquery';
const fancybox = require("@fancyapps/fancybox");
import smoothScroll from 'jquery-smooth-scroll';
// const json = require('./data.json');

// FETCH JSON DATA
/*
!-- implement PRELOADRER!
*/


//ICON DISPLAY ON HOVER
// FETCH PROJECTS FROM JSON AND DISPLAY ON THE WEBSITE 

window.addEventListener('load', function(){
  var currentPage = window.location.pathname.split("/");
  currentPage  = currentPage[currentPage.length-1].toLowerCase();
  if (currentPage == 'commerce.html'){
    loadJSON('commerce');
  } else if (currentPage == 'film.html') {
    loadJSON('films');
  } else if (currentPage == 'music-videos.html') {
    loadJSON('music_videos');
  };
});


function loadJSON(subpage) {
  console.log(subpage);
  var request = new XMLHttpRequest();
  request.open('GET', 'assets/scripts/data.json', true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
        var data = JSON.parse(request.responseText);
        var dataProjects = data['projects'][subpage];
        buildUI(dataProjects, subpage);
    } else {
      console.log('Target server returned an error');
    }
  };
  request.onerror = function() {
    console.log('Connection error');
  };
  request.send();
};


function buildUI(dataArray, type) {
  var project, projectImagesPath, projectTitle, projectThumbnail, projectColors, projectVideo, html, newHtml, dataArray;

  for (var i = 0; i < dataArray.length; i++) {
    project = dataArray[i];
    projectImagesPath = 'assets/images/' + type + '/';
    projectTitle = project['title'];
    projectThumbnail = projectImagesPath + project['thumbnail'];
    projectColors = projectImagesPath + project['color_palette'];
    projectVideo = project['video_link'];

    if (i % 2 === 0) {
      html = '<div class="row justify-content-center project row-eq-height"><div class="col-md project__column project__column--left project__thumbnail"><img class="project__image" src="%projectThumbnail%"><a data-fancybox href="%projectVideo%"><img class="project__play" src="assets/images/play-icon.png"></a></div><div class="col-md project__column project__column--right project__description"><h1 class="project__title">%projectTitle%</h1><img class="project__color-palette" src="%projectColors%"/></div></div>';
    } else if (i % 2 !== 0) {
      html = '<div class="row justify-content-center project row-eq-height"><div class="col-12 col-md order-2 project__column project__column--left project__description"><h1 class="project__title">%projectTitle%</h1><img class="project__color-palette" src="%projectColors%"/></div><div class="col-12 col-md order-1 order-md-12 project__column project__column--right project__thumbnail"><img class="project__image" src="%projectThumbnail%"><a data-fancybox href="%projectVideo%"><img class="project__play" src="assets/images/play-icon.png"></a></div></div>';
    };

     newHtml = html.replace('%projectTitle%', projectTitle);
     newHtml = newHtml.replace('%projectThumbnail%', projectThumbnail);
     newHtml = newHtml.replace('%projectColors%', projectColors);
     newHtml = newHtml.replace('%projectVideo%', projectVideo);
    document.getElementById('container').insertAdjacentHTML('beforeend', newHtml); //insert review element
  };
 projectHover();
};

function projectHover() {
    console.log('elo');
  $('.project').mouseenter(function() {
    $(this).find('.project__play').css({'visibility':'visible'});
    //$(this).find('.project__description').css({'background-color':'black'});
    $(this).find('.project__thumbnail').css({'opacity':'.8'});
  });
  $('.project').mouseleave(function() {
    $(this).find('.project__play').css({'visibility':'hidden'});
    //$(this).find('.project__description').css({'background-color':'transparent'});
    $(this).find('.project__thumbnail').css({'opacity':'1'});
  });
};

//SCROLL TO THE PROJECTS
$(document).ready(function(){
  $(".scroll").on('click', function(event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 1000, function(){

        window.location.hash = hash;
      });
    }
  });
});

//SCROLL TO THE TOP ICON
$(document).ready(function(){
    $(window).scroll(function(){
        if ($(this).scrollTop() > 100) {
            $('.scroll-up').fadeIn();
        } else {
            $('.scroll-up').fadeOut();
        }
    });
    $('.scroll-up').click(function(){
        $("html, body").animate({ scrollTop: 0 }, 600);
        return false;
    });
});


//SIDENAV LEFT TOGGLE
if ( $(window).width() > 1024) {
  $(document).ready(function() {
    $('.open-icon').click(function() {
      $('.sidenav-hidden').css({"width":"25%"});
      $('.main').css({"margin-left":"25%"});
    });
  });
  } else {
  $(document).ready(function() {
    $('.open-icon').click(function() {
      $('.sidenav-hidden').css({"width":"100%"});
      $('.main').css({"margin-left":"100%"});
      });
    });
  }

$(document).ready(function() {
  $('.close-icon').click(function() {
    $('.sidenav-hidden').css({"width":"0"});
    $('.main').css({"margin-left":"0"});
  });
});



//FANCYBOX 
$('[data-fancybox]').fancybox({
  backFocus: true,
   helpers: {
    overlay: {
      locked: false
    }
  },
    youtube : {
        controls : 0,
        showinfo : 0
    },
    vimeo : {
        color : 'f00',
        autoplay: 0
    },
});

// //FANCYBOX 
// $('[data-fancybox]').fancybox({
//   backFocus: true,
//    helpers: {
//     overlay: {
//       locked: false
//     }
//   },
//     youtube : {
//         controls : 0,
//         showinfo : 0
//     },
//     vimeo : {
//         color : 'f00',
//         autoplay: 0
//     },
//     beforeShow: function() {
//       $("html, body").animate({ scrollTop: 0 }, 300);
//     },
// });
