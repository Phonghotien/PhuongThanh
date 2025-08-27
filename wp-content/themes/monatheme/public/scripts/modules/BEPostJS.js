export default function BEPostJS() {
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

    // Page cổ đông - lv0
    $(document).on('click', '.pagination-posts-ajax a.page-numbers', function (e) {
        e.preventDefault();
        var $this = $(this);
        var form = $this.closest('form');
        var pagination = $this.closest('.pagination-posts-ajax');
        var pagedText = $this.text();
        var paged = pagedText.match(/\d+/);
        if (!paged) {
            if (!$this.hasClass('next')) {
                var pagedCurrentText = parseInt(pagination.find('.page-numbers.current').text());
                var paged = pagedCurrentText - 1;
            } else {
                var pagedCurrentText = parseInt(pagination.find('.page-numbers.current').text());
                var paged = pagedCurrentText + 1;
            }
        } else {
            paged = paged[0];
        }
        var formdata = $this.closest('form').serialize();
        var processing = $this.closest('#monaPostsList');
        getPostListPaged(true, form, formdata, processing, 'reload', paged)
    });
    $(document).on('change', '.mona-change-value', function (e) {
        $(".sec-render-taxonomy").html('');
        var $this = $(this).closest('form');
        var formdata = $(this).closest('form').serialize();
        var processing = $(this).closest('form').find('#monaPostsList');
        getPostListPaged(false, $this, formdata, processing, 'reload')
    });
    function getPostListPaged(flag, $this, formdata, processing, action, paged = 1) {
        if (!processing.hasClass("loading")) {
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
                            $this.find("#monaPostsList").html(result.data.posts_html);
                            $this.find(".sec-render-taxonomy").html('');
                            $this.find(".sec-render-taxonomy").append(result.data.taxonomies_html);
                            scrollToID("#" + result.data.scroll, 500, 200);
                        } else if (
                            result.data.action_return == "loadmore" &&
                            result.data.posts_html != ""
                        ) {
                            $this.find(".monaLoadMoreJS").remove();
                            $this.find("#monaPostsList").append(result.data.posts_html);
                        }
                    }
                    processing.removeClass("loading");
                },
            });
        }
    }

    // Page cổ đông - - lv1
    $(document).on('change', '.mona-change-value-childe', function (e) {
        $(".sec-render-taxonomy-final").remove('');
        var $this = $(this).closest('form');
        var formdata = $(this).closest('form').serialize();
        var processing = $(this).closest('form').find('#monaPostsList');
        getPostListPagedChilde(false, $this, formdata, processing, 'reload');
    });
    function getPostListPagedChilde(flag, $this, formdata, processing, action, paged = 1) {
        if (!processing.hasClass("loading")) {
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
                            $this.find("#monaPostsList").html(result.data.posts_html);
                            $this.find(".sec-render-taxonomy").append(result.data.taxonomies_childe_html);
                            scrollToID("#" + result.data.scroll, 500, 200);
                        }
                    }
                    processing.removeClass("loading");
                },
            });
        }
    }

    // Page cổ đông - - lv2
    $(document).on('change', '.mona-change-value-childe-final', function (e) {
        var $this = $(this).closest('form');
        var formdata = $(this).closest('form').serialize();
        var processing = $(this).closest('form').find('#monaPostsList');
        getPostListPagedChildeFinal(false, $this, formdata, processing, 'reload');
    });
    function getPostListPagedChildeFinal(flag, $this, formdata, processing, action, paged = 1) {
        if (!processing.hasClass("loading")) {
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
                            $this.find("#monaPostsList").html(result.data.posts_html);
                            scrollToID("#" + result.data.scroll, 500, 200);
                        }
                    }
                    processing.removeClass("loading");
                },
            });
        }
    }
}