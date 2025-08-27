export default function SearchModule() {
  const hdSIcon = document.querySelector(".searchJS");
  const hdSForm = document.querySelector(".searchPanel");
  const searchInput = document.querySelector(".searchPanel .hd-search-ip");
  let isOpen = false;
  if (hdSIcon) {
    hdSIcon.addEventListener("click", () => {
      isOpen = !isOpen;
      if (isOpen) {
        hdSForm.classList.add("open");
        setTimeout(() => {
          searchInput.focus();
        }, 10);
      } else {
        hdSForm.classList.remove("open");
      }
    });
    window.addEventListener("click", (e) => {
      if (
        !e.target.closest(".searchJS") &&
        !e.target.closest(".hd-search-box")
      ) {
        isOpen = false;
        hdSForm.classList.remove("open");
      }
    });
    window.addEventListener("scroll", () => {
      isOpen = false;
      hdSForm.classList.remove("open");
    });
  }
}
