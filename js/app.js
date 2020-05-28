var $body = $("body");
var $header = $(".header");
var $loop = $(".loop");
var timeoutId = 0;
var timeOut = 0;
var holdTime = 1000;
var $holdTrigger = $('.header .simple-wrap');
var doc = window.document;
var context = doc.querySelector('.js-loop');
var clones = context.querySelectorAll('.is-clone');
var disableScroll = false;
var scrollHeight = 0;
var scrollPos = 0;
var clonesHeight = 0;
var i = 0;
var $buffer = $(".buffer");
var $inerCircle = $(".iner-circle");
var $navbarItem = $( ".navbar-item" );
var $botomText = $(".header .bottom-text");
var $burger = $(".burger");
var $navbarMenu = $(".navbar");
var $navbar = $(".navbar");
var $sectionIntro = $(".section-intro");
var $sectionAbout = $(".section-about");
var $educationWrap = $(".education .simple-wrap");
var $sectionTechnology = $(".section-technology");
var $education = $(".education");
var $btnEdukation = $(".btn-education");
var $text = $(".text");
var $listItem =  $('.list-item');
var $navSlideDown = $(".nav-slide-down");

// Click and hold 
$holdTrigger.on('mousedown touchstart', function() {
  timeoutId = setTimeout(menToggle, holdTime);}).bind('mouseup mouseleave', function() {
  clearTimeout(timeoutId);
});

$holdTrigger.on('mousedown', function() {
  $body.addClass('active');  
}).bind('mouseup mouseleave', function() {
  $body.removeClass('active');
  clearInterval(timeOut);
});

function menToggle() {
  $header.fadeOut();
  $loop.add($navbar).css('visibility','visible').hide().fadeIn("slow");
}

// Loop scroll 
function getScrollPos () {
  return (context.pageYOffset || context.scrollTop) - (context.clientTop || 0);
}

function setScrollPos (pos) {
  context.scrollTop = pos;
}

function getClonesHeight () {
  clonesHeight = 0;
  for (i = 0; i < clones.length; i += 1) {
    clonesHeight = clonesHeight + clones[i].offsetHeight;
  }
  return clonesHeight;
}

function reCalc () {
  scrollPos = getScrollPos();
  scrollHeight = context.scrollHeight;
  clonesHeight = getClonesHeight();

  if (scrollPos <= 0) {
    setScrollPos(1);
  }
}

function scrollUpdate () {
  if (!disableScroll) {
    scrollPos = getScrollPos();

    if (clonesHeight + scrollPos >= scrollHeight) {
      setScrollPos(1);
      disableScroll = true;
    } else if (scrollPos <= 0) {
      setScrollPos(scrollHeight - clonesHeight);
      disableScroll = true;
    }
  }

  if (disableScroll) {
    window.setTimeout(function () {
      disableScroll = false;
    }, 40);
  }
}

function init () {
  reCalc();
  context.addEventListener('scroll', function () {
    window.requestAnimationFrame(scrollUpdate);
  }, false);
  window.addEventListener('resize', function () {
    window.requestAnimationFrame(reCalc);
  }, false);
}

if (document.readyState !== 'loading') {
  init()
} else {
  doc.addEventListener('DOMContentLoaded', init, false)
}

// Burger
$burger.on("click tap", function() {
  $navbarMenu.toggleClass("navbar-active");
  $navbar.toggleClass("burger-animation");
  $(this).toggleClass("burger-pre-animation");
});

$loop.on("click touchstart", function() {
  $navbarMenu.removeClass("navbar-active");
  $navbar.removeClass("burger-animation");
  $burger.addClass("burger-pre-animation");
});

// Section Intro
$sectionIntro.on("click touchstart mouseover", function(){
  $sectionIntro.addClass("section-intro-animation");
});


// Section About
$sectionAbout.on("click touchstart mouseover", function(){
  $(this).addClass("section-about-animation");
});

$( document ).on("ready resize", function() {
  $text.each(function () {
    $(this).parent().css({
      'height': $(this).outerHeight(),
      'width': $(this).outerwidth()
    })
  }).css({
    'height': '100%',
    'width': '100%'
  });
});

$btnEdukation.on("click touchstart", function(){
  $educationWrap.animate({
    left: "0"
  }, 500 );
  $(this).animate({
    left: "0%",
    opacity: "0"
  }, 500 );
  $education.css({
    overflow: "visible"
  },500);
});

// Section Technology
$sectionTechnology.on('click touchstart mouseover', function(){
  $listItem.each(function(i) {
    delay = (i)*250;
    setTimeout(function (div) {
      div.addClass('slide-bottom-technology').removeClass("pre-animation-item");
    }, delay, $(this));
  });
});

