// CONSTANTES

//flocons
const NB_IMG_FLOCON = 3;
const RAY_FLOCON = 10;
const FLOC_SPEEDMIN = 1;

//barres de compétences
const PROGRESSVAL = ["90", "85", "75", "75", "80", "100", "92", "45"];

const HEHETXT = ["Do not click", "No really please do not click !", "What are you doing ?", "Sight... You were warned", "Yeah I know you know it's a rickroll"]

// SCRIPT
document.addEventListener("DOMContentLoaded", function() {

    let html = document.querySelector("html")
    let body = document.querySelector("body")
    let h1 = document.querySelector("h1")
    let canvas = document.querySelector("canvas")
    let c = canvas.getContext("2d")

    // let content = document.querySelector(".content")
    // console.log(content)

    // le total des 8 divs qui contiennent les infos du protfolio
    let wexp = document.querySelector("#w_exp")
    let uproj = document.querySelector("#univ_proj")
    let form = document.querySelector("#form")
    let qual = document.querySelector("#qual")
    let pdata = document.querySelector("#pdata")
    let hobb = document.querySelector("#hobb")
    let lang = document.querySelector("#lang")
    let ref = document.querySelector("#ref")

    let secWexp = document.querySelector("#sec_w_exp")
    let secUProj = document.querySelector("#sec_univ_proj")
    let secForm = document.querySelector("#sec_form")
    let secQual = document.querySelector("#sec_qual")
    let secLang = document.querySelector("#sec_lang")
    let secRef = document.querySelector("#sec_ref")
    let secHobb = document.querySelector("#sec_hobb")
    let persData = document.querySelector("#perso_data")
    let mySelf = document.querySelector("#img_moi")
    let imgMe = document.querySelector("#img_me")
    let imgHit = document.querySelector("#hitbox")
    let pdf = document.querySelector("#pdf")
    let bToTop = document.querySelectorAll(".back_to_top")

    let qualCont = document.querySelector("#qual_content")
    let langCont = document.querySelector("#lang_content")
    let skillBar = document.querySelectorAll(".skillBar")

    let hehetxt = 0;

    //script des flocons
    setInterval(function() {
        
        let move = 10
        let speed = getRandomInt(2) + FLOC_SPEEDMIN;
        
        let flocon = create("div", body, null, "flocon")

        //finallement je préfère faire des simples div pour que ça rame moins
        // flocon.src="images/flocon_"+getRandomInt(NB_IMG_FLOCON)+".png"

        floWidth = getRandomInt(NB_IMG_FLOCON)
        flocon.style.height = RAY_FLOCON + "px"
        flocon.style.width = RAY_FLOCON + "px"

        flocon.style.top = move + "px";
        flocon.style.left = 5 + getRandomInt(window.innerWidth - 40)+"px"

        setInterval(function() {

            move += speed;
            flocon.style.top = move + "px";
            if (move>canvas.scrollHeight-15){

                flocon.remove()
            }

        }, 10)

    }, 200)



//Barres de progress
window.addEventListener("scroll", function(){
    if(isInViewport(qualCont) || isInViewport(langCont)) {
        skillBar.forEach((element, i) => {
            element.querySelector("span").style.width = PROGRESSVAL[i]/3 + "%"
        })
    }
    else{
        skillBar.forEach(element => {
            element.querySelector("span").style.width = 5 + "%"
        })
    }
})





//Ici on s'occupe des boutons du home

    document.addEventListener("keydown", (event) => {
        if (event.key == "Escape")
            persData.classList.remove("show")
            persData.classList.add("hide")
    }) 

    imgHit.addEventListener("mouseenter", function() {
        let txt = create("h2", mySelf, HEHETXT[hehetxt])
        imgMe.style.filter = "brightness(50%)"

    })

    imgHit.addEventListener("click", function() {
        let txt = mySelf.querySelector("h2")
        console.log(txt)

        if(hehetxt == 4) {
            hehetxt = 0;
            let rick = create("img", persData, null, "rick")
            rick.src = "images/rickroll.gif"

            rick.addEventListener("click", function() {
                rick.remove()
            })

            document.addEventListener("keydown", (event) => {
                rick.remove()
            })
        }
        else {
            hehetxt ++;
        }

        txt.remove()
        let newtxt = create("h2", mySelf, HEHETXT[hehetxt])

    })

    imgHit.addEventListener("mouseleave", function() {
        let txt = mySelf.querySelector("h2")
        imgMe.style.filter = "none"
        txt.remove()
    })

    //boutons latéraux
    pdata.addEventListener("click", function() {
        persData.classList.toggle("show");

    })

    //changement de couleurs
    wexp.addEventListener("mouseenter", function() {
        setElementColor("h2", wexp, "brown")
    })

    uproj.addEventListener("mouseenter", function() {
        setElementColor("h2", uproj, "brown")
    })

    form.addEventListener("mouseenter", function() {
        setElementColor("h2", form, "brown")
    })

    qual.addEventListener("mouseenter", function() {
        setElementColor("h2", qual, "brown")
    })

    hobb.addEventListener("mouseenter", function() {
        setElementColor("h2", hobb, "brown")
    })

    lang.addEventListener("mouseenter", function() {
        setElementColor("h2", lang, "brown")
    })

    ref.addEventListener("mouseenter", function() {
        setElementColor("h2", ref, "brown")
    })

    //envoi à la bonne section
    wexp.addEventListener("click", function() {
        secWexp.scrollIntoView({behavior: "smooth"})
    })

    uproj.addEventListener("click", function() {
        secUProj.scrollIntoView({behavior: "smooth"})
    })

    form.addEventListener("click", function() {
        secForm.scrollIntoView({behavior: "smooth"})
    })

    qual.addEventListener("click", function() {
        secQual.scrollIntoView({behavior: "smooth"})
    })

    hobb.addEventListener("click", function() {
        secHobb.scrollIntoView({behavior: "smooth"})
    })

    lang.addEventListener("click", function() {
        secLang.scrollIntoView({behavior: "smooth"})
    })

    ref.addEventListener("click", function() {
        secRef.scrollIntoView({behavior: "smooth"})
    })
    
    bToTop.forEach((element, i) => {
        element.addEventListener("click", function() {
            html.scrollIntoView({behavior: "smooth"})
        })
    })
})


// retourne un entier naturel compris entre 0 et la valeur passée en paramètre -1
function getRandomInt(max) {

    return Math.floor(Math.random() * max);
    
}

// applique une couleur placée en paramètre à un élément dont le tag et le parent ont été passés en paramètre
function setElementColor(tag, parent, color) {
    let element = parent.querySelector(tag) 
        element.style.color = color
}

// crée un élément dont la nature, le parent, le texte et la classe sont passés en paramètre.
// le texte et la classe sont facultatifs
function create(tag, parent, text=null, classs=null) {

	let element = document.createElement(tag)
	if (text)
		element.appendChild(document.createTextNode(text))
	if (classs)
		element.classList.add(classs)
	parent.appendChild(element)
	return element

}

function isInViewport(element) {
    let rect = element.getBoundingClientRect();
    
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function download(filename, textInput) {

    let element = document.createElement('a');
    element.setAttribute('href','data:text/plain;charset=utf-8, ' + encodeURIComponent(textInput));
    element.setAttribute('download', filename);
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}