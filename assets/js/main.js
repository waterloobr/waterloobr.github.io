(function ($) {
  "use strict";

  var oldLinkedInUrl = "https://www.linkedin.com/company/waterloo-business-review/about";
  var newLinkedInUrl = "https://www.linkedin.com/company/waterloobusinessreview/";

  function getRootRelativePath(target) {
    var pathname = window.location.pathname || "";
    if (pathname.indexOf("/articles/") !== -1 || pathname.indexOf("articles/") !== -1) {
      return "../../" + target;
    }
    if (pathname.indexOf("/topics/") !== -1 || pathname.indexOf("topics/") !== -1 || pathname.indexOf("/publications/") !== -1 || pathname.indexOf("publications/") !== -1) {
      return "../" + target;
    }
    return target;
  }

  function initCardReveal(selector) {
    var cards = document.querySelectorAll(selector);
    if (!cards.length) return;

    if (!("IntersectionObserver" in window)) {
      cards.forEach(function (card) {
        card.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, {
      threshold: 0.08,
      rootMargin: "0px 0px -6% 0px"
    });

    cards.forEach(function (card, index) {
      card.style.transitionDelay = Math.min(index * 28, 140) + "ms";
      observer.observe(card);
    });
  }

  /* 1. Proloder */
  $(window).on("load", function () {
		$("#preloader-active").delay(450).fadeOut("slow")

		// check if the url contains publications
		if (!(window.location.href.indexOf("publications") > -1)) {
			$("body").delay(450).css({
				overflow: "visible",
			})
		} else{ 
      // if it does only make vertical overflow visible
      $("body").delay(450).css("overflow-y", "visible")
    }
	});

  /* 2. sticky And Scroll UP */
  $(window).on("scroll", function () {
    var scroll = $(window).scrollTop();
    if (scroll < 400) {
      $(".header-sticky").removeClass("sticky-bar");
      $("#back-top").fadeOut(500);
    } else {
      $(".header-sticky").addClass("sticky-bar");
      $("#back-top").fadeIn(500);
    }
  });

  // Scroll Up
  $("#back-top a").on("click", function () {
    $("body,html").animate(
      {
        scrollTop: 0,
      },
      800
    );
    return false;
  });

  $('a[href="' + oldLinkedInUrl + '"]').attr("href", newLinkedInUrl);

  /* 3. slick Nav */
  // mobile_menu
  var topNav = $("ul#top_navigation").first();
  if (topNav.length) {
    var publicationsLink = topNav.find('a[href$="publications.html"]').first();
    if (publicationsLink.length && !publicationsLink.parent().hasClass("wbr-publications-nav")) {
      var publicationsItem = publicationsLink.parent();
      var publicationsHref = publicationsLink.attr("href");

      publicationsItem.addClass("wbr-publications-nav");
      publicationsLink.attr({
        "aria-haspopup": "true",
        "aria-expanded": "false"
      });

      publicationsItem.append(
        '<ul class="wbr-publications-dropdown">' +
          '<li><a href="' + publicationsHref + '#articles">Articles</a></li>' +
          '<li><a href="' + publicationsHref + '#issues">Full Issues</a></li>' +
        '</ul>'
      );

      publicationsItem
        .on("mouseenter focusin", function () {
          $(this).addClass("is-open").find("> a").attr("aria-expanded", "true");
        })
        .on("mouseleave focusout", function (event) {
          var relatedTarget = event.relatedTarget;
          if (relatedTarget && this.contains(relatedTarget)) {
            return;
          }
          $(this).removeClass("is-open").find("> a").attr("aria-expanded", "false");
        });
    }
  }

  if (topNav.length && !topNav.find(".wbr-subscribe-nav-item").length) {
    topNav.append(
      '<li class="wbr-subscribe-nav-item"><a class="wbr-subscribe-link" href="' +
        getRootRelativePath("subscribe.html") +
        '">Subscribe</a></li>'
    );
  }

  function getActiveNavKey(pathname) {
    var path = (pathname || "").toLowerCase();

    if (!path || path === "/" || /\/index\.html$/.test(path)) {
      return "home";
    }
    if (/\/about\.html$/.test(path)) {
      return "about";
    }
    if (/\/contact\.html$/.test(path)) {
      return "contact";
    }
    if (/\/subscribe\.html$/.test(path)) {
      return "subscribe";
    }
    if (/\/team(?:[-_]\d+)?\.html$/.test(path)) {
      return "team";
    }
    if (
      /\/publications(?:\/|\.html|$)/.test(path) ||
      /\/articles\//.test(path) ||
      /\/topics\//.test(path) ||
      /\/newsletter\.html$/.test(path)
    ) {
      return "publications";
    }

    return "";
  }

  function getActivePublicationsSubKey(pathname, hash) {
    var path = (pathname || "").toLowerCase();
    var currentHash = (hash || "").toLowerCase();

    if (/\/articles\//.test(path)) {
      return "articles";
    }
    if (/\/publications\/.+\.html$/.test(path)) {
      return "issues";
    }
    if (/\/publications\.html$/.test(path)) {
      if (currentHash === "#issues") {
        return "issues";
      }
      if (currentHash === "#articles") {
        return "articles";
      }
    }

    return "";
  }

  function markActiveTopNav(nav) {
    if (!nav.length) return;

    var activeKey = getActiveNavKey(window.location.pathname || "");
    var activePublicationsSubKey = getActivePublicationsSubKey(
      window.location.pathname || "",
      window.location.hash || ""
    );
    if (!activeKey) return;

    nav.find("a").removeClass("is-current").removeAttr("aria-current");

    nav.find("a").each(function () {
      var link = $(this);
      var href = (link.attr("href") || "").toLowerCase();
      var match = "";
      var subMatch = "";

      if (/index\.html$/.test(href)) {
        match = "home";
      } else if (/about\.html$/.test(href)) {
        match = "about";
      } else if (/contact\.html$/.test(href)) {
        match = "contact";
      } else if (/subscribe\.html$/.test(href)) {
        match = "subscribe";
      } else if (/team(?:[-_]\d+)?\.html$/.test(href) || /team\.html$/.test(href)) {
        match = "team";
      } else if (/publications\.html(?:#.*)?$/.test(href)) {
        match = "publications";
        if (/#articles$/.test(href)) {
          subMatch = "articles";
        } else if (/#issues$/.test(href)) {
          subMatch = "issues";
        }
      }

      if (subMatch) {
        if (activeKey === "publications" && subMatch === activePublicationsSubKey) {
          link.addClass("is-current").attr("aria-current", "page");
        }
      } else if (match === activeKey) {
        link.addClass("is-current").attr("aria-current", "page");
      }
    });
  }

  markActiveTopNav(topNav);

  var pathname = window.location.pathname || "";
  if (/\/topics\/(business_strategy|entrepreneurship|technology|alumni_insights)\.html$/i.test(pathname)) {
    document.body.classList.add("wbr-topic-list-page");
    var topicArticleShell = document.querySelector(".top-post-area");
    if (topicArticleShell) {
      topicArticleShell.classList.add("topic-articles");
    }
  }

  var menu = $("ul#navigation").clone();
  var top_menu = $("ul#top_navigation").clone();

  // ensures the second added menu is at the same level
  menu.append(top_menu.find("li"));

  if (menu.length) {
    menu.slicknav({
      prependTo: ".mobile_menu",
      closedSymbol: "+",
      openedSymbol: "-",
    });
  }

  /* 4. MainSlider-1 */
  // h1-hero-active
  function mainSlider() {
    var BasicSlider = $(".slider-active");
    BasicSlider.on("init", function (e, slick) {
      var $firstAnimatingElements = $(".single-slider:first-child").find(
        "[data-animation]"
      );
      doAnimations($firstAnimatingElements);
    });
    BasicSlider.on(
      "beforeChange",
      function (e, slick, currentSlide, nextSlide) {
        var $animatingElements = $(
          '.single-slider[data-slick-index="' + nextSlide + '"]'
        ).find("[data-animation]");
        doAnimations($animatingElements);
      }
    );
    BasicSlider.slick({
      autoplay: true,
      autoplaySpeed: 3500,
      dots: false,
      fade: true,
      arrows: false,
      prevArrow:
        '<button type="button" class="slick-prev"><i class="ti-angle-left"></i></button>',
      nextArrow:
        '<button type="button" class="slick-next"><i class="ti-angle-right"></i></button>',
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
          },
        },
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
          },
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
          },
        },
      ],
    });

    function doAnimations(elements) {
      var animationEndEvents =
        "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
      elements.each(function () {
        var $this = $(this);
        var $animationDelay = $this.data("delay");
        var $animationType = "animated " + $this.data("animation");
        $this.css({
          "animation-delay": $animationDelay,
          "-webkit-animation-delay": $animationDelay,
        });
        $this.addClass($animationType).one(animationEndEvents, function () {
          $this.removeClass($animationType);
        });
      });
    }
  }
  mainSlider();

  /* 4. Testimonial Active*/
  var testimonial = $(".h1-testimonial-active");
  if (testimonial.length) {
    testimonial.slick({
      dots: false,
      infinite: true,
      speed: 1000,
      autoplay: true,
      loop: true,
      arrows: false,
      prevArrow:
        '<button type="button" class="slick-prev"><i class="ti-arrow-top-left"></i></button>',
      nextArrow:
        '<button type="button" class="slick-next"><i class="ti-arrow-top-right"></i></button>',
      slidesToShow: 1,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: false,
            arrow: false,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
          },
        },
      ],
    });
  }

  /* 6. Nice Selectorp  */
  var nice_Select = $("select").not(".publication-select");
  if (nice_Select.length) {
    nice_Select.niceSelect();
  }

  // Banner Slider
  $(".banner-slider-active").slick({
    dots: false,
    infinite: true,
    speed: 1000,
    autoplaySpeed: 3500,
    autoplay: true,
    loop: true,
    arrows: false,
    prevArrow:
      '<button type="button" class="slick-prev"><i class="ti-angle-left"></i></button>',
    nextArrow:
      '<button type="button" class="slick-next"><i class="ti-angle-right"></i></button>',
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });

  // Brand Active
  $(".news-slider-active").slick({
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 400,
    arrows: true,
    prevArrow:
      '<button type="button" class="slick-prev"><i class="ti-angle-left"></i></button>',
    nextArrow:
      '<button type="button" class="slick-next"><i class="ti-angle-right"></i></button>',
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });

  // Single Img slder
  $(".man-slider-active").slick({
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 400,
    arrows: true,
    prevArrow:
      '<button type="button" class="slick-prev"><i class="ti-angle-left"></i></button>',
    nextArrow:
      '<button type="button" class="slick-next"><i class="ti-angle-right"></i></button>',
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });

  /* 7. data-background */
  $("[data-background]").each(function () {
    $(this).css(
      "background-image",
      "url(" + $(this).attr("data-background") + ")"
    );
  });

  /* 10. WOW active */
  new WOW().init();

  // 11. ---- Mailchimp js --------//
  function mailChimp() {
    $("#mc_embed_signup").find("form").ajaxChimp();
  }
  mailChimp();

  // 12 Pop Up Img
  var popUp = $(".single_gallery_part, .img-pop-up");
  if (popUp.length) {
    popUp.magnificPopup({
      type: "image",
      gallery: {
        enabled: true,
      },
    });
  }
  // 12 Pop Up Video
  var popUp = $(".popup-video");
  if (popUp.length) {
    popUp.magnificPopup({
      type: "iframe",
    });
  }

  /* 13. counterUp*/
  $(".counter").counterUp({
    delay: 10,
    time: 3000,
  });

  /* 14. Datepicker */
  $("#datepicker1").datepicker();

  // 15. Time Picker
  $("#timepicker").timepicker();

  //16. Overlay
  $(".snake").snakeify({
    speed: 200,
  });

  //17.  Progress barfiller

  $("#bar1").barfiller();
  $("#bar2").barfiller();
  $("#bar3").barfiller();
  $("#bar4").barfiller();
  $("#bar5").barfiller();
  $("#bar6").barfiller();

  // Modal Activation
  $(".search-switch").on("click", function () {
    $(".search-model-box").fadeIn(400);
  });

  $(".search-close-btn").on("click", function () {
    $(".search-model-box").fadeOut(400, function () {
      $("#search-input").val("");
    });
  });

  initCardReveal(".wbr-topic-list-page .topic-articles .single-job-items");
})(jQuery);
