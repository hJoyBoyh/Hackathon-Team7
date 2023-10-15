let btnProfil = document.querySelector("#btn-profil")
let btnSecurite = document.querySelector("#btn-compte-securite")

let userProfil = document.querySelector("#user-profil-info")
let userSecurite = document.querySelector("#user-securite-info")
userSecurite.style.display = "none"

btnProfil.addEventListener("click",()=>{
    userSecurite.style.display = "none"
    userProfil.style.display = "block"
    btnProfil.style.color = "#013B5D"
}
    
)
btnSecurite.addEventListener("click",()=>{
    userSecurite.style.display = "block"
    userProfil.style.display = "none"
    btnSecurite.style.color = "#013B5D"
}
    
)