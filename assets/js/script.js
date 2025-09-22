let textCore = document.getElementById('textCore');
let sky = document.getElementById('sky');
let grass1 = document.getElementById('grass1');
let grass2 = document.getElementById('grass2');
let tree1 = document.getElementById('tree1');
let tree2 = document.getElementById('tree2');
let run = document.getElementById('run');

window.addEventListener('scroll', () => {
    let value = window.scrollY;    
    let maxScroll = window.innerHeight; // Batasi efek parallax hanya pada viewport pertama (section parallax)
    
    if (value <= maxScroll) {
        textCore.style.transform = `translateY(${value * 0.5}px)`;
        grass1.style.transform = `translateY(${value * 0.5}px)`;
        grass2.style.transform = `translateY(${value * 0.5}px)`;
        tree1.style.transform = `translateY(${value * 0.5}px)`;
        tree2.style.transform = `translateY(${value * 0.5}px)`;
        run.style.transform = `translateX(${value * 0.5}px)`;
    }
});