//Demo

layui.use(['form', 'laydate', 'table', 'jquery', 'laypage', 'layer', 'element'], function () {

  var form = layui.form;
  var laydate = layui.laydate;
  var table = layui.table;
  var laypage = layui.laypage;
  var layer = layui.layer;
 
  var element = layui.element;
  var firstTag = true;

  //示例日期
  var objData = {
    elem: '#startIn',
    type:'datetime',
    format: "yyyy-MM-dd"
  }
  var objDataend = {
    elem: '#startEnd',
    type:'datetime',
    format: "yyyy-MM-dd"
  }
  var startDate=null;var endDate=objDataend.elem;layFun.layData(startDate,endDate,laydate, objData);
  layFun.layData(laydate, objDataend);
  form.verify(verify);
  //示例两个日期结束
  //添加校验



  //监听提交
  
  
  form.on('submit(formQuery)', function (data) {
    

    initTable(data.field);
     //被执行提交的form对象，一般在存在form标签时才会返回

    return false;
  });


  //分页参数配置

  //第一个实例
  $(".ag-btn-query").click();
  function initTable(data) {

    publicFun.ajax(url.sysParamConfig.getList, common.type, data, success);

    function success(data) {
      tableRender(data.data)
    }


  }
  var page = {
    elem: 'page',
    count: 1, //data.totalResultNumber
    limit: 10,
    groups: 5,layout: ['prev', 'page', 'next','count','skip'],
    theme: '#44ade5',
    curr: "1",
    jump: function (obj, first) {
      //obj包含了当前分页的所有参数，比如：
      

      //首次不执行
      if (!first) {
        $(".pageNo").val(obj.curr)

        $(".ag-btn-query").click();
        // page.curr =  $(".pageNo").val();
        $(".pageNo").val(1)
      }
    }
  }

  function tableRender(data) {
    console.log(data)
    page.count = data.totalResultNumber
    page.curr = data.pageNoNumber;
    laypage.render(page);
    table.render({
      elem: '#ag-table',
      id: 'idTest',
      height: 300,
      data: data.resultList
        //,url: '/static/layui/json/page.json' //数据接口

        ,
      limit: 10,
      cols: [
        [ //表头\
          {type:"checkbox"}
          ,{unresize:true ,field: 'param_code', title: '参数代码', width:"20%"}
        ,{unresize:true ,field: 'param_name', title: '参数名称', width:"20%"}
        ,{unresize:true ,field: 'param_value', title: '参数值', width:"20%"} 
        ,{unresize:true ,field: 'valid_flag', title: '是否有效', width:"15%"}
        ,{unresize:true ,field:'id', title: '操作', width:"15%", align:'center',toolbar: '#barDemo'}

        ]
      ],
      text: {
        none: '暂无相关数据' //默认：无数据。注：该属性为 layui 2.2.5 开始新增
      }
    });
  }

 //监听工具条
table.on('tool(ag-table)', function(obj){ //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
var data = obj.data; //获得当前行数据
var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
var tr = obj.tr; //获得当前行 tr 的DOM对象

if(layEvent === 'detail'){ //查看
  //do somehing
  layer.msg(data.id)
} else if(layEvent === 'del'){ //删除
  layer.confirm('真的删除行么', function(index){
    obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
    layer.close(index);
    //向服务端发送删除指令
  });
} else if(layEvent === 'edit'){ //编辑
  common.param.id = data.param_code
  win("编辑","630px","360px",'systemManagement/systemParameterConfigurationWin/systemParameterConfigurationWin.html?type=edit&id='+data.param_code,2)
}else if(layEvent==="city"){
  layer.msg(data.city)
}
});

$(".add").on("click",function(){
  win("新增","630px","360px",'systemManagement/systemParameterConfigurationWin/systemParameterConfigurationWin.html?type=add',1)
})

  function win(title, width, height, url,way) {
    var obj = {
      btn: ["确定", "取消"],
      type: 2,
      area: [width, height],
      title: title,
      content: url,
      yes:function(index,layero){
        var frameId = "#" + layero.find('iframe')[0].id;
        var sonTemp = $(frameId).contents();
        var formB = sonTemp.find(".layui-form");
        var verifyStr =  publicFun.verify(formB,verify)
        if(verifyStr){
          layer.msg(verifyStr,{icon:5})
        }else{
          if(way==1){
            addData(sonTemp)
          }else{
            editData(sonTemp)
          }
          layer.close(index)
        }
 
        
      }
    }
    layFun.layer(layer, obj);

  }
  function addData(sonTemp){
    var obj = {
      param_name:sonTemp.find(".param_name").val(),
      param_code:sonTemp.find(".param_code").val(),
      param_value:sonTemp.find(".param_value").val(),
      valid_flag:sonTemp.find(".valid_flag").val(),
    }
    publicFun.ajax(url.sysParamConfig.add,common.type,obj,success);
    function success(data){
      if(data.code==0){

        layer.msg("添加成功");
        $(".ag-btn-query").click();
      }
    }
  }
  function editData(sonTemp){
    var obj = {
      param_name:sonTemp.find(".param_name").val(),
      param_code:sonTemp.find(".param_code").val(),
      param_value:sonTemp.find(".param_value").val(),
      valid_flag:sonTemp.find(".valid_flag").val(),
    }
    publicFun.ajax(url.sysParamConfig.edit,common.type,obj,success);
    function success(data){
      if(data.code==0){

        layer.msg("修改成功")
        $(".ag-btn-query").click();
      }
    }
  }

  active = {
    del: function(){ //获取选中数据
      var checkStatus = table.checkStatus('idTest'),
      data = checkStatus.data;
      if(data.length==0){
        layer.msg("请选择删除数据");
        return false;
      }
      
      layer.confirm('确认删除？', function (index) {
        var arr = []
        $.each(data,function(i,o){
          arr.push(o.param_code)
        })

        var str = arr.join(",");
         
        var obj = {
          paramCodeList:str
        }
        publicFun.ajax(url.sysParamConfig.del,common.type,obj,success);
        function success(data){
          console.log(data)
          if(data.code==0){
            layer.msg("删除成功")
            $(".ag-btn-query").click();
          }
        }

        layer.close(index);
        //向服务端发送删除指令
      });
      
    }
     
  };
  $('.demoTable .layui-btn').on('click', function(){
    var type = $(this).data('type');
    active[type] ? active[type].call(this) : '';
  });
});


 
