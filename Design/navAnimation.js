let menu = document.querySelector("#menu")
let navigation = document.querySelector(".navigation")
let navSection1 = document.querySelector(".nav-section-1")
let navSection2 = document.querySelector(".nav-section-2")
let navLi = document.querySelectorAll(".nav-li")
let btnCloseMenu = document.querySelector("#close-menu")
menu.addEventListener("click",()=>{
    navigation.style.display = "flex"
    let tl = gsap.timeline()
    
    tl.from(navigation,{
        duration:1,
        transformOrigin:"right center",
        scaleX: 0
    })
    tl.to(navSection1,{
        duration:0.5,
        opacity:1
    })
    tl.to(navSection2,{
        duration:0.5,
        opacity:1
    })
    tl.from(navLi,{
        duration:0.5,
        x:150,
        opacity:0,
        stagger:0.2
    })
})
btnCloseMenu.addEventListener("click",()=>{
    
    let tl = gsap.timeline()
    
    tl.to(navigation,{
        duration:2,
        opacity:0,
        
    })
   tl.to(navigation,{
    duration:0.5,
    func:()=>{
        navigation.style.display = "none"
        navigation.style.opacity = 1
        navSection1.style.opacity = 0
        navSection2.style.opacity = 0
    }
   })
})