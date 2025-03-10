const headerMenuButton = document.querySelector(".header-menu-button");  
const navList = document.querySelector(".nav-list");  
const mobileMenuContainer = document.querySelector(".mobile-menu-container");  
const mobileMenuButton = document.querySelector('.mobile-menu-button');  
const mobileMenuCloseButton = document.querySelector('.mobile-menu-close-button');  
const mobileMenuNav = document.querySelector('.mobile-menu-nav');   
const navLinks = document.querySelectorAll('.mobile-menu-nav .nav-link'); // Все ссылки в мобильном меню
const orderButtonMobile = document.querySelector('.order-button-mobile-menu'); // Кнопка "Order the project" в мобильном меню


// Функция для открытия мобильного меню  
function doOpenMenu() {  
  mobileMenuContainer.classList.add("show"); // Показываем меню  
  document.body.classList.add("ModalBodyLock"); // Блокируем прокрутку страницы  
}  

// Функция для закрытия мобильного меню  
function doCloseMenu() {  
  mobileMenuContainer.classList.remove("show"); // Скрываем меню  
  document.body.classList.remove("ModalBodyLock"); // Разблокируем прокрутку страницы  
}  

// Обработчик для кнопки основного меню  
headerMenuButton.addEventListener("click", (event) => {  
  event.preventDefault();  
  if (navList.classList.contains("menu-visible")) {  
    navList.classList.remove("menu-visible");  
    return;  
  }  
  navList.classList.add("menu-visible");  
});  

// Обработчик клика по пустой области для закрытия меню  
document.addEventListener("click", (event) => {  
    const isClickInsideMenu = mobileMenuContainer.contains(event.target) || headerMenuButton.contains(event.target);  
    if (!isClickInsideMenu && navList.classList.contains("menu-visible")) {  
        navList.classList.remove("menu-visible"); // Закрываем меню, если клик вне меню  
    }  
  });

// Обработчик для кнопки открытия мобильного меню  
mobileMenuButton.addEventListener("click", doOpenMenu);  

// Обработчик для кнопки закрытия мобильного меню  
mobileMenuCloseButton.addEventListener("click", doCloseMenu);  

// Обработка кликов по ссылкам в мобильном меню  
navLinks.forEach(link => {  
  link.addEventListener("click", (event) => {  
    doCloseMenu(); // Закрываем меню при нажатии на ссылку  
    const targetId = link.getAttribute("href"); // Получаем ID секции из href  
    const targetSection = document.querySelector(targetId); // Находим секцию  

    if (targetSection) {  
      targetSection.scrollIntoView({ behavior: "smooth" }); // Прокручиваем к секции  
    }  
  });  
});  

orderButtonMobile.addEventListener("click", (event) => {  
  doCloseMenu(); // Закрываем меню  
  const targetSection = document.querySelector("#work-together"); // Находим секцию  

  if (targetSection) {  
    targetSection.scrollIntoView({ behavior: "smooth" }); // Прокручиваем к секции  
  }  
}); 
