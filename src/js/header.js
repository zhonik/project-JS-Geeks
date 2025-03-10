const headerMenuButton = document.querySelector(".header-menu-button");  
const navList = document.querySelector(".nav-list");  
const mobileMenuContainer = document.querySelector(".mobile-menu-container");  
const mobileMenuButton = document.querySelector('.mobile-menu-button');  
const mobileMenuCloseButton = document.querySelector('.mobile-menu-close-button');  
const mobileMenuNav = document.querySelector('.mobile-menu-nav');   
const navLinks = document.querySelectorAll('.mobile-menu-nav .nav-link');
const orderButtonMobile = document.querySelector('.order-button-mobile-menu');


headerMenuButton.addEventListener("click", (event) => {  
  event.preventDefault();
  if (navList.classList.contains("menu-visible")) {
    navList.classList.remove("menu-visible");  
    return;  
  }
  navList.classList.add("menu-visible");  
});

document.addEventListener("click", (event) => {  
  const isClickInsideMenu = mobileMenuContainer.contains(event.target) || headerMenuButton.contains(event.target);  
  if (!isClickInsideMenu && navList.classList.contains("menu-visible")) {  
    navList.classList.remove("menu-visible");  
  }  
});

mobileMenuButton.addEventListener("click", doOpenMenu);  
mobileMenuCloseButton.addEventListener("click", doCloseMenu); 

function doOpenMenu() {  
  mobileMenuContainer.classList.add("show");  
  document.body.classList.add("ModalBodyLock");  
}  

function doCloseMenu() {  
  mobileMenuContainer.classList.remove("show");  
  document.body.classList.remove("ModalBodyLock");  
} 

navLinks.forEach(link => {  
  link.addEventListener("click", (event) => {  
    doCloseMenu();  
    const targetId = link.getAttribute("href");  
    const targetSection = document.querySelector(targetId);  

    if (targetSection) {  
      targetSection.scrollIntoView({ behavior: "smooth" });  
    }  
  });  
});  

orderButtonMobile.addEventListener("click", (event) => {  
  doCloseMenu();  
  const targetSection = document.querySelector("#work-together");  

  if (targetSection) {  
    targetSection.scrollIntoView({ behavior: "smooth" });  
  }  
});

