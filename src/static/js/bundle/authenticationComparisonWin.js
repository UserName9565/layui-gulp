layui.use(['form', 'laydate', 'table', 'laypage', 'layer', 'element'], function () {
    var form = layui.form;
    var laydate = layui.laydate;
    var table = layui.table;
    var laypage = layui.laypage;
    var layer = layui.layer;
    var element = layui.element;
    //示例日期
    var objData = { elem: '#startTime', type: 'datetime' };
    var objDataend = { elem: '#endTime', type: 'datetime' }
    // var startDate = null; var endDate = objDataend.elem; layFun.layData(startDate, endDate, laydate, objData);
    // layFun.layData(startDate, endDate, laydate, objDataend);
    //日期问题
    form.on('submit(formQuery)', function (data) {


        initTable(data.field);
        //被执行提交的form对象，一般在存在form标签时才会返回

        return false;
    });
    /////////////////////////
    table.render({
        elem: '#ag-table',
        url: '/static/layui/api/table.json',
        toolbar: '#ag-table-header',
        defaultToolbar: ['filter', 'exports', 'print', {
            title: '提示',
            layEvent: 'LAYTABLE_TIPS',
            icon: 'layui-icon-tips'
        }],
        cols: [[
            { type: "checkbox", width: 50, fixed: "left" },
            { field: 'id', width: 80, title: 'ID', sort: true },
            { field: 'username', width: 80, title: '用户名' },
            { field: 'sex', width: 80, title: '性别', sort: true },
            { field: 'city', width: 80, title: '城市' },
            { field: 'sign', title: '签名', minWidth: 150 },
            { field: 'experience', width: 80, title: '积分', sort: true },
            { field: 'score', width: 80, title: '评分', sort: true },
            { field: 'classify', width: 80, title: '职业' },
            { field: 'wealth', width: 135, title: '财富', sort: true },
            { title: '操作', minWidth: 50, templet: '#currentTableBar', fixed: "right", align: "center" }
        ]],
        limits: [10, 15, 20, 25, 50, 100],
        limit: 15,
        page: true
    });

    //分页参数配置

    //第一个实例

    function selet() {
        publicFun.comSelect(url.impressionManagement.type, publicFun.selectIn2, $(".statusCode"), "key", "value", success, true);
        function success() {
            $(".ag-btn-query").click();

            form.render("select")
        }

    }

    function initTable(obj) {

        var urls = url.impressionManagement.getList;

        obj.departNumber = $(".departName").attr("groupId") || '';//组织机构
        var ajaxObj = {
            url: urls,//  请求地址
            data: obj
        }
        publicFun.ajax(ajaxObj, success);
        function success(data) {
            if (data.code == 200) {
                tableRender(data.data)
            } else {
                layer.msg("查询失败")
            }

            console.log(data)
        }
    }


    function tableRender(data) {
        var arr = [
            { type: "checkbox" }
            , { field: 'sealModelName', title: '印模名称' }
            , { field: 'departName', title: '所属机构名称' }
            , { field: 'sealShapeName', title: '印模形状' }
            , { field: 'statusCodeName', title: '状态' }
            , { field: 'approvalDesc', title: '审批描述' }
            , {
                field: 'id', title: '操作', align: 'center', templet: function (d) {
                    if (d.statusCode == 1 || d.statusCode == 3) {
                        return '<a class="layui-btn layui-btn-xs layui-btn-primary layui-btn-disabled" lay-event="">删除</a>'

                    } else {

                        return '<a class="layui-btn layui-btn-xs layui-btn-danger" lay-event="del">删除</a>'
                    }

                }
            }
        ]
        layFun.tableRender(table, laypage, data, arr, 300)
    }

    //监听工具条
    table.on('tool(ag-table)', function (obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
        var tr = obj.tr; //获得当前行 tr 的DOM对象

        if (layEvent === 'edit') { //编辑
            common.param.id = data.sealModelId;


            win("编辑", "100%", "100%", '/views/table/add.html?' + data.sealModelId, 2)


        } else if (layEvent === 'del') { //编辑
            layer.confirm('确认删除？', function (index) {

                var delobj = {
                    sealModelId: data.sealModelId
                }
                del(delobj)
            });

        }
    });
    //监听表头
    table.on('toolbar(ag-table)', function (obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）

        if (layEvent === 'add') { //编辑



            win("新增", "730px", "400px", 'impressionManagementWin/impressionManagementWin.html?type=add', 1)


        }
    });
    function win(title, width, height, url,tagType) {
        
        var obj = ({
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
              dataUpdata(tagType,sonTemp,index);
              
              
            }
            
            // var submited = sonTemp.find(".ag-btn-query");
            // submited.click()
            // console.log(submited.click())
             
          }
        })
         layFun.layer(layer, obj)
      }
      function dataUpdata(tagType,sonTemp,index){
     
        var obj =  publicFun.inputParam(sonTemp.find(".layui-form"));
       
        obj.departNumber = sonTemp.find(".departName").attr("groupId")
        
        if(tagType==2){
          obj.sealModelId = common.param.id;
          var urls = url.impressionManagement.edit
        }else{
          var urls = url.impressionManagement.add
        }
         
        publicFun.ajax(urls,common.type,obj,success);
        function success(){
          if(tagType==2){
            layer.msg("保存成功")
          }else{
            layer.msg("添加成功")
          }
          layer.close(index)
          $(".ag-btn-query").click();
        }
      }
      $(".data-add-btn").on("click", function () {

        var index = layer.open({
            title: '添加用户',
            type: 2,
            shade: 0.2,
            maxmin:true,
            shadeClose: true,
            area: ['100%', '100%'],
            content: '/views/table/add.html',
        });
        $(window).on("resize", function () {
            layer.full(index);
        });

        return false;
    });

});