//Demo

layui.use(['form','laydate','table','jquery','laypage','layer','element'], function(){
  
  var form = layui.form;
  var laydate = layui.laydate;
  var table = layui.table;
  var laypage = layui.laypage;
  var layer= layui.layer;
 
    var element = layui.element;var firstTag = true;
  //示例日期
  var objData = {
      elem:'#timeInstar',
      type:'date'
  }
  var objDataend = {
      elem:'#timeInend',
      type:'date'
  }
  
  
  //示例两个日期结束
  //添加校验
  form.verify(verify);  

   //监听提交
   form.on('submit(formQuery)', function(data){
       //被执行提交的form对象，一般在存在form标签时才会返回
      ftpSave(data.field)
      return false;
  });
  
  init();
  function init(){
    var obj = {};
    publicFun.ajax(url.inventoryDirectory.zhuanCunInit,common.type,obj,success);
    function success(data){
      if(data.code==0){
        dataInit(data.data)
      }
    }
   
  }
  function dataInit(data){

      var ftp_to_ip_1 = ''
      var ftp_to_ip_2 = ''; 
     
      var str = '';
      var str1 = '';
       console.log(data)

      $.each(data.uploadList,function(i,o){
         
        if(o == data.tempArray[0]){
          str = 'selected'
           
        }else{
          str = ''
        }
         
        ftp_to_ip_1+='<option value="'+o.TEXTFIELD+'" '+str+'>'+o.TEXTFIELD+'</option>'
         
      })
      $.each(data.uploadWrongList,function(i,o){
        
         
        if(o.TEXTFIELD == data.tempWrongArray[0]){
          str1 = 'selected'
          
        }else{
          str1 = ''
        }
         
        ftp_to_ip_2+='<option value="'+o.TEXTFIELD+'" '+str1+'>'+o.TEXTFIELD+'</option>'
      })
      //ftp_to_ip_1:"",ftp_to_ip_2:"",ftp_from_ip_1:"",ftp_from_ip_2:""
      $(".ftp_to_ip_1").html(ftp_to_ip_1);
      $(".ftp_from_ip_1").html(ftp_to_ip_2)
     
      form.render();
  }
  function ftpSave(data){
    data.ftp_to_ip_2 = data.ftp_to_ip_1
    data.ftp_from_ip_2 = data.ftp_from_ip_1
    publicFun.ajax(url.inventoryDirectory.zhuanCunSave,common.type,data,success);
    function success(data){
      if(data.code==0){
        layer.msg("保存成功")
      }else{
        layer.msg("保存失败")
      }
    }
      
     
      
  }
   
});