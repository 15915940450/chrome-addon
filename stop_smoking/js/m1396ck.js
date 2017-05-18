Array.prototype.howManyNums=function(num){
  this.sort();
  if(this.indexOf(num)===-1){
    return 0;
  }else{
    return this.lastIndexOf(num)-this.indexOf(num)+1;
  }
};
function ajaxGET(url,callback,err){
  var xmlhttp=new XMLHttpRequest();
  xmlhttp.onreadystatechange=function(){
    if(xmlhttp.readyState===4 && xmlhttp.status===200){
      callback(xmlhttp.responseText);
    }else if(xmlhttp.readyState===4 && xmlhttp.status!=200 && err){
      err();
    }
  };
  xmlhttp.open('GET',url,true);
  xmlhttp.send();
}
//==echarts:es
function es(h,g,f,d){var c=document.getElementById(h);var b=echarts.init(c,"infographic");var a={legend:{data:g},tooltip:{trigger:"item",},grid:{top:"18%",left:"1%",right:"1%",containLabel:true},toolbox:{show:false,orient:"vertical",x:"right",y:"center",feature:{mark:{show:true},dataView:{show:true,readOnly:false},magicType:{show:true,type:["line","bar","stack","tiled"]},restore:{show:true},saveAsImage:{show:true}}},calculable:true,xAxis:[{type:"category",data:f}],yAxis:[{type:"value"}],series:d,dataZoom:[{type:"slider",show:false,xAxisIndex:[0],start:0,end:100}]};b.setOption(a)};


var eleTmp=document.getElementById('tmp');
var eleTbody=document.querySelector('#tmp table tbody');
ajaxGET('http://m.1396ck.com/stat/5?client_lang=zh-tw&year=2017',function(data){

  if(data){
    var objData=JSON.parse(data);
    var arrData=objData.items;
    var arrTr=[];
    var arrTd=[];
    var arrWeek=['日','一','二','三','四','五','六'];
    var arrTe=[];
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
      arrTe.push(Number(arrData[i].numbers.slice(-2)));
    }

    var arrLegend=["特"];
    var arrX=[];
    var arrYseries=[];
    var arrY=[];
    for(var l=0;l<arrLegend.length;l++){
    	arrY.push([]);
    }
    for(var i=1;i<=49;i++){
      arrX.push(i);
      arrY[0].push(arrTe.howManyNums(i));
    }
    for(var j=0;j<arrLegend.length;j++){
    	var tmp={
    			name:arrLegend[j],
    			type:'bar',
    			data:arrY[j]
    	};
    	arrYseries.push(tmp);
    }
    es('m',arrLegend,arrX,arrYseries);
    eleTbody.innerHTML=arrTr.join('');
  }else{
    eleTmp.innerHTML="無數據";
  }
},function(){
  alert('ajax fail');
});
