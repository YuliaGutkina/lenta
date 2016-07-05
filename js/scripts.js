$(function() {
  $("body").append('<div id="arrowUp" class="arrowUp"><a href="#top" title="Наверх" class="scrollTo hidden-xs"><span class="fa fa-chevron-up"></span></a></div>');

  $('.fancy').fancybox();

  $('.goods-list__box, .goods-list__scales').tooltip({
    'placement': 'bottom'
  });

  /*===================== REGION POPUP =====================*/
  setTimeout(function() {
    $('#guess-town-modal').modal();
  }, 1000);
  $('#guess-town-modal .btn-custom').click(function(e) {
     if ($(e.target).attr('data-guess') == 'yes') {
       $('#guess-town-modal').modal('hide');
     } else {
       $('#guess-town-modal').modal('hide');
       setTimeout(function() {
         $('#modal-town').modal();
       }, 500);
     }
   });

  /*===================== CATLIST DROPDOWN ON HOVER =====================*/
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

  /*===================== INPUT NUMBERS =====================*/
  var pressTimeout = null,
      pressInterval = null,
      controlASC = $('<span/>',{
      'class': 'number__control number__control--asc'
    }),
    controlDESC = $('<span/>',{
      'class': 'number__control number__control--desc'
    });

    $('.number-custom input[type="number"]').each(function(){
      controlDESC.clone().appendTo($(this).parent());
      controlASC.clone().appendTo($(this).parent());
    });

    $('.number__control').on('mouseup mouseout', function(){
      clearTimeout(pressTimeout);
      clearInterval(pressInterval);
    });

    $('.number__control').mousedown(function(e){
      numberInputChange(e);
      pressTimeout = setTimeout(function(){
          pressInterval = setInterval(function(){ numberInputChange(e); }, 50);
      }, 200);
    });

    function numberInputChange(e) {
      var parent = $(e.target).parent(),
            input = $('input[type="number"]', parent),
            val = parseInt(input.val()),
            min = parseInt(input.attr('min')) - 1,
            max = parseInt(input.attr('max')) + 1;

        if ($(e.target).hasClass('number__control--asc')) {
          if ((val + 1) < max) {
            input.val(val + 1);
          }
        } else if ($(e.target).hasClass('number__control--desc')) {
          if ((val - 1) > min) {
            input.val(val - 1);
          }
        } else if ($(e.target).is(input)){
          if (input.val() > max) {
            input.val(max - 1);
          } else if (input.val() < min || input.val() == NaN) {
            input.val(min + 1);
          }
        }
    }
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
