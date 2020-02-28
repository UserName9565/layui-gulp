
var common = {
  pageSize: 10,
  type: "POST",
  param: {},

  getString: function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
      return decodeURIComponent(r[2]);
    } else {
      return null;

    }
  },
  getUrl: function (urls) {
    if (cv == 1) {
      var n = (urls.split('/')).length - 1;

      if (n == 1) {

        urls = "../" + urls.substr(urls.lastIndexOf('/', urls.lastIndexOf('/') - 1) + 1);
      } else {
        urls = urls.substr(urls.lastIndexOf('/', urls.lastIndexOf('/') - 1) + 1);

      }

    } else {

      if (urls.indexOf('.html?') > 0) {

        urls = url.comMethod.getUrl + "?data=views/" + urls.replace(".html?", "&")
      } else {
        urls = url.comMethod.getUrl + "?data=views/" + urls.replace(".html", "")
      }
    }

    return urls
  },
  IEVersion: function () {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    if (isIE) {
      var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
      reIE.test(userAgent);
      var fIEVersion = parseFloat(RegExp["$1"]);
      if (fIEVersion == 7) {
        return 7;
      } else if (fIEVersion == 8) {
        return 8;
      } else if (fIEVersion == 9) {
        return 9;
      } else if (fIEVersion == 10) {
        return 10;
      } else {
        return 6; //IE版本<=7
      }
    } else if (isEdge) {
      return 'edge'; //edge
    } else if (isIE11) {
      return 11; //IE11
    } else {
      return -1; //不是ie浏览器
    }
  },
  activeXHide: function (box) {

    document.getElementById(box).style.width = "0px";
    document.getElementById(box).style.height = "0px";
  },
  activeXShow: function (box, width, height) {

    // var box = document.getElementById(box)
    // box.style.display = "block"
    if (!width) {
      width = "100%"
    }
    if (!height) {
      height = "600px"
    }

    document.getElementById(box).style.width = width;
    document.getElementById(box).style.height = height;
  },
  getPath: function (file) { //获取file的真实地址

    var url = null;
    if (window.createObjcectURL != undefined) {
      url = window.createOjcectURL(file);
    } else if (window.URL != undefined) {
      url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) {
      url = window.webkitURL.createObjectURL(file);
    }
    return url;
  },
  layerWin: function (title, width, height, url, type, box) {
    var _this = this;

    var obj = {
      btn: ["确定", "取消"],
      type: 2,
      area: [width, height],
      title: title,
      content: url,
      yes: function (index, layero) {
        var frameId = "#" + layero.find('iframe')[0].id;
        var sonTemp = $(frameId).contents();
        if (type == "organization") {
          _this.orWin(sonTemp, box)
        } else if (type == "business") {

          _this.businessWin(sonTemp, box)
        } else if (type == "jobNo") {

          _this.jobNoWin(sonTemp, box)
        }
        layer.close(index)
      }
    }
    layFun.layer(layer, obj)

  },
  orWin: function (sonTemp, box) {
    var inputB = box.parent().siblings("div").find("input")
    inputB.val(sonTemp.find(".groupName").val());
    inputB.attr("groupId", sonTemp.find(".groupId").val())
    if ($(".gong").length > 0) {
      $(".gong").click();
    }
  },
  businessWin: function (sonTemp, box) {
    sonTemp.find(".getS").click();

    var inputB = box.parent().siblings("div").find("input")
    inputB.val(sonTemp.find(".opName").val());
    inputB.attr("opCode", sonTemp.find(".opCodeHidden").val())
    $(".opCode").val(sonTemp.find(".opCodeHidden").val())
  },
  jobNoWin: function (sonTemp, box) {
    sonTemp.find(".getS").click();

    var inputB = box.parent().siblings("div").find("input")
    inputB.val(sonTemp.find(".opName").val());
    inputB.attr("workNo", sonTemp.find(".opCodeHidden").val())

  }

}

 

 
var publicFun = {
  
  getSSS:function(str){
    date = new Date(str);
    return  date.getTime();
  },
  organiztionp: function (cmca_switch) {
   
    $(".organiztionp").on("click", function () {

      if ($(this).attr("deepN") || $(this).attr("deepn")) {
        win("组织结构", "730px", "460px", '../commonWin/organiztionWin.html?deepN=' + publicFun.getLogin("groupId"), $(this), cmca_switch)
      } else {

        win("组织结构", "730px", "460px", '../commonWin/organiztionWin.html', $(this), cmca_switch)
      }



    })


    function win(title, width, height, url, box, cmca_switch) {

      var obj = {
        btn: ["确定", "取消"],
        type: 2,
        area: [width, height],
        title: title,
        content: url,
        yes: function (index, layero) {
          var frameId = "#" + layero.find('iframe')[0].id;

          var sonTemp = parent.$(frameId).contents();

          gorup(sonTemp, box)

          parent.layer.close(index)

        },

      }

      layFun.parentLayer(layer, obj)

    }

    function gorup(sonTemp, box) {

      var inputB = box.parent().siblings("div").find("input")
      inputB.val(sonTemp.find(".groupName").val());
      inputB.attr("groupId", sonTemp.find(".groupId").val());
      if($(".roleIds").length>0){

        publicFun.userAct(publicFun.selectIn2,$(".roleIds"),"roleId","roleName",true,multiSelectInit,sonTemp.find(".groupId").val());
        
      }
      if($(".businessNo").length>0){
        box.parents("body").find('.businessNobtn').click();
      }
      if($(".templateId").length>0){
        box.parents("body").find('.templateIdBtn').click();
      }
    }
  },
  
  selectIn2: function (data, box, id, name, back,isxuanze) {
    var tagT = true;
      
    if(!isxuanze){

      var str = '<option value="" selected>请选择...</option>'
    }else if(isxuanze=="-1"){
      var str = '<option value="-1" selected>全部</option>'
    }else if(isxuanze=="-2"){
      var str = '<option value="0">签章服务平台</option>'
      tagT = false;
    }else if(isxuanze=="-3"){
      tagT = false;
      $.each(data, function (i, o) {
        if(o[id]==2){

          str += '<option  value="' + o[id] + '">' + o[name] + '</option>'
        }
      })
    } else if(isxuanze=="-4"){
      var str = '<option value="0">请选择渠道</option>'
      
    }else{
      var str = '';
    }
    if(tagT){

      $.each(data, function (i, o) {
        str += '<option  value="' + o[id] + '">' + o[name] + '</option>'
      })
    }
    box.html(str);
     

      back();
     
  },
  radioIn:function(data, box, id, name, tag, back,className){
      var str = '';
      $.each(data,function(i,o){

        if(i==0){
          var checked = "checked"
        }else{
          var checked = '';
        }

        str +=' <input type="radio" name="'+className+'" value="'+o[id]+'" title="'+o[name]+'" '+checked+'>'
      })

      box.html(str);
      if (tag) {

        back();
      }
  },
  comSelect:function(urls,fun,box,id,name,tag,back,isxuanze,data){//用户管理-用户状态下拉
    
    if(data){
      var obj = data;
    }else{
      var obj = {};
    }
   // var urls = url.urserManagement.other;

    publicFun.ajax(urls,common.type,obj,success);
    function success(data){

      fun(data.data,box,id,name,tag,back,isxuanze)
    }
  },
  getFile: function (obj, _this) { //返回路径
    var vison = common.IEVersion();
    var dataURL = null;
    if (vison > 9 || vison == -1) {
      var files = obj.pushFile();
      var file1 = null;
      $.each(files, function (i, o) {
        file1 = o
      })
      var windowURL = window.URL || window.webkitURL;
      dataURL = windowURL.createObjectURL(file1);
    } else {
      dataURL = $("[name=" + _this.field + ']').val()


    }
    return dataURL;
  },
  getLogin: function (wen) {
    var obj = null;
    try {
      obj = JSON.parse($.cookie('getLogin'));
      if(!obj){
        return ''
         
      }
      return obj[wen]
   }
   catch(err){
      return ''
      location.href = "./views/login-1.html"
   }
  },
  
  ajax: function (pObj,success,error) {
     //obj.url  请求地址
    //obj.data  请求数据
    //success   成功回调
    //error     失败回调
    // let defaultObj = {
    //     type:"post",

    // }
    var obj_ajax = {
      pageSize:10,
      isWait:false,
      messageTag:false,
      type:"post"
    };
    pObj = $.extend({},obj_ajax,pObj);
    
     

    $.each(pObj.data, function (i, o) { //为了去除ie8 空字符串传到后台变为null的问题
      if (o === "") {
        pObj.data[i] = ""
      }
    })
    
    if (!pObj.isWait) {

      var coverIndex = layer.load(1, {
        shade: [0.1, '#fff'] //0.1透明度的白色背景
      });

    }

    var accessToken = common.getString("JSESSIONID");
    if (accessToken != null) {
      $.cookie('JSESSIONID_token', accessToken, { path: '/' });
    }
    if(pObj.type=="get"){
        var req = pObj.data;
    }else{

      var req = JSON.stringify(pObj.data);
    }
    pObj.data._agileAuthToken = $.cookie('JSESSIONID_token')
    var url = ''
    if(pObj.url.indexOf("?")!=-1){
      url= pObj.url + "&t=" + Math.random()
    }else{
      url= pObj.url + "?t=" + Math.random()
    }
    $.ajax({
      type: pObj.type,
      url:url ,
      cache: false,
      async: true,
      headers: {
        _agileAuthToken: $.cookie('JSESSIONID_token')
     },
    contentType: "application/json; charset=utf-8",
      data:req,
      
      success: function (data) {
       
        
        if (!pObj.isWait) {
          layer.close(coverIndex)
        }
        if (!data) {
          return false;
        }
        if (typeof data == 'string') {

          data = JSON.parse(data);


        }
         
        // if (data.result == 0) {
            success(data)
        // }   else {
        //   if (pObj.messageTag) {
        //     layer.msg(data.message)
        //   } else {

        //     layer.msg("请求失败")
        //   }
        // }
      },
      error: function (data) {
        
        if (!pObj.isWait) {
          layer.close(coverIndex)
        }
        layer.msg("请求失败")

      }

    });
  },
  inputParam: function (box) {//自动组装表单数据
    var obj = {};
    $.each(box.find("[name]"), function () {
      
      if($(this).attr("type")=="radio"){

        obj[$(this).attr("name")] = box.find('input[name='+$(this).attr("name")+']:checked').val();

      }else{

        obj[$(this).attr("name")] = $(this).val();
      }
    })
    return obj;
  } ,
  verify: function (box, veri) {//表单校验
    var str = false;
   
    var pin = box.find("[lay-verify]");
 
    pin.each(function (i, o) {
 
      if($(this).attr("isVer")){
        return true;
      }
      if ($(this)[0].tagName == "INPUT" || $(this)[0].tagName == "TEXTAREA") {
        var value1 = $(this).val()
      } else if ($(this)[0].tagName == "SELECT") {
        var value1 = $(this).find("option:selected").html();
      }
      var v = $(this).attr("lay-verify")
      if (v) {
        if (veri[v] instanceof Function) {
          str = veri[v](value1, $(this))
          if (str) {
            $(this).focus().addClass("layui-form-danger")
            return false;
          }
        } else if (veri[v] instanceof Array) {
          if (veri[v][0].test(value1)) {
            return veri[v][1];
          }
          if (str) {
            return false;
          }
        }

      }
    })
    return str;
  },
 
  downTap: function (urls, obj, urls2, tag) {
    var str = '';
    $.each(obj, function (i, o) {

      str += '&' + i + "=" + o;


    })
    str = str.replace("&", "")
    if ($("#downTap").length == 0) {
      var str1 = '<a href=""  class="dpn" id="downTap"> 导出下载</a>'
      $("body").append(str1)
    }
    $("#downTap").attr({
      "href": urls + "?" + str
    })

    if (urls2) {

      publicFun.ajax(urls2, common.type, obj, fun1)

      function fun1(data) {
        if (data.data.length > 0) {
          document.getElementById("downTap").click();
        } else {
          layer.msg("无数据可导出")
        }


      }
    } else {
      document.getElementById("downTap").click();
    }



  },
  getOrgTree:function(tree,treeObj){
      var obj = {};
     
      var urls = url.organization.allTree;
      var ajaxObj = {
          url: urls,//  请求地址
          data: obj
      }
      this.ajax(ajaxObj, function(data){
        treefun(data)
      });

      function treefun(data){
         
        $.each(data,function(i,o){
          o.id = o.groupId;
          o.field = o.groupName;
          o.title = o.groupName;
          if(o.leafFlag=="N"){
            o.child = [];
          }
        })
        var inst1 = tree.render({
          elem: treeObj.elem  //绑定元素
          ,data:  data
        });
      }
  },
  organization: function (success,type,dtree,checkedTag,form) { //组织机构

    var obj = {
      isWithHall: "",
      rootId: ""
    };
     
    var urls = url.organization.getNodes;
    var ajaxObj = {
        url: urls,//  请求地址
        data: obj
    }
    this.ajax(ajaxObj, function(data){
      success(data,type,dtree,checkedTag,form)
    });

  },
  treeNode: function (data,type,dtree,checkedTag,form) {
    
    var obj = {};
    
    try {
      sealIds = sealIds.data
    } catch (error) {
      
    }
   
    $.each(data,function(i,o){

      // o.children =[] //data.childrens;
      // o.id = o.groupId;
      o.parentId = o.pid;
      o.title = o.name;
      if(o.isParent=="true"){

        o.last = false;
      }else{
        o.last = true;
      }
      o.spread =false;
      if(checkedTag){
        o.checkArr = [
          {"type": "0", "checked": "0"}
        ]
        o.checked = 0;
          
        try {
       
            $.each(sealIds,function(d,j){
                
              if(j==o.departNumber){
                
                o.checkArr = [
                  {"type": "0", "checked": "1"}
                ]
                o.checked = 1;
                return false;
              }
            })
        } catch (error) {
          
        }
        
      }
    })
    obj.data=data
    tree(obj);

    function tree(obj){
   
      var DemoTree = dtree.render({
        elem: "#ag-tree",
        data: obj.data,
        dot: false,  // 隐藏小圆点
        checkbar: checkedTag,
        checkbarType:"self",
        dataFormat: "list",  //配置data的风格为list
        skin: "layui",
        async:false,
      });
      dtree.on("node('ag-tree')" ,function(obj){
         
        //layer.msg(JSON.stringify(obj.param));
        var treeNode = obj.param
       
        if(type==1){
          
            var obj21 = {
              url:url.organization.findById,
              type:"get",
              data:{
                groupId:treeNode.nodeId
              }
              
            }
          
            publicFun.ajax(obj21,success2)
            function success2(data){
              // form.val("winId", {
              //   "describe":data.describe,
              //   "groupId":data.groupId ,
              //   "groupIdPks":data.groupIdPks,
              //   "leafFlag":data.leafFlag ,
              //   "groupName":data.groupName,
              //   "parentGroupId":data.parentGroupId ,
              //   "validFlag":data.validFlag
              // })
              $(".describe").val(data.describe);
              $(".groupId").val(data.groupId);
              $(".groupIdPks").val(data.groupIdPks);
              $(".groupName").val(data.groupName);
              $(".leafFlag").val(data.leafFlag);
              $(".parentGroupId").val(data.parentGroupId);
              $(".validFlag").val(data.validFlag);
              form.render();  
              
            }
               


          
        }else{
           if(treeNode){

             $(".groupId").val(treeNode.nodeId);
             $(".groupName").val(treeNode.context);
           }
        }

      });
      dtree.on("changeTree('ag-tree')" ,function(treeobj){

        if(!treeobj.show){
          return false;
        }
        var obj1 = treeobj.param;
       
        var obj2 = {
          url:url.organization.getNodes,
          type:"get",
          data:{
            parentId:obj1.nodeId,
            n:obj1.context,
            lv: obj1.level-1,
            isWithHall:"" ,
            rootId:"" 
          }
          
        }
      
        publicFun.ajax(obj2,success)
        function success(data1){
         
          var objA = data1
        
          if(objA.length == 0){
            return false;
          }
          $.each(objA,function(i,o){
            o.parentId = o.pid;
            o.title = o.name;
            if(o.isParent=="true"){

              o.last = false;
            }else{
              o.last = true;
            }
            o.spread =false;
            if(checkedTag){
              o.checkArr = [
                {"type": "0", "checked": "0"}
              ]
              o.checked = 0;
                
              try {
                  $.each(sealIds,function(d,j){
                      
                    if(j==o.departNumber){
                      
                      o.checkArr = [
                        {"type": "0", "checked": "1"}
                      ]
                      o.checked = 1;
                      return false;
                    }
                  })
              } catch (error) {
                
              }
              
            }
           
          })
     
          var $div = DemoTree.getNodeDom(obj1.nodeId).div()
          DemoTree.partialRefreshAdd($div,objA)
          // dtree.reload(DemoTree, {
          //   data: obj.data,
          //   dot: false,  // 隐藏小圆点
          //   checkbar: checkedTag,
          //    dataFormat: "list",  //配置data的风格为list
          //   skin: "layui" ,
          // });
        }
      });
    }

  },
}
var layFun = {
  startTime: null,
  endTime: null,
  layData:function(startTime,endTime,pCom,obj,tag){
        
    if(!obj){
        return false;
    }
    if(tag=="1"){

    }else{
        if(obj.elem=="#startTime"||obj.elem=="#timeInstar"||obj.elem=="#timeStart"||obj.elem=="#startIn"){
         
            obj.btns= ['confirm']
            obj.max = 0;
            obj.min = '2013-1-1 00:00:00'
            obj.btns= ['confirm']
            obj.done= function(value, date){
            //     //{"year":2018,"month":9,"date":7,"hours":0,"minutes":0,"seconds":0}
            //     // layer.alert('你选择的日期是：' + value + '<br>获得的对象是' + JSON.stringify(date));
                var a1=date.year%4==0;

                var a2=date.year%100!=0;
                
                var a3=date.year%400==0;
                var DD = 31;
                if(date.month==4||date.month==6||date.month==9||date.month==10){
                    DD = 30;
                }
                if((a1&&a2)||a3){//闰年 判断是平年还是闰年
                    
                    if(date.month==2){
                        DD = 29;
                    }
                }else{
                     
                    if(date.month==2){
                        DD = 28;
                    }
                }
                var myDate = new Date();
                var yyyy=myDate.getFullYear(); 
                var mm=myDate.getMonth()+1;
                var DD3 = myDate.getDate();

                if(date.year==yyyy&&mm==date.month){
                    DD = DD3;
                    if(DD<10){
                        DD = "0"+DD
                    }
                }




                if(date.month<10){
                    date.month  = "0"+date.month;
                }
                if(date.date<10){
                    date.date  = "0"+date.date;
                }
            
                
                var endT = date.year+"-"+date.month+"-"+DD+" 23:59:59"
            
                if(layFun.endTime){

                    layFun.endTime.config.max ={
                        year:date.year,
                        month:date.month-1, //关键
                        date: DD,
                        hours: 23, 
                        minutes: 59, 
                        seconds : 59

                    };
                    layFun.endTime.config.min ={
                        year:date.year,
                        month:date.month-1, //关键
                        date: date.date
                    };
                     
                }
                $(endTime).val(endT)  
              
            }
            
            layFun.startTime = pCom.render(obj);
        }else if(obj.elem=="#endTime"||obj.elem=="#endInstar"||obj.elem=="#timeEnd"||obj.elem=="#startEnd"){
            
             obj.max = 1;
             obj.btns= ['confirm'];
            //  obj.min = common.startTime
            layFun.endTime = pCom.render(obj);
        }
    }
    
     
    
},
  layData7: function (startTime, endTime, pCom, obj, tag) {

    if (!obj) {
      return false;
    }
    if (tag == "1") {

    } else {
      if (obj.elem == "#startTime" ) {
        obj.btns = ['confirm']
        obj.max = 1;
        obj.done = function (value, date) {


          var nowTime = new Date().getTime();
          var startTime = NewDate(value).getTime();

          var endTime7 = startTime + (60000 * 60 * 24 * 7);
          if (endTime7 > nowTime) {
            endTime7 = nowTime;
          }
          var endTimeCopy = endTime7
          endTime7 = hsDate(endTime7, tag)

          var yyyy = hsDate(endTimeCopy, "yyyy")
          var month = hsDate(endTimeCopy, "month")
          var date1 = hsDate(endTimeCopy, "date")
          layFun.endTime.config.max = {
            year: yyyy,
            month: month - 1,
            date: date1
          };
          layFun.endTime.config.min = {
            year: date.year,
            month: date.month - 1,
            date: date.date
          };

          $(endTime).val(endTime7)


        }

        layFun.startTime = pCom.render(obj);
      } else if (obj.elem == "#endTime") {
        obj.btns = ['confirm']
        obj.max = 1;
        obj.min = common.time7Start
        layFun.endTime = pCom.render(obj);
      }
    }



  },

  layer: function (layer, obj, success, error) {
    var funObj = obj;

    // if (!funObj.offset) {
    //   funObj.offset = '30px'
    // }
    // obj.content = common.getUrl(obj.content)
    obj.btnAlign = 'c'
    obj.shadeClose = true;

    layer.open(funObj)

  },
  parentLayer: function (layer, obj, success, error) {
    var funObj = obj;
    // obj.content = common.getUrl(obj.content)
    if (!funObj.offset) {
      funObj.offset = '30px'
    }
    obj.btnAlign = 'c';
    obj.shadeClose = true;
    parent.layer.open(funObj)

  },
  tableRender: function (table, laypage, data, arr) {
    var page = {
      elem: 'ag-area-page',
      count: 1, //data.totalResultNumber
      limit: 10,
      groups: 5,
      layout: ['prev', 'page', 'next', 'count', 'skip'],
      // theme: '#44ade5',
      curr: "1",
      jump: function (obj, first) {
        //obj包含了当前分页的所有参数，比如：
        //首次不执行
        if (!first) {
          $(".pageNo").val(obj.curr)

          $(".ag-btn-query").click();
          //page.curr = $(".pageNo").val();
          $(".pageNo").val(1)
        }
      }
    }
    page.count = data.totalRecord
    page.curr = data.pageNo;
    laypage.render(page);
    $.each(arr,function(i,o){
      o.align = "center"
    })

    table.render({
      elem: '#ag-table',
      id: 'idTest',
      // height: 500,
      data: data.data
        //,url: '/static/layui/json/page.json' //数据接口

        ,
      toolbar: '#ag-table-header',
      limit: 10,
      skin: 'line' //行边框风格
      ,even: true //开启隔行背景
      //,size: 'sm' //小尺寸的表格
      ,cols: [
        arr
      ],
      text: {
        none: '没有查询到符合条件的记录' //默认：无数据。注：该属性为 layui 2.2.5 开始新增
      }
    });

  },


}
var verify = {
  username: function (value, item) { //value：表单的值、item：表单的DOM对象

      if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
        return '用户名不能有特殊字符';
      }
      if (/(^\_)|(\__)|(\_+$)/.test(value)) {
        return '用户名首尾不能出现下划线\'_\'';
      }
      if (/^\d+\d+\d$/.test(value)) {
        return '用户名不能全为数字';
      }
    }

    //我们既支持上述函数式的方式，也支持下述数组的形式
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    ,
  pass: [
    /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
  ],
  phoneNo: function (value, item) {
   
    if (value.length != 0) {
      if (/^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\\d{8}$/.test(value)) {
        return '请填写正确手机号码';
      }
    }
    if (value.length == 0) {
      return '请填写正确手机号码';
    }
  },
  opcode:function (value, item) {
    if (value.length != 0) {
      if (!/^[a-zA-Z0-9]{1,20}$/.test(value)) {

        return '业务编码为20以下数字，字母或组合';
      }
    }else{
      return '请填写业务编码';
    }
  },
  requiredM: function (value, item) {
  
    if (!value || value == 0 || value == "请选择..."||value=='') {

      return '必填项不能为空';
    }
  },
  isChar:function (value, item) {

    if (value.length != 0) {
      if (/[\u4e00-\u9fa5]/g.test(value)) {

        return '规则编码不能填写中文';
      }
    }else{
      return '必填项不能为空';
    }
  }
}

//公共按钮点击区

layui.use(['form', 'laydate', 'table',  'laypage', 'layer', 'element'], function () {
  var form = layui.form;
  var laydate = layui.laydate;
  var table = layui.table;
  var laypage = layui.laypage;
  var layer = layui.layer;

  $("#ag-table").parents(".layui-card").addClass("p100")
  $(".organiztion").on("click", function () {
    if ($(this).attr("deepN") || $(this).attr("deepn")) {
      var str = '?deepN=' + publicFun.getLogin("groupId")
    } else {
      var str = ''
    }
    common.layerWin("组织结构", "730px", "460px", '../commonWin/organiztionWin.html' + str, "organization", $(this))
  })
  $(".business").on("click", function () {
    common.layerWin("业务类型", "800px", "460px", '../commonWin/businessWin.html', "business", $(this))
  })
  $(".jobNoBtn").on("click", function () {
    common.layerWin("工号", "800px", "460px", '../commonWin/jobNoWin.html', "jobNo", $(this))
  })
  $(".cleanInput").on("click", function () {
    var inputbox = $(this).parent().siblings("div").find("input");
    if (inputbox.attr("ignore") == 1) {
      inputbox.val(inputbox.attr("init-value"));

      inputbox.attr("groupid", inputbox.attr("init-value2"))

    } else {

      inputbox.val("").removeAttr("groupid").removeAttr("opcode");
      $(".opCode").val("")
    }

  })
  $("[type=reset]").on("click", function () {
    $(this).parents(".layui-form ").find("input").removeAttr("groupid").removeAttr("opcode")
    $(".opCode").val("")
  });
  $("[reset=true]").on("click", function () {
    var pBox = $(this).parents(".layui-form ")
    pBox.find("[ignore=2]").val("").removeAttr("groupid").removeAttr("opcode"); //无限制的直接清空

    pBox.find("[ignore=3]").find("option:first").prop("selected", true) //select框清空




    $.each(pBox.find("[ignore=4]"), function () {
      $(this).find("option[value=" + $(this).attr("init-value") + "]").prop("selected", true)
    })

    pBox.find("[ignore=1]").val("");
    $.each(pBox.find("[ignore=1]"), function () { //不能清空有默认值
      if ($(this).attr("inputT") == "zzjg") {
        $(this).attr("groupid", $(this).attr("init-value2"))
      }

      var ids = $(this).attr("id");

      if (ids == "endTime" || ids == "endInstar" || ids == "timeEnd" || ids == "startEnd") {
        var endTimeCopy = layFun.startTime.config.value;
        var yyyy = hsDate(endTimeCopy, "yyyy")
        var month = hsDate(endTimeCopy, "month")
        var date1 = hsDate(endTimeCopy, "date")
        layFun.endTime.config.min = {
          year: yyyy,
          month: month - 1,
          date: date1
        };
        var endTimeCopy = $(this).attr("init-value");
        var yyyy1 = hsDate(endTimeCopy, "yyyy")
        var month1 = hsDate(endTimeCopy, "month")
        var date11 = hsDate(endTimeCopy, "date")
        layFun.endTime.config.max = {
          year: yyyy1,
          month: month1 - 1,
          date: date11 + 1
        };

      }
      $(this).val($(this).attr("init-value"));

    })


    $(".opCode").val("")
    layui.form.render('select');

  })

  $(document).keyup(function(event){
    if(event.keyCode ==13){
      $(".ag-btn-query").trigger("click");
    }
  });

  $('.ag-tab-title').on("click","li",function(){
    $(this).addClass("ag-this").siblings("li").removeClass("ag-this");
    console.log($(this).index())
  })
})

var TimeUtil = {
  timeChangehs:function(str){
      var time = new Date(str.replace("-", "/").replace("-", "/"));
      return time
  },
  hsDate: function (str) {
    var oDate = NewDate(str),
      oYear = oDate.getFullYear(),
      oMonth = oDate.getMonth() + 1,
      oDay = oDate.getDate();

    var oTime = oYear + '-' + getzf(oMonth) + '-' + getzf(oDay) + " 00:00:00"; //最后拼接时间
    function getzf(num) {
      if (parseInt(num) < 10) {
        num = '0' + num;
      }
      return num;
    }
    return oTime
  },
  formatTime: function (dateTime) {
    //var dateTime = 1544683901;

    if (dateTime) {
      var d =  new Date(dateTime),

        str = '';

      var _month = d.getMonth() + 1;
      if (_month < 10) {
        _month = "0" + _month;
      }
      var _gDate = d.getDate();
      if (_gDate < 10) {
        _gDate = "0" + _gDate;
      }

      var _hours = d.getHours();
      if (_hours < 10) {
        _hours = "0" + _hours;
      }
      var _minutes = d.getMinutes();
      if (_minutes < 10) {
        _minutes = "0" + _minutes;
      }

      var _seconds = d.getSeconds();
      if (_seconds < 10) {
        _seconds = "0" + _seconds;
      }
      str += d.getFullYear() + '-';
      str += _month + '-';
      str += _gDate + ' ';
      str += _hours + ':';
      str += _minutes + ':';
      str += _seconds + ' ';

    } else {
      return "-";
    }

    return str
  },
  getYYYMMHHSS: function (dateTime) {
    var datetime = "-";
    if (dateTime != null && dateTime != "" && dateTime != "undefined" && dateTime != "null") {
      var d = new Date(dateTime),
        str = '';
      var td = d.getDay();

      var _month = d.getMonth() + 1;
      if (_month < 10) {
        _month = "0" + _month;
      }
      var _gDate = d.getDate();
      if (_gDate < 10) {
        _gDate = "0" + _gDate;
      }

      var _hours = d.getHours();
      if (_hours < 10) {
        _hours = "0" + _hours;
      }
      var _minutes = d.getMinutes();
      if (_minutes < 10) {
        _minutes = "0" + _minutes;
      }

      var _seconds = d.getSeconds();
      if (_seconds < 10) {
        _seconds = "0" + _seconds;
      }
      str += d.getFullYear() + '-';
      str += _month + '-';
      str += _gDate + ' ';
      str += _hours + ':';
      str += _minutes + ':';
      str += _seconds ;
    } else {
      return "-";
    }
    return str
  },
  getYYYMMHH: function (dateTime) {
    var datetime = "-";
    if (dateTime != null && dateTime != "" && dateTime != "undefined") {
      var d = new Date(dateTime),
        str = '';
      var td = d.getDay();

      var _month = d.getMonth() + 1;
      if (_month < 10) {
        _month = "0" + _month;
      }
      var _gDate = d.getDate();
      if (_gDate < 10) {
        _gDate = "0" + _gDate;
      }
      str += d.getFullYear() + '-';
      str += _month + '-';
      str += _gDate + ' ';
    }
    return str
  },
  getNowTime: function (dStr) {
    //当前系统时间
    var d = new Date(),
      str = '';
    var td = d.getDay();

    var _month = d.getMonth() + 1;
    if (_month < 10) {
      _month = "0" + _month;
    }
    var _gDate = d.getDate();
    if (_gDate < 10) {
      _gDate = "0" + _gDate;
    }

    var _hours = d.getHours();
    if (_hours < 10) {
      _hours = "0" + _hours;
    }
    var _minutes = d.getMinutes();
    if (_minutes < 10) {
      _minutes = "0" + _minutes;
    }

    var _seconds = d.getSeconds();
    if (_seconds < 10) {
      _seconds = "0" + _seconds;
    }
    str += d.getFullYear() + '-';
    str += _month;
    // str += _gDate + ' ';
    // str += _hours + ':';
    // str += _minutes + ':';
    // str += _seconds + ' ';

    return str

  },
  getNowTimeHour: function () {
    //当前系统时间
    var d = new Date(),
      str = '';
    var td = d.getDay();

    var _month = d.getMonth() + 1;
    if (_month < 10) {
      _month = "0" + _month;
    }
    var _gDate = d.getDate();
    if (_gDate < 10) {
      _gDate = "0" + _gDate;
    }

    var _hours = d.getHours();
    if (_hours < 10) {
      _hours = "0" + _hours;
    }
    var _minutes = d.getMinutes();
    if (_minutes < 10) {
      _minutes = "0" + _minutes;
    }

    var _seconds = d.getSeconds();
    if (_seconds < 10) {
      _seconds = "0" + _seconds;
    }
    str += d.getFullYear() + '-';
    str += _month + '-';
    str += _gDate + ' ';
    str += _hours;
    return str

  },
  getNowTimeStr: function () {
    //当前系统时间
    var d = new Date(),
      str = '';
    var td = d.getDay();

    var _month = d.getMonth() + 1;
    if (_month < 10) {
      _month = "0" + _month;
    }
    var _gDate = d.getDate();
    if (_gDate < 10) {
      _gDate = "0" + _gDate;
    }

    var _hours = d.getHours();
    if (_hours < 10) {
      _hours = "0" + _hours;
    }
    var _minutes = d.getMinutes();
    if (_minutes < 10) {
      _minutes = "0" + _minutes;
    }

    var _seconds = d.getSeconds();
    if (_seconds < 10) {
      _seconds = "0" + _seconds;
    }
    str += d.getFullYear() + '';
    str += _month + '';
    str += _gDate + '';
    str += _hours + '';
    str += _minutes + '';
    str += _seconds + '';
    return str
  },
  getRightTime: function (str) {

    var str1 = str.substring(0, 4) + "-" + str.substring(4, 6) + "-" + str.substring(6, 8) + " " + str.substring(8, 10) + ":" + str.substring(10, 12) + ":" + str.substring(12, 14)
    return str1
  }
}
var publicParams={ 
  yesNot:[
      {title:"是",value:"是"},
      {title:"否",value:"否"}
  ],
  yesNotYN:[
      {title:"是",value:"Y"},
      {title:"否",value:"N"}
  ]
}