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
        select(1)
    }else{
        
        var id = common.getString("id");
        select(2)
       
    }
   
    function winFun (){
        var data = {
            param_code:id,
        }
        publicFun.ajax(url.sysParamConfig.getDataById,common.type,data,success)
        function success(data){
            console.log(data)
            modelInit(data.data);
        }
    }
    function modelInit(data){
            $(".valid_flag").find("option[value="+data.valid_flag+"]").attr("selected","")
        form.val("winId", {
            "param_code":data.param_code,
            "param_name":data.param_name,
            "param_value":data.param_value 
          })
    }
    function select(num){
        publicFun.selectIn2(publicParams.yesNotYN,$(".valid_flag"),"value","title",success)
        function success(){

            if(num==2){
                winFun();
            } 
            form.render();
        }
    }

     

});