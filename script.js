/* ===== Shivani Jaiswal portfolio: vanilla JS ===== */
(function(){
'use strict';
var $=function(s,c){return(c||document).querySelector(s)},$$=function(s){return[].slice.call(document.querySelectorAll(s))};
var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
/* Loader */
window.addEventListener('load',function(){var l=$('#load');l.style.opacity=0;setTimeout(function(){l.remove()},500)});
/* Theme (remembered, falls back safely) */
var root=document.documentElement;
try{var t=localStorage.getItem('theme');if(t)root.dataset.theme=t}catch(e){}
$('#theme').onclick=function(){var n=root.dataset.theme==='dark'?'light':'dark';root.dataset.theme=n;try{localStorage.setItem('theme',n)}catch(e){}};
/* Mobile menu */
$('#menu').onclick=function(){$('#links').classList.toggle('open')};
$$('#links a').forEach(function(a){a.onclick=function(){$('#links').classList.remove('open')}});
/* Typing animation */
var words=['Teaching programming with a problem-solving focus','Researching AI for medical imaging','Building machine learning projects in Python'],wi=0,ci=0,del=false,el=$('#type');
function type(){var w=words[wi];if(reduce){el.textContent=w;return}
el.textContent=w.slice(0,del?--ci:++ci);var d=del?30:60;
if(!del&&ci===w.length){del=true;d=1600}else if(del&&ci===0){del=false;wi=(wi+1)%words.length;d=400}
setTimeout(type,d)}type();
/* Scroll: progress, back-to-top, active link */
var secs=$$('main section[id]'),links=$$('#links a');
function onScroll(){var h=document.documentElement,max=h.scrollHeight-h.clientHeight;
$('#prog').style.width=(max?h.scrollTop/max*100:0)+'%';$('#top').classList.toggle('show',h.scrollTop>600);
var cur='';secs.forEach(function(s){if(s.getBoundingClientRect().top<120)cur=s.id});
links.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+cur)})}
addEventListener('scroll',onScroll,{passive:true});onScroll();
$('#top').onclick=function(){scrollTo({top:0,behavior:reduce?'auto':'smooth'})};
/* Reveal + counters */
function count(e){var n=+e.dataset.n,i=0;(function s(){i++;e.textContent=Math.round(n*i/30);if(i<30)setTimeout(s,35)})()}
var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');$$('[data-n]',x.target);
[].slice.call(x.target.querySelectorAll('[data-n]')).forEach(count);io.unobserve(x.target)}})},{threshold:.15});
$$('.rv').forEach(function(e){io.observe(e)});
/* Ripple on buttons */
$$('.btn').forEach(function(b){b.addEventListener('click',function(ev){var r=b.getBoundingClientRect(),s=Math.max(r.width,r.height),sp=document.createElement('span');
sp.className='ripple';sp.style.cssText='width:'+s+'px;height:'+s+'px;left:'+(ev.clientX-r.left-s/2)+'px;top:'+(ev.clientY-r.top-s/2)+'px';b.appendChild(sp);setTimeout(function(){sp.remove()},600)})});
/* Contact form: opens the visitor's email app (no server needed) */
$('#form').onsubmit=function(ev){ev.preventDefault();
location.href='mailto:jaiswalshivani1909@gmail.com?subject='+encodeURIComponent('Portfolio enquiry from '+$('#n').value)+'&body='+encodeURIComponent($('#m').value+'\n\nFrom: '+$('#e').value)};
$('#yr').textContent=new Date().getFullYear();
})();