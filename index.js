import{S as w,N as h,K as y,a as m,i as l}from"./assets/vendor-BvPA-ZqM.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const d of n.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&i(d)}).observe(document,{childList:!0,subtree:!0});function o(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(s){if(s.ep)return;s.ep=!0;const n=o(s);fetch(s.href,n)}})();const c={prevButton:document.querySelector(".projects-btn.swiper-button-prev"),nextButton:document.querySelector(".projects-btn.swiper-button-next"),projectsBtnBox:document.querySelector(".projects-btn-box")};new w(".projects-container.swiper",{modules:[h,y],slidesPerView:1,speed:1e3,loop:!1,navigation:{nextEl:".projects-btn.swiper-button-next",prevEl:".projects-btn.swiper-button-prev"},spaceBetween:32,keyboard:{enabled:!0,onlyInViewport:!0},on:{init:g,slideChange:g}});c.projectsBtnBox.addEventListener("mousedown",e=>{e.target!==e.currentTarget&&setTimeout(()=>e.target.closest("button").blur(),0)});function g(e){e.isBeginning?c.prevButton.setAttribute("disabled","true"):c.prevButton.removeAttribute("disabled"),e.isEnd?c.nextButton.setAttribute("disabled","true"):c.nextButton.removeAttribute("disabled")}const a={reviewsList:document.querySelector(".reviews-card-list"),stubReviews:document.querySelector(".reviews-not-found"),reviewsSection:document.querySelector(".reviews"),prevButton:document.querySelector(".reviews-button.swiper-button-prev"),nextButton:document.querySelector(".reviews-button.swiper-button-next"),reviewsBtnBox:document.querySelector(".reviews-btn-box")};let B=!1,L=!1;a.reviewsBtnBox.addEventListener("mousedown",e=>{e.target!==e.currentTarget&&setTimeout(()=>e.target.closest("button").blur(),0)});const S=new w(".reviews-card-container.swiper",{modules:[h,y],slidesPerView:1,speed:1e3,navigation:{nextEl:".reviews-button.swiper-button-next",prevEl:".reviews-button.swiper-button-prev"},spaceBetween:16,breakpoints:{768:{slidesPerView:2},1440:{slidesPerView:4}},keyboard:{enabled:!0,onlyInViewport:!0},on:{slideChange:function(){j(S)}}});M().then(e=>{!e||e.length===0?(b(),L=!0):(k(e),S.update())}).catch(()=>{b(),B=!0});const E=new IntersectionObserver(P,{root:null,threshold:.2});E.observe(a.reviewsSection);async function M(){return m.defaults.baseURL="https://portfolio-js.b.goit.study/api",(await m.get("/reviews")).data}function j(e){e.isBeginning?a.prevButton.setAttribute("disabled","true"):a.prevButton.removeAttribute("disabled"),e.isEnd?a.nextButton.setAttribute("disabled","true"):a.nextButton.removeAttribute("disabled")}function I({author:e,avatar_url:t,_id:o,review:i}){return`<li class="reviews-card-item swiper-slide"
                tabindex="${o-1}"
                aria-label="review ${o}"
              >
                <img
                  class="reviews-card-image"
                  src="${t}"
                  alt="photo of ${e}"
                  width="48"
                  height="48"
                />
                <h3 class="reviews-card-heading">${e}</h3>
                <p class="reviews-card-text">${i}</p>`}function q(e){return e.map(I).join("")}function k(e){const t=q(e);a.reviewsList.innerHTML=t}function b(){a.stubReviews.classList.remove("visually-hidden")}function P(e,t){e.forEach(o=>{o.isIntersecting&&(t.disconnect(),B&&l.error({position:"topRight",message:"Server not responding, please try later"}),L&&l.info({position:"topRight",message:"We're sorry, there are no reviews yet"}))})}const R="/project-JS-Geeks/assets/sprite-BlG_KgII.svg",r={form:document.querySelector(".js-form"),modalBackdrop:document.querySelector(".js-modal-backdrop"),modalWindow:document.querySelector(".js-modal-window"),closeModalButton:document.querySelector(".jd-modal-close-button"),emailInput:document.querySelector(".js-email"),commentInput:document.querySelector(".js-comment"),successMessage:document.querySelector(".js-success-message"),errorMessage:document.querySelector(".js-error-messasge")};r.form.addEventListener("submit",T);r.emailInput.addEventListener("input",A);r.commentInput.addEventListener("blur",N);r.modalWindow.addEventListener("click",e=>{e.target.closest(".js-modal-close-button")&&v()});r.modalBackdrop.addEventListener("click",e=>{e.target===e.currentTarget&&v()});let u="";async function T(e){e.preventDefault();const t=e.target.elements["user-email"].value.trim(),o=e.target.elements["user-comment"].value.trim();if(!t||!o){l.info({message:"Please complete the field"});return}const i={email:t,comment:u};try{const s=await $(i),n=K(s);r.modalWindow.innerHTML=n,s&&(p(),f(),O(),e.target.reset())}catch(s){l.error({message:"Something went wrong. Please, try again"}),console.log(s)}}function A(){const e=this.value,o=new RegExp(this.getAttribute("pattern")).test(this.value);if(e.length===0){p(),f();return}o?(V(),f()):(p(),C())}function N(){u=r.commentInput.value;const e=r.commentInput.getAttribute("data-maxlength"),t=parseInt(e);e&&u.length>e&&(r.commentInput.value=_(u,t))}async function $({email:e,comment:t}){const o="https://portfolio-js.b.goit.study/api/requests",i={email:e,comment:t};try{return(await m.post(o,i)).data}catch(s){console.log(s)}}function O(){r.modalBackdrop.classList.add("is-open"),document.addEventListener("keydown",x),document.body.style.overflow="hidden"}function v(){r.modalBackdrop.classList.remove("is-open"),document.removeEventListener("keydown",x),document.body.style.overflow="auto"}function x(e){e.key==="Escape"&&v()}function V(){r.successMessage.classList.remove("fade-out"),r.successMessage.classList.add("fade-in")}function p(){r.successMessage.classList.remove("fade-in"),r.successMessage.classList.add("fade-out")}function C(){r.errorMessage.classList.remove("fade-out"),r.errorMessage.classList.add("fade-in")}function f(){r.errorMessage.classList.remove("fade-in"),r.errorMessage.classList.add("fade-out")}function _(e,t){if(e.length>t){const o=t-3;return e.slice(0,o)+"..."}return e}function K({title:e,message:t}){return`<button class="modal-close-button js-modal-close-button" type="submit">
            <svg class="icon-modal-close" width="24" height="24">
                 <use xlink:href="${R}#x"></use>
            </svg>
        </button>
        <h2 class="modal-title">${e}</h2>
        <p class="modal-text">${t}</p>`}
//# sourceMappingURL=index.js.map
