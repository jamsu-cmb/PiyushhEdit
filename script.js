// ================= FILTER =================

const filterButtons = document.querySelectorAll(".categories button");
const cards = document.querySelectorAll(".gallery .card");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const filter = button.dataset.filter;

        cards.forEach(card => {

            if (filter === "all" || card.classList.contains(filter)) {

                card.style.display = "block";

                setTimeout(() => {
                    card.style.opacity = "1";
                    card.style.transform = "scale(1)";
                }, 50);

            } else {

                card.style.opacity = "0";
                card.style.transform = "scale(.9)";

                setTimeout(() => {
                    card.style.display = "none";
                }, 250);

            }

        });

    });

});


// ================= LIGHTBOX =================

const lightbox = document.querySelector(".lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxTitle = document.getElementById("lightbox-title");
const lightboxCategory = document.getElementById("lightbox-category");
const lightboxDescription = document.getElementById("lightbox-description");

const images = document.querySelectorAll(".gallery img");

const closeBtn = document.querySelector(".close-lightbox");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let currentIndex = 0;

function showImage(index){

    const img = images[index];

    lightboxImg.style.opacity = "0";
    setImagePosition(50);

    setTimeout(()=>{

        lightboxImg.src = img.src;

        lightboxTitle.textContent = img.dataset.title;

        lightboxCategory.textContent = img.dataset.category;

        lightboxDescription.textContent = img.dataset.description;

        lightboxImg.style.opacity = "1";

    },200);

}

images.forEach((img,index)=>{

    img.addEventListener("click",()=>{

        currentIndex = index;

        showImage(currentIndex);

        lightbox.classList.add("active");

        document.body.style.overflow = "hidden";

    });

});

closeBtn.addEventListener("click",()=>{

    lightbox.classList.remove("active");

    document.body.style.overflow = "auto";

});

nextBtn.addEventListener("click",()=>{

    currentIndex++;

    if(currentIndex >= images.length){

        currentIndex = 0;

    }

    showImage(currentIndex);

});

let imagePositionY = 50;
let isDraggingImage = false;
let startY = 0;
let startPositionY = 50;

function setImagePosition(y){
    imagePositionY = Math.max(0, Math.min(100, y));
    lightboxImg.style.objectPosition = `center ${imagePositionY}%`;
}

function stopImageDrag(){
    isDraggingImage = false;
    lightboxImg.classList.remove("dragging");
}

lightboxImg.addEventListener("pointerdown", (e)=>{
    isDraggingImage = true;
    startY = e.clientY;
    startPositionY = imagePositionY;
    lightboxImg.classList.add("dragging");
    lightboxImg.setPointerCapture(e.pointerId);
});

lightboxImg.addEventListener("pointermove", (e)=>{
    if(!isDraggingImage) return;

    const moveAmount = e.clientY - startY;
    setImagePosition(startPositionY - moveAmount / 4);
});

lightboxImg.addEventListener("pointerup", stopImageDrag);
lightboxImg.addEventListener("pointercancel", stopImageDrag);
lightboxImg.addEventListener("lostpointercapture", stopImageDrag);
window.addEventListener("blur", stopImageDrag);

lightbox.addEventListener("click", (e)=>{
    if(e.target === lightbox){
        lightbox.classList.remove("active");
        document.body.style.overflow = "auto";
        stopImageDrag();
    }
});

document.addEventListener("keydown", (e)=>{
    if(!lightbox.classList.contains("active")) return;

    if(e.key === "Escape"){
        lightbox.classList.remove("active");
        document.body.style.overflow = "auto";
        stopImageDrag();
    }

    if(e.key === "ArrowRight"){
        nextBtn.click();
    }

    if(e.key === "ArrowLeft"){
        prevBtn.click();
    }
});

document.addEventListener("mousemove", (e)=>{
    if(!isDraggingImage) return;

    const moveAmount = e.clientY - startY;
    setImagePosition(startPositionY + moveAmount / 4);
});

document.addEventListener("mouseup", ()=>{
    isDraggingImage = false;
    lightboxImg.classList.remove("dragging");
});

document.addEventListener("keydown",(e)=>{
    lightbox.addEventListener("click",(e)=>{

    if(e.target === lightbox){

        lightbox.classList.remove("active");

        document.body.style.overflow="auto";

    }

});

    if(!lightbox.classList.contains("active")) return;

    if(e.key === "Escape"){

        lightbox.classList.remove("active");

        document.body.style.overflow = "auto";

    }

    if(e.key === "ArrowRight"){

        nextBtn.click();

    }

    if(e.key === "ArrowLeft"){

        prevBtn.click();

    }

});

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
const overlay = document.getElementById("overlay");

function toggleMenu() {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("no-scroll");
}

hamburger.addEventListener("click", toggleMenu);
overlay.addEventListener("click", toggleMenu);

// Optional: close menu when clicking a link
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", toggleMenu);
});

/*==========================
LIGHTBOX
==========================*/

const galleryImages = document.querySelectorAll(".gallery-card img");

const lightbox = document.getElementById("lightbox");

const lightboxImg = document.getElementById("lightbox-img");

const closeLightbox = document.querySelector(".close-lightbox");

galleryImages.forEach(img=>{

    img.addEventListener("click",()=>{

        lightbox.classList.add("active");

        lightboxImg.src=img.src;

    });

});

closeLightbox.addEventListener("click",()=>{

    lightbox.classList.remove("active");

});

lightbox.addEventListener("click",(e)=>{

    if(e.target===lightbox){

        lightbox.classList.remove("active");

    }

});

// ===============================
// Active Navbar
// ===============================

const currentPage = window.location.pathname.split("/").pop() || "index.html";

document.querySelectorAll(".nav-links a").forEach(link => {
    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {
        link.classList.add("active");
    }
});

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if(window.scrollY > 300){
        backToTop.classList.add("show");
    }else{
        backToTop.classList.remove("show");
    }

});

backToTop.addEventListener("click", () => {

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

});