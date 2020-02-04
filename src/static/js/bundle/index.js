layui.use(["form", "jquery"], function () {


  var form = layui.form;
  form.verify(verify);
  form.on("submit(login-submit)", function (data) {
  
    
    login(data.field)
    return false;
    //location.href = "views/admin.html"
  })
   select();

  function login(obj) {
    if(!obj.channelNo){
      layer.msg('请选择渠道',{icon:5})
      return false;
    }
    var urls = url.login;
    var obj_ajax = {};
    obj_ajax.agileParam = jsonChange.stringify(obj)
    $.ajax({
      type: "post",
      url: urls + "?" + Math.random(),
      cache: false,
      async: true,
      
      data: obj_ajax,
      dataType:"json",
      success: function (data) {
        if (data.code === 200) {
          data = data.data
          if (data.code === 200) {
            // delete data.state;
            var obj = {};
            data = data.data
            // obj.userId = data.userId;
            // obj.userName = data.account;
            // obj.departNumber = data.departNumber;
            // obj.chName = data.userName
            // obj.channelNo = data.userDefault1;
            // $.cookie("getLogin", JSON.stringify(obj), {
            //   expires: 7, path: '/'
            // })
            
            $.cookie('JSESSIONID_token', data.accessToken, { path: '/' });
            
            // var obj1 = JSON.parse($.cookie('getLogin'));
            // console.log(obj1)
            location.href = "views/admin.html"
          } else if (data.code === 201) {
            location.href = ctx + data.data
          } else {
            layer.alert(data.message)
            // layer.alert("账户名不存在或密码错误")
          }
        } else {
          layer.alert("请求失败")
        }
      },
      error: function (data) {

      }

    });
  }
  function select(){
     var urls = url.businessManagement.type;
     var obj_ajax = {};
     obj_ajax.agileParam = jsonChange.stringify({})
     $.ajax({
      type: "post",
      url: urls + "?" + Math.random(),
      cache: false,
      async: true,
      
      data: obj_ajax,
      dataType:"json",
      success: function (data) {
        if (data.code === 200) {
          data = data.data
          if (data.code === 200) {
          
            publicFun.selectIn2(data.data,$(".channelNo"),"channelNo","channelName",true,success1,-4);
          } 
        } else {
          layer.alert("请求失败")
        }
        function  success1(){
          form.render("select");
        } 
      },
      error: function (data) {

      }

    });
   
    
  }

  $(document).keyup(function (event) {
    if (event.keyCode == 13) {
      $(".login-submit").trigger("click");
    }
  });
})
