/**
 *
 * 扩展按钮事件处理
 *
 * @author xiacj
 * @version 1.0
 * @date 2020-02-16
 *
 */
layui.use(['form', 'table', 'checkForm','laydate'], function() {

    var form = layui.form,
    layer = layui.layer,
    $ = layui.$;
    table = layui.table;
    checkForm = layui.checkForm;
    laydate = layui.laydate;


  	var $window = $(window);

  	/**
  	 * 获取表单json格式参数
  	 *
  	 * @param {Object} formId
  	 */
  	function getFormJson(form){

  		var paramJson = {};
  		var arr = $(form).find("input");

      for(var i = 0; i < arr.length; i++){

          paramJson[arr[i].name] = $(arr[i]).val();
      }

      var arr2 = $(form).find("select");
      for(var i = 0; i < arr2.length; i++){

        paramJson[arr2[i].name] = $(arr2[i]).val();
        var nameKey = $(arr2[i]).attr("ag-sel-name");
        var text = $(arr2[i]).find("option:selected").text();
        paramJson[nameKey] = text;
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

      $(".ag-btn-cancel").unbind();
      $(".ag-btn-cancel").bind("click",cancel);

      $(".ag-btn-save").unbind();
      $(".ag-btn-save").bind("click",save);

      $(".ag-btn-del").unbind();
      $(".ag-btn-del").bind("click",del);


  };


  	/**
  	 *
  	 * 处理分页按钮事件,数据加载之后调用
  	 *
  	 */
  	function addPageLisnr(page,index){

      var pageHtml = '<a href="#" rel="pre" class="ag-btn-page-pre">&lt; 上一页</a> <a href="#" rel="next" class="ag-btn-page-next">下一页&gt;</a><span id="totalPageSpan"></span>|<span id="totalRecordSpan"></span>|<span id="pageNoSpan"></span>';
      $(".ag-area-page").html(pageHtml);

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
     var agCtx = util.getAgCtx(this);
     url = ctx + "/" + agCtx + url;
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
    var tableId = $("table[ag-data-index="+index+"]").attr("id");
		var checkStatus = table.checkStatus(tableId);
    var data = checkStatus.data;  //获取选中行数据
    if(data.length == 0){

      util.warning('请选择一条数据库记录!');
      return ;
    }

    var pkCol = $(this).attr("ag-data-pk");
    if(util.isNull(pkCol)){
      pkCol = "id";
    }

    var pkVal = data[0][pkCol];


    var index = $(this).attr("ag-data-index");
    var url = $(this).attr("ag-data-url");
    var winId = $(this).attr("ag-win-id");
    var winW = $(this).attr("ag-win-width");
    var winH = $(this).attr("ag-win-height");
    var title =  $(this).attr("ag-win-title");

	var agCtx = util.getAgCtx(this);
		
	url = apiConfig[agCtx+"_web"] + url;
    if(url.indexOf("?") == -1){
      url = url + "?" + pkCol + "=" + pkVal;
    }else{
      url = url + "&" + pkCol + "=" + pkVal;
    }

    var opts = {"winId":winId}
    util.openWin(url,title,winW,winH,opts);

  };

  function cancel(){
    util.closeWin();
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

      var opts = {"winId":winId}
	  
	  var agCtx = util.getAgCtx(this);
	  
	  url = apiConfig[agCtx+"_web"] + url;
	  
      util.openWin(url,title,winW,winH,opts);

  	};

 /***
  *保存方法-增加或者修改的保存方法
  *
  **/
  function save(){

  		var index = $(this).attr("ag-data-index");
      var form = $(".ag-form[ag-data-index="+index+"]");

      var checkRet = checkForm.validateForm(form);
      if(!checkRet){
        return false;
      }

  	  var agCtx = util.getAgCtx(this);
  	
  	  var url = ctx + "/" + agCtx + $(this).attr("ag-data-url");
      var param = getFormJson(form);

      $.ajax({
            type:"POST",
            url:url,
            data:JSON.stringify(param),
            contentType:"application/json",
            xhrFields: {
                withCredentials: false //跨域session保持
              },
            async: true ,
            dataType:"json",
            success:function(data){

                 var result = data.result;
                 var desc = data.desc;

                 if(result == 0){
                    util.success(desc);

                    var queryBtn = parent.layui.$(".ag-btn-query");
                    if(queryBtn.length > 0){
                      $(queryBtn).click();
                      //util.closeWin();
                    }
                 }else{
                    util.error(desc);
                 }

             }
          });


  };

  function del(){

	  var index = $(this).attr("ag-data-index");
    var tableId = $("table[ag-data-index="+index+"]").attr("id");
		var checkStatus = table.checkStatus(tableId);
    var data = checkStatus.data;  //获取选中行数据
    if(data.length == 0){

      util.warning('请选择一条数据库记录!');
      return ;
    }

    var pkCol = $(this).attr("ag-data-pk");
    if(util.isNull(pkCol)){
      pkCol = "id";
    }

    var pkVal = data[0][pkCol];
    var opts= {"index":index};

    util.showDialog("您确定要删除选中记录么?",3,doDel,opts);

  }

  function doDel(opts){

    var index = opts.index;
    var tableId = $("table[ag-data-index="+index+"]").attr("id");
    var checkStatus = table.checkStatus(tableId);
    var data = checkStatus.data;  //获取选中行数据

    var btn = $(".ag-btn-del[ag-data-index="+index+"]")
    var pkCol = $(btn).attr("ag-data-pk");
    if(util.isNull(pkCol)){
      pkCol = "id";
    }

    var pkVal = data[0][pkCol];

    var param = {};
    param[pkCol] = pkVal;
	
	var url = ctx +"/"+util.getAgCtx(btn)+ $(btn).attr("ag-data-url");

    $.ajax({
          type:"POST",
          url:url,
          data:JSON.stringify(param),
          contentType:"application/json",
          xhrFields: {
              withCredentials: false //跨域session保持
            },
          async: true ,
          dataType:"json",
          success:function(data){

               var result = data.result;
               var desc = data.desc;

               if(result == 0){
                  util.success(desc);

                  var queryBtn = layui.$(".ag-btn-query");
                  if(queryBtn.length > 0){
                    $(queryBtn).click();
                  }
               }else{
                  util.error(desc);
               }

           }
        });




  }



  /**
   * 初始化表单数据-修改表单
   *
   */
  function initForm(){


    var param = util.getUrlParam();

    $(".ag-form").each(function(idx,agForm){

        var condiCnt = 0;
        var dataUrl = $(agForm).attr("ag-data-url");

        if(!util.isNull(dataUrl)){

          for(var name in param){

             var val = param[name];

             if(!util.isNull(val)){
               $(agForm).find("input[name="+name+"],select[name="+name+"]").val(val);
               condiCnt++;
             }
          }

          var formParam = getFormJson($(agForm));
          //加载数据并补充初始化表单
		  var url = ctx +"/"+util.getAgCtx(form) + dataUrl;
          $.ajax({
            type:"POST",
            url:url,
            data:JSON.stringify(formParam),
            contentType:"application/json",
            xhrFields: {
                withCredentials: false //跨域session保持
              },
            async: true ,
            dataType:"json",
            success:function(data){

                for(var name in data){

                     var val = data[name];
                     if(!util.isNull(val)){
                       $(agForm).find("input[name="+name+"]").val(val);
                     }

                     if(name.endsWith("Opt")){

                       var optArr = data[name];
                       var selectStr = "";
                       for(var i = 0; i < optArr.length; i++){
                         var selectedStr = optArr[i].selected;
                         if(util.isNull(selectedStr)){
                           selectedStr = "";
                         }

                          var optBean = "<option value='"+optArr[i].optCode+"' "+selectedStr+">"+optArr[i].optName+"</option>";
                          selectStr = selectStr + optBean;
                       }



                       var selObj = $("select[name="+name.substr(0,name.length -3)+"]");
                       $(selObj).html(selectStr);
                       form.render('select');
                     }

                  }


             }
          });


        }




    });


    renderForm();


  }

  //渲染表单-date
  function renderForm(){
    var agDateArr = $(".ag-date");
     $(agDateArr).each(function(idx,input){
        laydate.render({
           elem: input,
           type: $(input).attr("ag-date-format")
         });
     });
  }


  $(document).ready(function(){

      initBtnLsnr();

      initForm();

  });










});
