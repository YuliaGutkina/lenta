$(function() {
  $("body").append('<div id="arrowUp" class="arrowUp"><a href="#top" title="Наверх" class="scrollTo hidden-xs"><span class="fa fa-chevron-up"></span></a></div>');

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

  /*===================== FILTER FUNCTIONS =====================*/
  $('.filter__dropdown-toggle').click(function(e){
    e.preventDefault();
    $(this).parent().toggleClass('active');
  });

  $('#price-range').slider({
      range: true,
      min: 0,
      max: 2999,
      values: [2499, 2874],
      slide: function( event, ui ) {
        $('input[name="price-from"]').val(ui.values[0]);
        $('input[name="price-to"]').val(ui.values[1]);
      }
    });
    $('input[name="price-from"]').val($('#price-range').slider('values', 0 ))
});
