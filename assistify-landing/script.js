// Mobile menu
const menuBtn = document.getElementById('menu');
const navlinks = document.getElementById('navlinks');
menuBtn.addEventListener('click',()=>{
  navlinks.style.display = navlinks.style.display === 'flex' ? 'none' : 'flex';
});
// Smooth-scroll for on-page links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', (e)=>{
    const target = document.querySelector(a.getAttribute('href'));
    if(!target) return;
    e.preventDefault();
    target.scrollIntoView({behavior:'smooth', block:'start'});
    if(window.innerWidth<950){ navlinks.style.display='none'; }
  });
});
// Dynamic year
document.getElementById('year').textContent = new Date().getFullYear();
