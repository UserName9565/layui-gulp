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
    var type = common.getString("type")
    if(type=="add"){

    }else{
        var noticeId = common.getString("noticeId");
        winFun();
    }
   
    function winFun (){
        var data = {
            noticeId:noticeId,
        }
        publicFun.ajax(url.notice.getNoticeById,common.type,data,success)
        function success(data){
            console.log(data)
            noticeInit(data.data);
        }
    }
    function noticeInit(data){
        console.log(data)
        form.val("winId", {
            "notice_name":data.noticeName,
            "notice_content":data.noticeContent
          })
    }
 

     

});