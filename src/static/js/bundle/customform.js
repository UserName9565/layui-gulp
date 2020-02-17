/**
 *
 * 扩展按钮事件处理
 *
 * @author xiacj
 * @version 1.0
 * @date 2020-02-16
 *
 */
layui.use(['form', 'table'], function() {

    var form = layui.form,
    layer = layui.layer,
    $ = layui.$;
    table = layui.table;



  	var $window = $(window);

  	/**
  	 * 获取表单json格式参数
  	 *
  	 * @param {Object} formId
  	 */
  	function getFormJson(form){

  		var paramJson = {};
  		var arr = $(form).find("input,select");

      for(var i = 0; i < arr.length; i++){

          paramJson[arr[i].name] = $(arr[i]).val();
      }

  		return paramJson;
  	};



/**
	 * 初始化查按钮的点击事件
	 *
	 */
	function initBtnLsnr(){

      $(".ag-btn-query").unbind();
      $(".ag-btn-query").bind("click",queryList);

      $(".ag-btn-add").unbind();
      $(".ag-btn-add").bind("click",addInit);

      $(".ag-btn-update").unbind();
      $(".ag-btn-update").bind("click",updateInit);

  };


  	/**
  	 *
  	 * 处理分页按钮事件,数据加载之后调用
  	 *
  	 */
  	function addPageLisnr(page,index){


  		//上一页
  		$(".ag-btn-page-pre").unbind();
  		$(".ag-btn-page-pre").bind("click",function(){

  			var pageNo = parseInt(page.pageNo);
  			if(pageNo >= 2){

  				pageNo = pageNo - 1;
  				var pageSize = page.pageSize;


  				var pageJson = {"pageNo":pageNo,"pageSize":pageSize};
  				var pageJsonStr = JSON.stringify(pageJson);
  				$("input[name=page]").val(pageJsonStr);

  				$(".ag-btn-query[ag-data-index="+index+"]").click();

  			}


  		});

  		//下一页
  		$(".ag-btn-page-next").unbind();
  		$(".ag-btn-page-next").bind("click",function(){

  			var pageNo = parseInt(page.pageNo);
  			var totalPage = parseInt(page.totalPage);

  			if((pageNo + 1) <= totalPage){

  				pageNo = pageNo + 1;
  				var pageSize = page.pageSize;
  				var pageJson = {"pageNo":pageNo,"pageSize":pageSize};
  				var pageJsonStr = JSON.stringify(pageJson);
  				$("input[name=page]").val(pageJsonStr);

  				$(".ag-btn-query[ag-data-index="+index+"]").click();
  			}

  		});


  		$("#totalPageSpan").html("总页数:"+page.totalPage);
  		$("#totalRecordSpan").html("总记录数:"+page.totalRecord);
  		$("#pageNoSpan").html("当前页:"+page.pageNo);

  	};

  /**
   *
   * 查询方法
   */
  function queryList(){


      var index = $(this).attr("ag-data-index");
      var form = $(".ag-form[ag-data-index="+index+"]");
      var url = $(this).attr("ag-data-url");
      var pageInput = $(".ag-form[ag-data-index="+index+"] > input[name=page]");

      if(pageInput.length == 0){
        var input = $("<input type='hidden' name='page' value=''>");
        $(".ag-form[ag-data-index="+index+"]").append(input);
        $(input).val('{"pageNo":"1","pageSize":"20"}');
      }
      var param = getFormJson($(".ag-form[ag-data-index="+index+"]"));
      url = ctx + url;
      $.ajax({
        type:"POST",
        url:url,
        data:JSON.stringify(param),
        contentType:"application/json",
        beforeSend:function(req){
          var page = $("input[name=page]").val();
          req.setRequestHeader("page",page);
        },
        xhrFields: {
            withCredentials: false //跨域session保持
          },
        async: true ,
        dataType:"json",
        success:function(page){

              var colsStr = $(".ag-table-header[ag-data-index="+index+"]").html();

              var cols = $.parseJSON(colsStr);
              //执行一个 table 实例
              table.render({
                  elem:  $(".ag-table[ag-data-index="+index+"]"),
                  height: 420,
                  data: page.data, //数据接口
                  title: '用户表',
                  page: false, //开启分页
                  toolbar: 'default', //开启工具栏，此处显示默认图标，可以自定义模板，详见文档
                  totalRow: false, //开启合计行
                  cols: cols
              });

              addPageLisnr(page,index);
          }
      });
  };

 	/**
  *
  * 修改初始化方法
  *
  ***/
  function updateInit(){

    var index = $(this).attr("ag-data-index");
    var url = $(this).attr("ag-data-url");
    var winId = $(this).attr("ag-win-id");
    var winW = $(this).attr("ag-win-width");
    var winH = $(this).attr("ag-win-height");
    var title =  $(this).attr("ag-win-title");

    util.openWin(winId,title,url,winW,winH);

  };


  	/**
  	*添加初始化方法
  	*
  	***/
  	function addInit(){

  		var index = $(this).attr("ag-data-index");
  		var url = $(this).attr("ag-data-url");
  		var winId = $(this).attr("ag-win-id");
  		var winW = $(this).attr("ag-win-width");
  		var winH = $(this).attr("ag-win-height");
  		var title =  $(this).attr("ag-win-title");

  		util.openWin(winId,title,url,winW,winH);

  	};

  $(document).ready(function(){

      initBtnLsnr();

  });










});
