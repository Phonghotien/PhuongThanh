export default function ScrollTriggerModule() {
  gsap.registerPlugin(ScrollTrigger);
  const loaderJs = document.querySelector(".loaderJs");
  const body = document.querySelector("body");
  if (loaderJs) {
    const lineProgress = loaderJs.querySelector(".line-progress");
    window.addEventListener("load", () => {
      gsap.to(lineProgress, {
        width: "100%",
        duration: 1.5,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.to(loaderJs, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
              body.classList.remove("no-scroll");
              loaderJs.style.display = "none";
            },
          });
        },
      });
    });
  }
}
