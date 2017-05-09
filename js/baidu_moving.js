var eleSu=document.getElementById('su');
eleSu.onmouseover=function(ev){
  var leftRnd = (Math.random()-0.5)*20;
  var topRnd = (Math.random()-0.5)*20;
  var btnLeft = ev.clientX+(leftRnd>0?100:-100)+leftRnd;
  var btnTop = ev.clientY+(topRnd>0?30:-30)+topRnd;
  btnLeft = btnLeft<100?(btnLeft+window.innerWidth-200):(btnLeft>window.innerWidth-100?btnLeft-window.innerWidth+200:btnLeft);
  btnTop =  btnTop<100?( btnTop+window.innerHeight-200):(btnTop>window.innerHeight-100?btnTop-window.innerHeight+200:btnTop);
  eleSu.style.position = 'fixed';
  eleSu.style.left = btnLeft+'px';
  eleSu.style.top = btnTop+'px';
};
