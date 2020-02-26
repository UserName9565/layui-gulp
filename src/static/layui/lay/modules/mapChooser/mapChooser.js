/**
 * @author xiacj
 *
 * @date 2020年02月25日 07:54:44
 *
 * layui-映射关系选择插件
 *
 * 1。两个输入参数，第一个参数定义该插件的依赖插件;第二个参数是回调函数，编写我们自定义插件的业务逻辑
 * 2.返回插件，调用exports函数，两个参数分别是 插件名称和插件对象
 *
 */
layui.define(['jquery','form' ],function(exports){


	"use strict";

	var $ = layui.jquery,form=layui.form;


	var mapChooser = function(){

  };


  //组件初始化方法
  mapChooser.prototype.init = function(data){

     initDiv(data.body.leftArr,".ag-map-left");
     if($(".ag-map-middle").length > 0){
       initDiv(data.body.middleArr,".ag-map-middle");
     }
     initRightDiv(data.body.rightArr,".ag-map-right");

     buildEvent();

  }

  function initDiv(arr,selector) {

    var ol = $('<ol class="dd-list"></ol>');

    for(var i=0; i < arr.length; i++){
      var li = $('<li class="dd-item" ></div>');
      var div=$('<div class="dd-handle">'+arr[i].optCode+"-"+arr[i].optName+'</div>');

      li.append(div);
      ol.append(li)
    }
    $(selector).append(ol);
  }

  function initRightDiv(arr,selector) {

    var ol = $('<ol class="dd-list"></ol>');

    for(var i=0; i < arr.length; i++){
      var li = $('<li class="dd-item" ></div>');
      var closeBtn = '<i class="layui-icon layui-icon-delete " style="font-size: 30px; color:red ;float:right;margin-top:0px;"></i> ';
      var div;
      console.log($(".ag-map-middle"));
      if($(".ag-map-middle").length > 0){
        div=$('<div class="dd-handle"><span>'+arr[i].sourceCode+"-"+arr[i].sourceCodeName+'||'+arr[i].targetCode+"-"+arr[i].targetCodeName+'</span>'+closeBtn+'</div>');
      }
      if($(".ag-map-input").length > 0){
        div=$('<div class="dd-handle"><span>'+arr[i].sourceCode+"-"+arr[i].sourceCodeName+"-"+arr[i].targetCode+'</span>'+closeBtn+'</div>');
      }
      li.append(div);
      ol.append(li)
    }
    $(selector).append(ol);
  }



  function buildEvent() {


    $(".dd").delegate('li', 'click', function() {

      $(this).parents("ol").find("li").removeClass("layui-this");

      $(this).addClass('layui-this');
    });


    $(".left-move i").click(function() {

      var rightli = $('<li class="dd-item" ></div>');
      var closeBtn = '<i class="layui-icon layui-icon-delete " style="font-size: 30px; color:red ;float:right;margin-top:0px;"></i> ';
      var rightDiv;
      var middleHtml;

      var leftSelect = $(".ag-map-left li.layui-this ");
      if (leftSelect.length == 0) {
        util.showDialog("请选择标准参数！", 0);
        return;
      }
      var leftHtml = leftSelect.find(".dd-handle").html();


      if($(".ag-map-middle").length > 0){
        var middleSelect = $(".ag-map-middle li.layui-this ");
        if (middleSelect.length == 0) {
          util.showDialog("请选择模板参数！", 0);
          return;
        }
        middleHtml = middleSelect.find(".dd-handle").html();
        rightDiv=$('<div class="dd-handle"><span>'+leftHtml+'||'+middleHtml+'</span>'+closeBtn+'</div>');
      }


      if($(".ag-map-input").length > 0){
         middleHtml =$(".ag-map-input input").val();
         if(util.isNull(middleHtml))
         {
           util.showDialog("转换格式不能为空！", 0);
           return;
         }
         rightDiv=$('<div class="dd-handle"><span>'+leftHtml+'-'+middleHtml+'</span>'+closeBtn+'</div>');
      }

      rightli.append(rightDiv);

      if ($(".ag-map-right>ol").length == 0) {

        $(".ag-map-right").append($('<ol class="dd-list"></ol>'));
      }
      $(".ag-map-right ol ").append(rightli);
      //将数据存入input
      var record = [];
      $.each($(".ag-map-right li div"), function(i, item) {
        var oneRightHtml=$(item).find("span").eq(0).html();
        record.push(oneRightHtml);
      });
      $("input[name='returnList']").val(record);
    });

    $(".ag-map-right").delegate('.layui-icon-delete', 'click', function() {

      var parentLi = $(this).parent().parent("li");
      parentLi.remove();
      var record = [];
      $.each($(".ag-map-right li div"), function(i, item) {
        var oneRightHtml=$(item).find("span").eq(0).html();
        record.push(oneRightHtml);
      });
      $("input[name='returnList']").val(record);
    });
  }


	var mapChooser = new mapChooser();

  exports("mapChooser", mapChooser);
});
