$(function() {
      $("body").append('<div id="arrowUp" class="arrowUp"><a href="#top" title="Наверх" class="scrollTo hidden-xs"><span class="fa fa-angle-up"></span></a></div>');

      /* CATLIST DROPDOWN  ON HOVER */
      $('.catlist__title.dropdown').hover(function() {
          $(this).addClass('open');
        },
        function() {
          $(this).removeClass('open');
        });

      /* ARROW UP */
      $(window).scroll(function() {
        if ($(this).scrollTop() > 350) {
          $("#arrowUp").fadeIn();
        } else {
          $("#arrowUp").fadeOut();
        }
      });

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

      /* STICKY HEADER */
      var headerHeight = $('.pg-header').outerHeight(),
        headerTopHeight = $('.pg-header > .container').outerHeight();

      $(window).scroll(function() {
          if ($(this).scrollTop() > headerHeight) {
            $('.pg-header').next().css('margin-top', headerHeight);
            $('.pg-header > .container').addClass('hidden');
            $('.pg-header').affix({
                offset: {
                  top: headerHeight,
                  bottom: function() {
                    return (this.bottom = $('.pg-footer').outerHeight(true))
                  }
                }
              })
            }
            else {
              $('.pg-header').next().css('margin-top', 0);
              $('.pg-header > .container').removeClass('hidden');
            }
          })
      });
