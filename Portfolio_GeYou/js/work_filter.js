/*function of this script:

1. control filter button behaviour on the "works" section
    select among "all" "3d design" "motion graphics" "graphic designs" "web design"

2. presenting a small window of the work when its thumbnail is clicked
    this part is included in the function of showWorks, varied between image work and video work
*/

//========1. control filter button behaviour=========//

//===============get JSON: my work items
let worksItems = [];
fetch("assets/data/works.json")//not working: ../data/works.json
  .then(res=>res.json())
  .then(data=>{
    worksItems = data;
    showWorks('all');
  });

//===============get DOM Elements: filter-buttons, gallery div and small presenting window
const filterButtons = document.querySelectorAll('.F-button');
const galleryContainer =document.getElementById('gallery');
let currentFilter='all';//default filter: all
const pWindow = document.getElementById('Presenting-window');

//get elements of presenting work in HTML
const pWorkType = document.getElementById('P-work-type');
const pWorkTitle = document.getElementById('P-work-title');
const pSkillTag = document.getElementById('P-skill-tag');
const pWorkItem = document.getElementById('P-work-item');
const pDes = document.getElementById('description');
const blurPage = document.getElementById('blur-effect');

//===========mapping abbreviated form of object type property to full form
const typeDisplayNames = {
  'MG': 'Motion Graphics',
  '3D': '3D Design',
  'GD': 'Graphic Design',
};


//===============define showWorks function: filter according to button clicked; variable: filter type
function showWorks(filter = 'all'){
    currentFilter=filter;
    galleryContainer.innerHTML='';
    const visible = worksItems
      .filter(item=> filter === 'all' || item.type === filter)//filter according to button
      .sort((a,b) => (a.order ?? Infinity) - (b.order ?? Infinity))//display workItems according to order

    // show filtered items
    visible.forEach((item,i) =>{

    // creating html elements for work wrapper
    const workItem = document.createElement('div');// creating big wrapper
    workItem.classList.add('work-item');//connect with css

    workItem.style.animationDelay = `${i * 0.12}s`;//adding showing up animation
    workItem.classList.add('stagger-in');//connect with css

    galleryContainer.appendChild(workItem);//add big wrapper to gallery container

    const workWrapper = document.createElement('div');// creating small wrapper
    workWrapper.classList.add('work-wrapper');//connect with css
    workItem.appendChild(workWrapper);//add small wrapper inside big wrapper

    let cover = null;

    //===============for video works===============
    if (item.mediaType === 'video') {
      //============video cover in gallery
      cover = document.createElement('video');
      cover.src = item.workSrc || '';//linking to work file
      cover.muted = true;
      cover.poster = item.coverSrc || '';//linking to cover file
      cover.loop = true;
      cover.disablePictureInPicture = true;
      workWrapper.appendChild(cover);//add cover to small wrapper
      
      //============autoplay on hover; back to start when mouse leaves
      workWrapper.addEventListener('pointerenter', () => cover.play().catch(()=>{}));
      workWrapper.addEventListener('pointerleave', () => { cover.pause(); cover.currentTime = 0; cover.load();});

      //=============2. presenting a small detail window when clicked (video)
      workWrapper.addEventListener('click', () => {
        // clear previous detail content
        pSkillTag.innerHTML = '';
        pWorkItem.innerHTML = '';
        pDes.innerText = '';
        pWindow.style.animationName = 'none';

        pWorkType.innerText = typeDisplayNames[item.type] || item.type;//show work type: motion graphics or 3D....
        pWorkTitle.innerText = item.title;//show work title

        (item.skillTag || []).forEach((tag) => {
          const sTag = document.createElement('div');
          sTag.classList.add('S-tag');
          sTag.innerText = tag || '';
          pSkillTag.appendChild(sTag);
        });//show skill tags: adobe illustrator, blender,....

        // create a video element for the detail view
        const detailVideo = document.createElement('video');
        detailVideo.src = item.workSrc || '';//add work src
        detailVideo.controls = true;//can control video play
        detailVideo.autoplay = false;//no autoplay
        detailVideo.muted = false;//muted as in default
        detailVideo.poster = item.coverSrc || '';//use cover picture as preview image
        pWorkItem.appendChild(detailVideo);//add to the presenting window

        pDes.innerText = item.des || '';//add work description

        blurPage.style.visibility = 'visible';//blur the background
        pWindow.style.animationName = 'fadeIn';//add animation
        pWindow.style.visibility = 'visible';//show the presenting window
        blurPage.addEventListener('click', closeDetail);//click places outside of the presenting window to close it
      });
    
    //==========for image works
    } else if (item.mediaType === 'image') {
      //==============image cover in gallery
      cover = document.createElement('img');
      cover.src = (item.workSrc && item.workSrc[0]) || '';//linking to work file
      cover.alt = (item.alt && item.alt[0]) || '';//adding alt text
      workWrapper.appendChild(cover);//add cover to small wrapper
      
      //==============2. presenting a small detail window when clicked (image)
      workWrapper.addEventListener('click', () => {
        // clear previous detail content
        pSkillTag.innerHTML = '';
        pWorkItem.innerHTML = '';
        pDes.innerText = '';

        pWorkType.innerText = typeDisplayNames[item.type] || item.type;//show work type: motion graphics or 3D....
        pWorkTitle.innerText = item.title;//show work title


        (item.skillTag || []).forEach((tag) => {
          const sTag = document.createElement('div');
          sTag.classList.add('S-tag');
          sTag.innerText = tag || '';
          pSkillTag.appendChild(sTag);
        });

        // append one or multiple images to the detail container
        if (Array.isArray(item.workSrc) && item.workSrc.length === 1) {
          const detailImg = document.createElement('img');
          detailImg.src = item.workSrc[0];
          detailImg.alt = item.alt && item.alt[0] || '';
          pWorkItem.appendChild(detailImg);
        } else if (Array.isArray(item.workSrc)) {
          item.workSrc.forEach((src, index) => {
            const detailImg = document.createElement('img');
            detailImg.src = src;
            detailImg.alt = (item.alt && item.alt[index]) || '';
            pWorkItem.appendChild(detailImg);
          });
        }
        pDes.innerText = item.des || '';
        pWindow.style.visibility = 'visible';
        pWindow.style.animationName = 'fadeIn';
        blurPage.style.visibility = 'visible';
        blurPage.addEventListener('click', closeDetail);
      });
    }

      const workTitle = document.createElement('div');//creating work title
      workTitle.classList.add('W-title');
      workTitle.innerHTML = `<p>${item.title}</p>` || '';
      workWrapper.appendChild(workTitle);
  });
};
  
//==========add event listeners to filter buttons
filterButtons.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelector('.F-button.active')?.classList.remove('active');
    btn.classList.add('active');
    const filter = btn.getAttribute('workFilter');
    showWorks(filter);
  });
});

//===============define function: close detail floating window when other area is clicked
function closeDetail(){
  // clear detail content
  pWorkType.innerText = '';
  pWorkTitle.innerText = '';
  pSkillTag.innerHTML = '';
  pWorkItem.innerHTML = '';
  pDes.innerText = '';
  //hidden blur-effect and window
  pWindow.style.visibility = 'hidden';
  pWindow.style.opacity = '0';
  pWindow.style.animationName = '';
  blurPage.style.visibility = 'hidden';
};

//=================add event listeners to close detail floating window
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && getComputedStyle(pWindow).visibility === 'visible') closeDetail();
});