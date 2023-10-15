let firstInfo = document.querySelector("#first-info")
let secondInfo = document.querySelector("#second-info")
let retour = document.querySelector("#return")

// btn
let btnSuivant = document.querySelector("#btn-suivant")
btnSuivant.addEventListener("click",()=>{
    console.log("haha")
    firstInfo.style.display = "none"
    secondInfo.style.display = "block"
    retour.style.display = "block"
    
})

retour.addEventListener("click",()=>{
    firstInfo.style.display = "block"
    secondInfo.style.display = "none"
    retour.style.display = "none"
})
let inscriptionTerminer = document.querySelector("#btn-terminer")

inscriptionTerminer.addEventListener("click",()=>{
    console.log("haha")
})