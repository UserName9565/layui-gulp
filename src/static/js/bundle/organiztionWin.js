layui.use(["dtree"], function () {
var dtree =layui.dtree;
  var deepN = common.getString("deepN");
  var checkTag = common.getString("checkTag");
  var sealId = common.getString("sealId")
  // if(checkTag==true){//用于印章授权分配权限需要反选

  // }
  if (deepN) {
    publicFun.organization(publicFun.treeNode, deepN,dtree,checkTag,sealId);

  } else {
    publicFun.organization(publicFun.treeNode, 0,dtree,checkTag,sealId);

  }



})
function getTree(index,success){
  layui.use("dtree",function(){
    var dtree = layui.dtree
    var params = dtree.getCheckbarNodesParam("treeDemo");
     
    var arr = [];
   
    $.each(params,function(i,o){
        
            arr.push(o.nodeId)
        
        
    })
    var departNumbers = arr.join(",");
    var obj = {};
    obj.sealId = common.getString("sealId")
    obj.departNumbers = departNumbers;
  
    publicFun.ajax(url.sealAuthorization.type,common.type,obj,success);
  })

  return false;
    
  
 
}