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
        elem:'#timeInstar',
        type:'date'
    }
    var objDataend = {
        elem:'#timeInend',
        type:'date'
    }
    
    
    //示例两个日期结束
    //添加校验
    form.verify(verify);  

     //监听提交
     form.on('submit(formQuery)', function(data){
        console.log(data.field) //被执行提交的form对象，一般在存在form标签时才会返回
        return false;
    });
    

    //分页参数配置
    var page = {
        count:"103",
        limit:7,
        groups:5,
        theme: '#44ade5' 
    }
    //第一个实例
    table.render({
      elem: '#ag-table',
      id:'idTest'
      ,height: 300
      ,url: '/static/layui/json/human.json' //数据接口
      ,page: page //开启分页
      ,limit:9
      ,cols: [[ //表头
       
        {unresize:true ,field: 'username', title: '无纸化工单号'}
        ,{unresize:true ,field: 'sex', title: 'crm工单号'}
        ,{unresize:true ,field: 'city', title: '工号'} 
        ,{unresize:true ,field: 'sign', title: '业务或活动名称'}
        ,{unresize:true ,field: 'score', title: '手机号码'}
        ,{unresize:true ,field: 'classify', title: '组织机构'}
        ,{unresize:true ,field: 'wealth', title: '验证方式', sort: true}
        ,{unresize:true ,field: 'wealth2', title: '受理时间', sort: true}
        ,{unresize:true ,field: 'wealth3', title: '考核项', sort: true}
        ,{unresize:true ,field: 'wealth4', title: '考核描述', sort: true}
         
        ,{unresize:true ,field:'id', title: '操作', width:150, align:'center',toolbar: '#barDemo'}
      ]],
      text: {
        none: '暂无相关数据' //默认：无数据。注：该属性为 layui 2.2.5 开始新增
      }
    });
    laypage.render({
      elem: '#mobile'
      ,jump: function(obj,first){
        //obj包含了当前分页的所有参数，比如：
        console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
        console.log(obj.limit); //得到每页显示的条数
        
        //首次不执行
        if(!first){
          console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
          console.log(obj.limit); //得到每页显示的条数
          //do something
        }
      }
    });

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
        //do something
        
        //同步更新缓存对应的值
        obj.update({
          username: '123'
          ,title: 'xxx'
        });
      }else if(layEvent==="city"){
        layer.msg(data.city)
      }
      });

     
});