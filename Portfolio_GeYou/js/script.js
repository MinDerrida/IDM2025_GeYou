/*function of this script:

1. control loading animation
    play animation when first time opening the website.
    kill the animation when simply refreshing the page.

2. Navigation Bar Styling
    when scrolling to certain section of the page, the respective section link in the navigation bar will change style, indicating the current section in viewport

*/



//========1. loading animation control=========//

//get DOM Elements: loading div and the content inside
const loadingAnimation = document.querySelector(".loading");
const bgTop = document.querySelector("#bg-top");
const bgTopTop = document.querySelector("#bg-top-top");
const titlePortfolio = document.querySelector("#title-portfolio");
const nameLogo = document.querySelector("#name-logo");
const bgHorse = document.querySelector("#bg-horse");

//define function: set animation see; function variable: has animation played
function setAnimationSeen(){
    sessionStorage.setItem('hasAnimationPlayed', '1');
}

document.addEventListener('DOMContentLoaded', ()=>
{
  if(parseInt(sessionStorage.getItem('hasAnimationPlayed')) == 1){
    //hide the animation element
    loadingAnimation.remove();
    //let heropage animation play without waiting for the loading animation to commplete
    bgTop.style['animation-delay']='0s';
    bgTopTop.style['animation-delay']='0.5s';
    titlePortfolio.style['animation-delay']='0s';
    nameLogo.style['animation-delay']='0.1s';
    bgHorse.style['animation-delay']='0s';
  }
  else{
    //show animation element for 3 seconds then hide it
    setTimeout(() => {
            setAnimationSeen();
            loadingAnimation.style.display = 'none';
        }, 3000);
    setAnimationSeen();
  }
});


//=================2. NavBar styling===================//

// creat an array to map each section to its respective nav element
const sections = [
  { section: document.querySelector('#heropage'),    
    nav: document.querySelector('#heropage-nav') },
  { section: document.querySelector('#myworks-section'), 
    nav: document.querySelector('#myworks-section-nav') },
  { section: document.querySelector('#about-section'),   
    nav: document.querySelector('#about-section-nav') },
  { section: document.querySelector('#contact-section'), 
    nav: document.querySelector('#contact-section-nav') },
];

// Create the observer for intersection
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {

    const target = sections.find(items => items.section === entry.target);
    if (!target) return; 
    //check if entry mateches certain object's section property
    if (entry.isIntersecting) {
      target.nav.classList.add('nav-active');//yes, add an "nav-active" css class to the nav element
    } else {
      target.nav.classList.remove('nav-active');//no, remove "nav-active" css class if there is one
    }
  });
}, { threshold: 0.3 });

// Observe all sections objects
sections.forEach(s => observer.observe(s.section));
