(function(){
  const progress=document.querySelector('.progress');
  const reveal=()=>document.querySelectorAll('.reveal').forEach((el,i)=>{if(el.getBoundingClientRect().top<window.innerHeight-40) setTimeout(()=>el.classList.add('show'),Math.min(i*45,360));});
  if('IntersectionObserver' in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('show');io.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>io.observe(el));}
  window.addEventListener('load',reveal);window.addEventListener('scroll',()=>{reveal();if(progress){const h=document.documentElement.scrollHeight-innerHeight;progress.style.width=(h>0?(scrollY/h)*100:0)+'%'}},{passive:true});
})();