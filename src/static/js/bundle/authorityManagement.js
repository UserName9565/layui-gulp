//Demo

layui.use(['form','layer','element','dtree'], function(){
  
    var form = layui.form;
    var layer= layui.layer;
    var element = layui.element;var firstTag = true;
    var dtree = layui.dtree;//,'dtree'
    var allData = null;
    $(".parent_group_number").val(common.getString("id")).attr("disabled","disabled");
    $(".parent_group_name").val(decodeURI(common.getString("name"))).attr("disabled","disabled");
    
    //示例两个日期结束
    //添加校验
    form.verify(verify);  
    
     
    function quanxian(tree,type){//编辑初始话
         

             var obj_ajax = {
                 url:url.organization.initqx,
                 data:{
                     groupId:common.getString("id") 
                 },
                 type:"get"
             };
         
        
        publicFun.ajax(obj_ajax,success)
        function success(data){
           
            allData = data;
            getQ(data.loginMsgList[0].loginNoStr,1)
            
        }
    }
    $(".ai-ul").on("click",".ai-list",function(){
        $(this).addClass("active").siblings(".ai-list").removeClass("active");
        getQ($(this).attr("zh"),2)

    })
    function getQ(selectEmployeez,type){
        var obj_ajax = {
            url:url.organization.qx,
            data:{
                groupId:common.getString("id"),
                selectLoginNo: selectEmployeez
            },
            type:"get"
        };
        publicFun.ajax(obj_ajax,success)
        function success(data){
           

               tree(data,type)
            
        }
    }
    quanxian()
    function tree(json,type){
       
       //员工查询
       if(type==1){

           var emplor = allData.loginMsgList;
           var str = ''
           $.each(emplor,function(i,o){
               if(i==0){
                   var ssk = "active"

               }else{
                   var ssk = ""
               }
               str += '<li class="ai-list '+ssk+'" zh="'+o.loginNoStr+'">'+o.loginNameStr+'</li>'
               
           })
           $('.ai-ul').html(str)
       }
        
    
      
       var pcode = null;
       
       $.each(allData.functionList,function(i,o){
                
                o.checkArr = [
                    {"type": "0", "checked": "0"}
                  ]
                  if(o.isLeaf=="父节点"){
                    if(o.functionCode=="99998"){
                        o.parentId = 0;
                    }else{
                        o.parentId = "99998";
                    }
                    
    
                    pcode = o.functionCode
                    
    
                }else{
                    o.parentId = pcode;
                }
                o.id = o.functionCode;
                o.title = o.functionName;
                $.each(json,function(n,b){
                        
                        if(o.functionCode==b){
                            o.checkArr = [
                                {"type": "0", "checked": "1"}
                              ]
                            return true;
                        }
                })
           
       })
       
       var DemoTree = dtree.render({
        elem: "#ag-tree",
        dataFormat:"list",
        data: allData.functionList,
        dot: false,  // 隐藏小圆点
        checkbar: true,
        checkbarType: "all" ,
        skin: "layui" 
        //initLevel: "1"
      });
   }
   
});
       function getTree(index,success){
        layui.use("dtree",function(){
            var dtree = layui.dtree
            var params = dtree.getCheckbarNodesParam("ag-tree");
             
            var arr = [];
            var str = ""
            $.each(params,function(i,o){
                     str+="&opcodz="+o.nodeId+"|"+encodeURI(o.context)
                    arr.push(o.nodeId+"|"+encodeURI(o.context))
            })
            // var permisssionId = arr.join(",");
            var selectEmployeez = $(".ai-ul").find(".active").attr("zh");
            var obj = {
                url:url.organization.save+"?loginNoStr="+selectEmployeez+str,
                data:{
                    groupId:common.getString("id")
                    // loginNoStr:selectEmployeez,
                    // opcodz:arr,
                    // skillstaffpower :""
                },
                type:"get" 
            };
            // var id = common.getString("id");
            // obj.permIds = permisssionId;
            // obj.roleId = id;
            publicFun.ajax(obj,success);
          })
       }
       function allSelect(index){
            
            var treeObj = $.fn.zTree.getZTreeObj("treeDemo2");
            treeObj.checkAllNodes(true);
       }