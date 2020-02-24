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
      publicFun.ajax(url.ftp.ftpInit,common.type,obj,success);
      function success(data){
        if(data.code==0){
          ftpInit(data.data)
        }
      }
     
    }
    function ftpInit(data){
        var ftp_to_ip_1 = ''
        var ftp_to_ip_2 = ''; 
        var ftp_to_ip_3 = ''
        var ftp_to_ip_4 = ''; 
        var str = '';
        var str1 = '';
        var str3 = '';
        var str4 = '';
       
        $.each(data.selectuploadFtp,function(i,o){
          if(o.TEXTFIELD == data.selectFtpList[0].TEXTFIELD){
            str = 'selected'
             
          }else{
            str = ''
          }
          if(o.TEXTFIELD == data.selectFtpList[1].TEXTFIELD){
            str1 = 'selected'
            
          }else{
            str1 = ''
          }
          ftp_to_ip_1+='<option value="'+o.TEXTFIELD+'" '+str+'>'+o.TEXTFIELD+'</option>'
          ftp_to_ip_2+='<option value="'+o.TEXTFIELD+'" '+str1+'>'+o.TEXTFIELD+'</option>'
        })
        console.log(data.selectFtpList[2].TEXTFIELD)
        $.each(data.selectdownFtp,function(i,o){
          if(o.TEXTFIELD == data.selectFtpList[2].TEXTFIELD){
            str3 = 'selected'
            
          }else{
            str3 = ''
          }
          if(o.TEXTFIELD == data.selectFtpList[3].TEXTFIELD){
            str4 = 'selected'
            
          }else{
            str4 = ''
          }
         
           
          ftp_to_ip_3+='<option value="'+o.TEXTFIELD+'" '+str3+'>'+o.TEXTFIELD+'</option>'
          ftp_to_ip_4+='<option value="'+o.TEXTFIELD+'" '+str4+'>'+o.TEXTFIELD+'</option>'
        })
        
        $(".ftp_to_ip_1").html(ftp_to_ip_1);
        $(".ftp_to_ip_2").html(ftp_to_ip_2)
        $(".ftp_from_ip_1").html(ftp_to_ip_3);
        $(".ftp_from_ip_2").html(ftp_to_ip_4)
        form.render();
    }
    function ftpSave(data){
     
     
      publicFun.ajax(url.ftp.ftpSave,common.type,data,success);
      function success(data){
        if(data.code==0){
          layer.msg("保存成功")
        }
      }
        
       
        
    }
     
});