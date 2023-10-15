let scrollLine = document.querySelector(".scroll-line")

let tl = gsap.timeline();

tl.from(scrollLine,{
    duration:1,
    transformOrigin:"top center",
    scaleY:0,
    repeat:-1
})