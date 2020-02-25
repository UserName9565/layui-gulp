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

     initDiv(data.leftArr,"ag-map-left");
     initDiv(data.rightArr,"ag-map-right");

  }




  function initDiv(arr,selector) {

  }


	var mapChooser = new mapChooser();

  exports("mapChooser", mapChooser);
});
