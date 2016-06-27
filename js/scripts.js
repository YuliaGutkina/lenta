$(function() {
  $("body").append('<div id="arrowUp" class="arrowUp"><a href="#top" title="Наверх" class="scrollTo hidden-xs"><span class="fa fa-angle-up"></span></a></div>');

  /*===================== CATLIST DROPDOWN  ON HOVER =====================*/
  $('.catlist__title.dropdown').hover(function() {
      $(this).addClass('open');
    },
    function() {
      $(this).removeClass('open');
    });

  /*===================== ARROW UP =====================*/

  function scrollTo(id) {
    if (id == '#top') {
      $("body,html").animate({
        scrollTop: 0
      }, 1000);
    } else {
      if ($(id).length > 0) {
        $('html, body').stop().animate({
          scrollTop: $(id).offset().top - menuHeight
        }, 1000);
      }
    }
  }
  $('.goTo').click(function(e) {
    e.preventDefault();
    scrollTo($(this).attr('href'));
    return false;
  });

  $('#arrowUp').click(function(e) {
    e.preventDefault();
    scrollTo('#top');
  });

  /*===================== STICKY HEADER =====================*/
  var headerHeight = $('.pg-header').outerHeight(),
    headerTopHeight = $('.pg-header > .container').outerHeight();

  $(window).scroll(function() {
    // Sticky menu appearance
    if ($(this).scrollTop() > headerHeight) {
      $('.pg-header').next().css('margin-top', headerHeight);
      $('.pg-header > .container').addClass('hidden');
      $('.pg-header').affix({
        offset: {
          top: headerHeight
        }
      })
    } else {
      $('.pg-header').next().css('margin-top', 0);
      $('.pg-header > .container').removeClass('hidden');
    }

    // Arrow Up appearance
    if ($(this).scrollTop() > 350) {
      $("#arrowUp").fadeIn();
    } else {
      $("#arrowUp").fadeOut();
    }
  })

  /*===================== POPUP =====================*/
  var gTown = getCookie('guesstown');
  if (gTown == undefined) {
    setTimeout(function() {
      $('#guess-town-modal').modal();
    }, 1000);
  } else {
    $('#modal-town #town-list a').each(function() {
      if ($(this).text() == gTown) {
        $(this).parent().siblings().removeClass('active');
        $(this).parent().addClass('active');
      }
    });
  }

  $('#guess-town-modal .btn-custom').click(function(e) {
    if ($(e.target).attr('data-guess') == 'yes') {
      setCookie('guesstown', $('#guess-town-modal #guess-town').text());
      $('#guess-town-modal').modal('hide');
    } else {
      $('#guess-town-modal').modal('hide');
      setTimeout(function() {
        $('#modal-town').modal();
      }, 500);
    }
  });
  $('#modal-town #town-list a').click(function(e) {
    e.preventDefault();
    setCookie('guesstown', $(e.target).text());
    $('#modal-town').modal('hide');
    $('#modal-town #town-list a').each(function() {
      if ($(this).text() == $(e.target).text()) {
        $(this).parent().siblings().removeClass('active');
        $(this).parent().addClass('active');
      }
    });
  });

  /*===================== FILTER FUNCTIONS =====================*/
  $('.filter__dropdown-toggle').click(function(e){
    e.preventDefault();
    $(this).parent().toggleClass('active');
  });

});
/*===================== GLOBAL FUNCTIONS =====================*/
function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options) {
  options = options || {};

  var expires = options.expires;

  if (typeof expires == "number" && expires) {
    var d = new Date();
    d.setTime(d.getTime() + expires * 1000 * 60 * 60 * 24); //cookie for one day
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }

  value = encodeURIComponent(value);

  var updatedCookie = name + "=" + value;

  for (var propName in options) {
    updatedCookie += "; " + propName;
    var propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }

  document.cookie = updatedCookie;
}

function deleteCookie(name) {
  setCookie(name, "", {
    expires: -1
  })
}
