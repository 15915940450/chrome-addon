var eleKw=document.getElementById('kw');
document.onkeydown=function(ev){
  if(ev.keyCode===76 && ev.ctrlKey && ev.altKey && eleKw){
    eleKw.setAttribute('tabindex',"69696");
    eleKw.value="";
    eleKw.focus();
  }
};
