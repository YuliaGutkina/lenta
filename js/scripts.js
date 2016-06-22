$(function() {
    $('.catlist__title.dropdown').hover(function(){
      $(this).addClass('open');
    },
    function(){
      $(this).removeClass('open');
    });
});
