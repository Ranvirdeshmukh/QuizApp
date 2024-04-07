gsap.registerPlugin(ScrollTrigger);

let tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".quiz-intro",
        start: "top top",
        end: "bottom bottom",
        scrub: true
    }
});

tl.from(".quiz-poster", {y: 0, scale: 1})
  .to(".quiz-poster", {y: -100, scale: 1.1}, 0) // Adjust values as needed
  .from("p", {y: 0, opacity: 1}, 0)
  .to("p", {y: -50, opacity: 0}, 0); // Fade out effect as you scroll
