//Demo

layui.use(['form','laydate','table','jquery','laypage','layer','element'], function(){
  
    var form = layui.form;
    var laydate = layui.laydate;
    var table = layui.table;
    var laypage = layui.laypage;
    var layer= layui.layer;
    
      var element = layui.element;var firstTag = true;
     
    
    //示例两个日期结束
    //添加校验
    form.verify(verify);  
    var type = common.getString("type");
    var id = common.getString("id");
    var name = common.getString("name");
    if(type=="add"){
        parentInit();
        
    }else{
        
        
        editInit();
        parentInit();
    }
    $(".parentGroupName").attr("disabled","disabled")
    publicFun.selectIn2(publicParams.yesNotYN,$(".validFlag"),"value","title",success);
    publicFun.selectIn2(publicParams.yesNotYN,$(".leafFlag"),"value","title",success);
    function success(){
        
        form.render();
    }
    function editInit(){//编辑初始话
        var obj_ajax = {};
        
        var url_ajax =url.organization.updateInit;
       
        obj_ajax.group_id=id;
        publicFun.ajax(url_ajax,common.type,obj_ajax,success)
        function success(data){
            var data  = data.data;
            
            $(".leaf_flag").find("[value="+data.leaf_flag+"]").attr("selected","")
            $(".valid_flag").find("[value="+data.valid_flag+"]").attr("selected","")
            form.val("winId", {
                "group_id":data.group_id,
                "group_name":data.group_name,
                "describe":data.describe,
                
            })
            }
        
    }


    function parentInit(){//获取父亲节点名称
        
        form.val("winId", {
            "parentGroupId":id,
            "parentGroupName":name
        })
        
    }
 

     

});