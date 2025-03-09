import{S,N as B,K as I,a as p,i as d}from"./assets/vendor-BvPA-ZqM.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function r(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(o){if(o.ep)return;o.ep=!0;const s=r(o);fetch(o.href,s)}})();document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelectorAll(".faq-item");if(e.length===0)return;const n=r=>{e.forEach(i=>{const o=i.querySelector(".faq-answer"),s=i.querySelector(".toggle-btn svg");o&&o!==r&&(Object.assign(o.style,{transform:"scaleY(0)",height:"0",overflow:"hidden",paddingTop:"0",paddingBottom:"0"}),o.classList.remove("open"),s.classList.remove("rotated"))})};e.forEach(r=>{const i=r.querySelector(".faq-header"),o=r.querySelector(".faq-answer"),s=r.querySelector(".toggle-btn svg");!i||!o||!s||i.addEventListener("click",()=>{const l=o.classList.contains("open");if(n(o),l)Object.assign(o.style,{transform:"scaleY(0)",height:"0",overflow:"hidden",paddingTop:"0",paddingBottom:"0"}),o.classList.remove("open"),s.classList.remove("rotated");else{const $=o.scrollHeight+26+0;Object.assign(o.style,{transform:"scaleY(1)",height:`${$}px`,overflow:"visible",paddingTop:"26px",paddingBottom:"0px"}),o.classList.add("open"),s.classList.add("rotated")}})})});const u={prevButton:document.querySelector(".projects-btn.swiper-button-prev"),nextButton:document.querySelector(".projects-btn.swiper-button-next"),projectsBtnBox:document.querySelector(".projects-btn-box")};new S(".projects-container.swiper",{modules:[B,I],slidesPerView:1,speed:1e3,loop:!1,navigation:{nextEl:".projects-btn.swiper-button-next",prevEl:".projects-btn.swiper-button-prev"},spaceBetween:32,keyboard:{enabled:!0,onlyInViewport:!0},on:{init:b,slideChange:b}});u.projectsBtnBox.addEventListener("mousedown",e=>{e.target!==e.currentTarget&&setTimeout(()=>e.target.closest("button").blur(),0)});function b(e){e.isBeginning?u.prevButton.setAttribute("disabled","true"):u.prevButton.removeAttribute("disabled"),e.isEnd?u.nextButton.setAttribute("disabled","true"):u.nextButton.removeAttribute("disabled")}const c={reviewsList:document.querySelector(".reviews-card-list"),stubReviews:document.querySelector(".reviews-not-found"),reviewsSection:document.querySelector(".reviews"),prevButton:document.querySelector(".reviews-button.swiper-button-prev"),nextButton:document.querySelector(".reviews-button.swiper-button-next"),reviewsBtnBox:document.querySelector(".reviews-btn-box")};let x=!1,q=!1;c.reviewsBtnBox.addEventListener("mousedown",e=>{e.target!==e.currentTarget&&setTimeout(()=>e.target.closest("button").blur(),0)});const C=new S(".reviews-card-container.swiper",{modules:[B,I],slidesPerView:1,speed:1e3,navigation:{nextEl:".reviews-button.swiper-button-next",prevEl:".reviews-button.swiper-button-prev"},spaceBetween:16,breakpoints:{768:{slidesPerView:2},1440:{slidesPerView:4}},keyboard:{enabled:!0,onlyInViewport:!0},on:{slideChange:function(){F(C)}}});N().then(e=>{!e||e.length===0?(y(),q=!0):(_(e),C.update())}).catch(()=>{y(),x=!0});const A=new IntersectionObserver(D,{root:null,threshold:.2});A.observe(c.reviewsSection);async function N(){return p.defaults.baseURL="https://portfolio-js.b.goit.study/api",(await p.get("/reviews")).data}function F(e){e.isBeginning?c.prevButton.setAttribute("disabled","true"):c.prevButton.removeAttribute("disabled"),e.isEnd?c.nextButton.setAttribute("disabled","true"):c.nextButton.removeAttribute("disabled")}function W({author:e,avatar_url:n,_id:r,review:i}){return`<li class="reviews-card-item swiper-slide"
                tabindex="${r-1}"
                aria-label="review ${r}"
              >
                <img
                  class="reviews-card-image"
                  src="${n}"
                  alt="photo of ${e}"
                  width="48"
                  height="48"
                />
                <h3 class="reviews-card-heading">${e}</h3>
                <p class="reviews-card-text">${i}</p>`}function V(e){return e.map(W).join("")}function _(e){const n=V(e);c.reviewsList.innerHTML=n}function y(){c.stubReviews.classList.remove("visually-hidden")}function D(e,n){e.forEach(r=>{r.isIntersecting&&(n.disconnect(),x&&d.error({position:"topRight",message:"Server not responding, please try later"}),q&&d.info({position:"topRight",message:"We're sorry, there are no reviews yet"}))})}const z="/project-JS-Geeks/assets/sprite-BJEWnD_I.svg",t={form:document.querySelector(".js-form"),modalBackdrop:document.querySelector(".js-modal-backdrop"),modalWindow:document.querySelector(".js-modal-window"),closeModalButton:document.querySelector(".jd-modal-close-button"),emailInput:document.querySelector(".js-email"),commentInput:document.querySelector(".js-comment"),successMessage:document.querySelector(".js-success-message"),errorMessage:document.querySelector(".js-error-messasge")};t.form.addEventListener("input",K);t.form.addEventListener("submit",G);t.emailInput.addEventListener("focus",pe);t.emailInput.addEventListener("blur",k);t.emailInput.addEventListener("input",U);t.commentInput.addEventListener("input",Q);t.commentInput.addEventListener("blur",w);t.commentInput.addEventListener("blur",P);t.commentInput.addEventListener("focus",de);window.addEventListener("resize",ue);t.modalWindow.addEventListener("click",e=>{e.target.closest(".js-modal-close-button")&&v()});t.modalBackdrop.addEventListener("click",e=>{e.target===e.currentTarget&&v()});document.addEventListener("DOMContentLoaded",()=>{Y()});const H=2,J=3,m="form-storage-key";var E;let a=((E=T(m))==null?void 0:E.comment)||"";function K(e){const n=e.currentTarget.elements["user-email"].value.trim(),r=e.currentTarget.elements["user-comment"].value.trim();Z(m,{email:n,comment:r})}function Y(){const e=T(m);t.form.elements["user-email"].value=(e==null?void 0:e.email)||"",t.form.elements["user-comment"].value=(e==null?void 0:e.comment)||"",a=(e==null?void 0:e.comment)||"",w(),k()}async function G(e){e.preventDefault();const n=e.target.elements["user-email"].value.trim(),r=e.target.elements["user-comment"].value.trim();if(!n||!r){d.error({position:"topRight",message:"Please complete the field"});return}const i={email:n,comment:a};try{const o=await X(i),s=fe(o);t.modalWindow.innerHTML=s,o&&(f(),g(),ee(),e.target.reset(),localStorage.removeItem(m),a="")}catch(o){d.error({position:"topRight",message:"Something went wrong. Please, try again"}),console.log(o)}}function U(){const e=this.value,n=this.getAttribute("pattern"),i=new RegExp(n).test(this.value);if(e.length===0){f(),g(),h(),O();return}i?(ne(),g()):(f(),re())}function Q(){if(a=t.commentInput.value.trim(),a.length===0){R(),L();return}a.length<H?ae():(L(),ie())}async function X({email:e,comment:n}){const r="https://portfolio-js.b.goit.study/api/requests",i={email:e,comment:n};try{return(await p.post(r,i)).data}catch(o){console.log(o)}}function Z(e,n){const r=JSON.stringify(n);localStorage.setItem(e,r)}function T(e){const n=localStorage.getItem(e);try{return JSON.parse(n)}catch{return n}}function ee(){t.modalBackdrop.classList.add("is-open"),document.addEventListener("keydown",M),te(),h(),R()}function v(){t.modalBackdrop.classList.remove("is-open"),document.removeEventListener("keydown",M),oe()}function M(e){e.key==="Escape"&&v()}function te(){const e=window.innerWidth,n=document.documentElement.clientWidth,r=e-n;document.body.style.paddingRight=`${r}px`,document.body.style.overflow="hidden"}function oe(){document.body.style.paddingRight="",document.body.style.overflow=""}function ne(){t.successMessage.classList.remove("fade-out"),t.successMessage.classList.add("fade-in"),j()}function f(){t.successMessage.classList.remove("fade-in"),t.successMessage.classList.add("fade-out"),h()}function re(){t.errorMessage.classList.remove("fade-out"),t.errorMessage.classList.add("fade-in"),se()}function g(){t.errorMessage.classList.remove("fade-in"),t.errorMessage.classList.add("fade-out"),O(),j()}function j(){t.emailInput.style.borderColor="#3cbc81"}function h(){t.emailInput.style.borderColor=""}function se(){t.emailInput.style.borderColor="#e74a3b"}function O(){t.emailInput.style.borderColor=""}function ie(){t.commentInput.style.borderColor="#3cbc81"}function R(){t.commentInput.style.borderColor=""}function ae(){t.commentInput.style.borderColor="#e74a3b"}function L(){t.commentInput.style.borderColor=""}function ce(e,n){if(e.length>n){const r=n-J;return e.slice(0,r)+"..."}return e}function le(){const e=window.innerWidth;if(e>=320&&e<=767)return 36;if(e>=768&&e<=1440)return 30;if(e>=1440)return 44}function ue(){document.activeElement!==t.commentInput&&w()}function w(){if(!a)return;const e=le();a.length>e&&(t.commentInput.value=ce(a,e)),P()}function de(){t.commentInput.value&&(t.commentInput.value=a,me())}function P(){t.commentInput.style.color="rgba(250, 250, 250, 0.6)"}function me(){t.commentInput.style.color="#fafafa"}function k(){t.emailInput.style.color="rgba(250, 250, 250, 0.6)"}function pe(){t.emailInput.style.color="#fafafa"}function fe({title:e,message:n}){return`<button class="modal-close-button js-modal-close-button" type="submit">
            <svg class="icon-modal-close" width="24" height="24">
                 <use xlink:href="${z}#x"></use>
            </svg>
        </button>
        <h2 class="modal-title">${e}</h2>
        <p class="modal-text">${n}</p>`}
//# sourceMappingURL=index.js.map
