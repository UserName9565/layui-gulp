layui.use(['form', 'laydate', 'table',  'laypage', 'layer', 'element'], function () {

  var form = layui.form;
  var laydate = layui.laydate;
  var table = layui.table;
  var laypage = layui.laypage;
  var layer = layui.layer;

  var element = layui.element;
  var firstTag = true;
  
  //示例两个日期结束
  //添加校验
  form.verify(verify);
  win('目录',"187px",'80%')
  function win(title, width, height) {
   
    var obj = {
      btn: false,
      type: 1,
      shade: 0,
      area: [width, height],
      title: title,
      offset:'rt',
      content: $(".pcontent"),
      
    }
    layFun.layer(layer, obj)
  }
  // element.on('nav(demo)', function (elem) {

  //   initTable($(elem).attr("keyword"))
  // });
  $('.tudai').on("click",'a',function(){
    initTable($(this).attr("keyword"))
  })
  initTable("impression")

  function initTable(strName) {

    var urls = url.apiDoc.impression;
    var obj = {};


    publicFun.ajax(urls, "get", obj, success);

    function success(data) {

      tableRender(data, strName)



    }
  }


  function tableRender(data, strName) {

    $.each($(".jieshao").find(".ja"),function(i,o){
     
      $(this).html(data[strName][$(this).attr("pname")])
    })
    var arr = [
      {
        field: 'key',
        title: '名称'
      }, {
        field: 'isMust',
        title: '	必填'
      }, {
        field: 'type',
        title: '类型'
      }, {
        field: 'explain',
        title: '说明'
      }

    ]
    var arr2 = [
      {
        field: 'key',
        title: '名称'
      }, {
        field: 'type',
        title: '类型'
      }, {
        field: 'explain',
        title: '说明'
      }

    ]
    arrJson(arr)
    arrJson(arr2)
    function arrJson(ar){

      $.each(ar, function (i, o) {
        o.align = "center"
      })
    }

    table.render({
      elem: '#ag-table',
      id: 'idTest',
      data: data[strName].requestJson,
      cols: [
        arr
      ],
      text: {
        none: '没有查询到符合条件的记录' //默认：无数据。注：该属性为 layui 2.2.5 开始新增
      }
    });
    table.render({
      elem: '#ag-table2',
      id: 'idTest2',
      data: data[strName].backJson,
      cols: [
        arr2
      ],
      text: {
        none: '没有查询到符合条件的记录' //默认：无数据。注：该属性为 layui 2.2.5 开始新增
      }
    });
}


});
