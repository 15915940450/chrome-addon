function ajaxGET(url,callback){
  var xmlhttp=new XMLHttpRequest();
  xmlhttp.onreadystatechange=function(){
    if(xmlhttp.readyState===4 && xmlhttp.status===200){
      callback(xmlhttp.responseText);
    }
  };
  xmlhttp.open('GET',url,true);
  xmlhttp.send();
}

ajaxGET('http://sneezryworks.sinaapp.com/ip.php',function(data){
  document.getElementById('ip_div').innerHTML=data;
});
