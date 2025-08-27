import MasonryModule from "../fe_modules/MasonryModule.js";
export default function BePageLibary() {
  const speed = 800;
  const hash = window.location.hash;
  if ($(hash).length) scrollToID(hash, speed);
  $(".btn-scroll").on("click", function (e) {
    e.preventDefault();
    const href = $(this).find("> a").attr("href") || $(this).attr("href");
    const id = href.slice(href.lastIndexOf("#"));
    if ($(id).length) {
      scrollToID(id, speed);
    } else {
      window.location.href = href;
    }
  });

  function scrollToID(id, speed, number) {
    const offSet = $("header").outerHeight();
    const section = $(id).offset();
    const targetOffset = section.top - offSet - number;
    $("html,body").animate({ scrollTop: targetOffset }, speed);
  }

  // Page thư viện
  function getPostListPagedLibary(
    flag,
    $this,
    formdata,
    processing,
    action,
    paged = 1
  ) {
    $.ajax({
      url: mona_ajax_url.ajaxURL,
      type: "post",
      data: {
        action: "mona_ajax_get_posts",
        formdata: formdata,
        paged: paged,
        action_layout: action,
        action_flag: flag,
      },
      error: function (request) {
        processing.removeClass("loading");
      },
      beforeSend: function (response) {
        processing.addClass("loading");
      },
      success: function (result) {
        if (result.success) {
          console.log("success");

          if (
            result.data.action_return == "reload" &&
            result.data.posts_html != ""
          ) {
            $(".monaLoadMoreJS").remove();
            $this.find("#monaPostsList").html(result.data.posts_html);
            // scrollToID("#" + result.data.scroll, 500, 200);

            MasonryModule();

            $(".loadmore-be").append(result.data.loadmore_libary);
            // initLoadMoreObserver();
          } else if (
            result.data.action_return == "loadmore" &&
            result.data.posts_html != ""
          ) {
            $(".monaLoadMoreJS").remove();

            $("#monaPostsList").append(result.data.posts_html);
            MasonryModule();

            $(".loadmore-be").append(result.data.loadmore_libary);
            // initLoadMoreObserver();
          }
        }
        processing.removeClass("loading");
      },
    });
  }

  $(document).on("change", ".mona-change-value-libary", function (e) {
    $(".sec-render-taxonomy").html("");
    var $this = $(this).closest("form");
    var formdata = $(this).closest("form").serialize();
    var processing = $(this).closest("form").find("#change-value-libary");
    getPostListPagedLibary(false, $this, formdata, processing, "reload");
  });

  // load more
  $(document).on("click", ".monaLoadMoreJS", function (e) {
    e.preventDefault();
    var $this = $(this);
    var paged = $this.data("paged");
    var form = $this.closest("form");
    var formdata = $this.closest("form").serialize();
    getPostListPagedLibary(true, form, formdata, $this, "loadmore", paged);
  });
  // function initLoadMoreObserver() {
  //     var loadMoreButton = document.querySelector('.monaLoadMoreJS');
  //     if (!loadMoreButton) return;

  //     var observer = new IntersectionObserver(function (entries, observer) {
  //         entries.forEach(function (entry) {
  //             if (entry.isIntersecting) {
  //                 var $this = $(entry.target);
  //                 var paged = $this.data('paged');
  //                 var form = $this.closest('form');
  //                 var formdata = form.serialize();

  //                 if (!$this.hasClass('loading')) {
  //                     $this.addClass('loading');
  //                     getPostListPagedLibary(true, form, formdata, $this, 'loadmore', paged, observer);
  //                 }
  //             }
  //         });
  //     }, {
  //         root: null,
  //         rootMargin: "0px",
  //         threshold: 1.0
  //     });

  //     observer.observe(loadMoreButton);
  // }

  // document.addEventListener("DOMContentLoaded", function () {
  //     initLoadMoreObserver();
  // });
}
