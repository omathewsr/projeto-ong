
document.addEventListener('DOMContentLoaded', ()=>{
  if('IntersectionObserver' in window){
    const io = new IntersectionObserver((entries, obs)=>{
      entries.forEach(en=>{
        if(en.isIntersecting){
          const img = en.target;
          if(img.dataset.src){
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          io.unobserve(img);
        }
      });
    }, {rootMargin: "50px"});
    document.querySelectorAll('img[data-src]').forEach(i=> io.observe(i));
  }
});
