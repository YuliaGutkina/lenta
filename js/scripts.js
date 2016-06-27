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

  /*===================== STICKY HEADER =====================*/
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
    } else {
      $('.pg-header').next().css('margin-top', 0);
      $('.pg-header > .container').removeClass('hidden');
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

  /*===================== YANDEX MAP =====================*/
  var stores = [{
    name: "Фэйковый элемент для двухколоночности",
    items: [{}]
  }, {
    name: "Гипермаркеты",
    items: [{
      center: [59.85166575830763, 30.093589000000005],
      name: "Лента на Петергофском",
      description: "Петергофское ш., д. 98<br>+7 (812) 336-39-63<br>Время выдачи заказа: 09:00-21:00"
    }, {
      center: [59.98454825761945, 30.22672849999993],
      name: "Лента на Савушкина",
      description: "ул. Савушкина, д. 112<br>+7 (812) 336-39-63<br>Время выдачи заказа: 09:00-21:00"
    }, {
      center: [60.02243575744825, 30.293311499999977],
      name: "Лента на Вербной",
      description: "ул. Вербная, д. 21а<br>+7 (812) 336-39-63<br>Время выдачи заказа: 09:00-21:00"
    }, {
      center: [60.02209286950443, 30.606006389557912],
      name: "Лента во Всеволожске",
      description: "ЛО, г. Всеволожск, 7-й км Дороги Жизни<br>+7 (812) 336-39-63<br>Время выдачи заказа: 09:00-21:00"
    }]
  }];

  ymaps.ready(init);

  function init() {

    var myMap = new ymaps.Map('store-map', {
        center: [59.91815363876071, 30.30557799999997], // Санкт-Петербург
        controls: ['zoomControl'],
        zoom: 10
      }, {
        searchControlProvider: 'yandex#search'
      }),
      // Контейнер для меню.
      menu = $('#store-map__list');

    for (var i = 0, l = stores.length; i < l; i++) {
      createMenuGroup(stores[i]);
    }

    function createMenuGroup(group) {
      // Пункт меню.
      var menuItem = $('<li class="col-xs-6"/>'),
        collection = new ymaps.GeoObjectCollection(null, {
          preset: group.style
        }),
        submenu = $('<ul class="store-map__ul row"/>');

      myMap.geoObjects.add(collection);

      menuItem.append(submenu);
      menuItem.appendTo(menu);

      for (var j = 0, m = group.items.length; j < m; j++) {
        createSubMenu(j, group.items[j], collection);
      }
    }

    function createSubMenu(step, item, collection) {
      if (item.name != undefined) {
        var submenuItem = $('<li class="store-map__li"><a href="#">' + item.name + '</a><p class="store-map__info">' + item.description + '</p></li>'),

          placemark = new ymaps.Placemark(item.center, {
            balloonContent: '<strong>' + item.name + '</strong><br><br>' + item.description
          }, {
            iconLayout: 'default#image',
            iconImageHref: 'img/map_marker.png',
            iconImageSize: [55, 67],
            iconImageOffset: [-27, -67]
          });

        // Добавляем метку в коллекцию.
        collection.add(placemark);
        // Добавляем пункт в подменю.
        console.log(step);

        if (step % 2 == 1) {
          $('#store-map__list li:first-child > ul').append(submenuItem);
        } else {
          $('#store-map__list li:last-child > ul').append(submenuItem);
        }

        submenuItem
          .find('a')
          .click(function() {
            $('.store-map__li').removeClass('active');
            $(this).parent().addClass('active');
            placemark.balloon.open();
          });
      }
    }

    myMap.setBounds(myMap.geoObjects.getBounds());
  }

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
