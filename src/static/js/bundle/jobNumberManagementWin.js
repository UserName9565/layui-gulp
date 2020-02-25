//Demo

layui.use(['form','layer','element'], function(){
  
    var form = layui.form;
    var layer= layui.layer;
   
    var element = layui.element;
    
    //示例两个日期结束
    //添加校验
    form.verify(verify);  
    var type = common.getString("type")
    publicFun.organiztionp();
    if(type!="add"){
        var id = common.getString("id");
        select(2)
    }else{
        select(1);
    }
    // publicFun.organiztionp();
    function winFun (){
        var data = {
            url:url.jobNumber.findById,
            data:{
                loginNo:id,
                loginNoStr:id
              }
        }
      
        publicFun.ajax(data,success)
        function success(data){
            
            modelInit(data);
        }
    }
    function modelInit(data){
        console.log(data)
        
        //印章类型
        
        // $(".company_name").find("[keyword="+data.company_id+"]").attr("selected","")
       
       $(".groupName").attr("groupid",data.group.groupId)
        form.val("winId", {
            "loginNoStr":data.loginNoStr,
            "loginNameStr":data.loginNameStr, 
            "validFlag":data.validFlag,
            "groupName":data.group.groupName
          })
        form.render("select")
    }
    function select(type){
        
        publicFun.selectIn2(publicParams.yesNotYN,$(".validFlag"),"value","title",success);
      
        
       function  success(){
        form.render();
       
         
        if(type==2){
           
            winFun();
        }
       }
         
    }
    
});