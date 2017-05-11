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

var eleTmp=document.getElementById('tmp');
var eleTbody=document.querySelector('#tmp table tbody');
ajaxGET('http://m.1396ck.com/stat/5?client_lang=zh-tw&year=2017',function(data){
  if(data){
    var objData=JSON.parse(data);
    var arrData=objData.items;
    var arrTr=[];
    var arrTd=[];
    var arrWeek=['日','一','二','三','四','五','六'];
    for(var i=0;i<arrData.length;i++){
      var arrYMD=arrData[i].period.split(/[\u4e00-\u9fa5]/ig);  //匹配中文[\u4e00-\u9fa5]
      // var numY=Number(arrData[i].period.substring(0,4));
      // var numM=Number(arrData[i].period.substring(5,7))-1;
      // var numD=Number(arrData[i].period.substring(8,10));
      var datePeriod=new Date(Number(arrYMD[0]),(Number(arrYMD[1])-1),Number(arrYMD[2]));  //var birthday = new Date(1995, 11, 17);
      // alert(datePeriod);
      arrTd[0]='<td>星期'+arrWeek[datePeriod.getDay()]+'</td>';
      arrTd[1]='<td>'+arrData[i].period+'</td>';
      arrTd[2]='<td>'+arrData[i].numbers.slice(-2)+'</td>';
      arrTd[3]='<td>'+arrData[i].sx.slice(-1)+'</td>';
      arrTd[4]='<td>'+arrData[i].wx.slice(-1)+'</td>';
      var strTr='<tr>'+arrTd.join('')+'</tr>';
      arrTr.push(strTr);
    }
    eleTbody.innerHTML=arrTr.join('');
  }else{
    eleTmp.innerHTML="無數據";
  }
});
