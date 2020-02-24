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
  $(".submission").click();
  function initTable(data) {

    publicFun.ajax(url.notice.noticeList, common.type, data, success);

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
        $(".currentPage").val(obj.curr)

        $(".submission").click();
        // page.curr =  $(".currentPage").val();
        $(".currentPage").val(1)
      }
    }
  }

  function tableRender(data) {
    page.count = data.totalResultNumber
    page.curr = data.currentPageNumber;
    laypage.render(page);
    table.render({
      elem: '#agileTable',
      id: 'idTest',
      height: 300,
      data: data.resultList
        //,url: '/static/layui/json/page.json' //数据接口

        ,
      limit: 10,
      cols: [
        [ //表头\
          {
            type:"checkbox"
          }
          ,
          {
            unresize:true ,field: 'noticeName',
            title: '公告名称',
            width:180
          }, {
            unresize:true ,field: 'noticeContent',
            title: '公告内容' 
          }, {
            unresize:true ,field: 'noticeLoginNo',
            title: '公告发布人',
            width:120
          }, {
            unresize:true ,field: 'noticeTime',
            title: '公告发布时间',
            width:180
          }, {
            unresize:true ,field: 'id',
            title: '操作',
            
            width: 150,
            align: 'center',
            toolbar: '#barDemo'
          }

        ]
      ],
      text: {
        none: '暂无相关数据' //默认：无数据。注：该属性为 layui 2.2.5 开始新增
      }
    });
  }

  //监听工具条
  table.on('tool(agileTable)', function (obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
    var data = obj.data; //获得当前行数据
    var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
    var tr = obj.tr; //获得当前行 tr 的DOM对象
    console.log(obj)
    if (layEvent === 'detail') { //查看
      //do somehing
      layer.msg(data.id)
    } else if (layEvent === 'del') { //删除
      layer.confirm('确认删除？', function (index) {
        obj.del(); //删除对应行（tr）的DOM结构，并更新缓存

        layer.close(index);
        //向服务端发送删除指令
      });
    } else if (layEvent === 'edit') { //编辑
      common.param.noticeId = data.noticeId
      win("编辑", "800px", "360px", 'noticeManagement/noticeManagementWin/noticeManagementWin.html?type=edit&noticeId='+data.noticeId,2)
    } else if (layEvent === "city") {
      layer.msg(data.city)
    }
  });
  $(".add").on("click", function () {
    win("新增", "800px", "360px", 'noticeManagement/noticeManagementWin/noticeManagementWin.html?type=add',1)
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
      notice_name:sonTemp.find(".notice_name").val(),
      notice_content:sonTemp.find(".notice_content").val()
    }
    publicFun.ajax(url.notice.add,common.type,obj,success);
    function success(data){
      if(data.code==0){

        layer.msg("添加成功")
        $(".submission").click();
      }
    }
  }
  function editData(sonTemp){
    var obj = {
      notice_name:sonTemp.find(".notice_name").val(),
      notice_content:sonTemp.find(".notice_content").val(),
      notice_id:common.param.noticeId
    }
    publicFun.ajax(url.notice.edit,common.type,obj,success);
    function success(data){
      if(data.code==0){

        layer.msg("修改成功")
        
        $(".submission").click();
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
          arr.push(o.noticeId)
        })

        var str = arr.join(",");
         
        var obj = {
          noticeIdList:str
        }
        publicFun.ajax(url.notice.noticedel,common.type,obj,success);
        function success(data){
          console.log(data)
          if(data.code==0){
            layer.msg("删除成功")
            $(".submission").click();
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
