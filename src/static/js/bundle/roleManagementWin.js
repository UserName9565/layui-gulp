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
        elem:'#timeInstar',//Demo
        type:'date'
    }
    var objDataend = {
        elem:'#timeInend',
        type:'date'
    }
    
    
    //示例两个日期结束
    //添加校验
    form.verify(verify);  


 

     

});