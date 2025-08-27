export default function MasonryModule() {
  $(".masonry").masonry("reloadItems");
  $(".masonry")
    .masonry({
      columnWidth: ".grid-sizer",
      gutter: ".gutter-sizer",
      itemSelector: ".item-masonry",
    })
    .on("layoutComplete", function () {
      $(this).addClass("masonry-complete");
    });
}
