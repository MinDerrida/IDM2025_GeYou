function waitFor(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchSlides(){
    const res = await fetch('slide.json');
    const slides = await res.json();

while (true){
    for(let i = 0; i < slides.length; i++){
        const slide = slides[i];
        const img = slide.imgUrl;
        const title = slide.title;
        const artist=slide.artist;

        displaySlide(img, title, artist);

        await waitFor(3000);
    }
        
}}

function displaySlide(img, title, artist){
    document.body.style.backgroundImage = `url(${img})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    const h1 = document.querySelector('h1').innerText = title;
    const p = document.querySelector('p');
    h1.innerText = title;
    p.innerText = artist;
}

// start when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    fetchSlides().catch(err => console.error('Failed to load slides', err));
}); 


