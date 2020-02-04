
//JavaScript代码区域
layui.use(['layer', 'element', 'jquery'], function () {

    var urls = url.getName;
    
     
    publicFun.ajax(urls,common.type,{},success1);
    function success1(data){
        

      if(data.code==200){
        var obj = {};
        data = data.data
        obj.userId = data.userId;
        
        obj.userName = data.workAccount;
        obj.departNumber = data.workDepartNumber;
        obj.chName = data.workAccount;
        obj.channelNo = data.workChannelNo;
        $.cookie("getLogin", JSON.stringify(obj), {
          expires: 7, path: '/'
        })
        success();
      }else{
        layer.msg("查询失败")
      }
       
    }
    // success();
    function success(){
        //
     $('.loginName').html('<span class="dpn">个人资料</span>'+publicFun.getLogin("chName"))
        var layer = layui.layer;
          var element = layui.element;var firstTag = true;




        var index = {
            isShow : true,  //定义一个标志位，用于菜单伸缩
            tabAdd: function (elet) {//新增tab
                var _this = this;

                var len = $(".layui-tab-title li[lay-id='"+elet.attr("lay-href")+"']").length;

                if(len==0||len==undefined){

                        var str ='<iframe src="'+elet.attr("lay-href")+'" frameborder="0" ></iframe>'

                    var lensT = $(".layui-tab-title").find("li").length;
                    if(lensT>=10){
                        layer.alert("最多打开10个tab页");
                        return false;
                    }
                    //新增一个Tab项
                    element.tabAdd('test', {
                        title: elet.find("span").text(), //用于演示
                        content: str,
                        id: elet.attr("lay-href") //
                    })
                }
                // $(".layui-unselect").hide();
                $("span[lay-stope=tabmore]").hide();
                _this.widthBar(0);
                _this.tabChange(elet.attr("lay-href"))
            },
            tabDelete: function (href) {//删除指定Tab项

                element.tabDelete('test', href); //删除：“商品管理”
            },
            tabChange: function (href) {//切换到指定Tab项

                element.tabChange('test', href); //切换到：用户管理
            },
            menuThis:function(href){
                $(".layui-nav .layui-this").removeClass("layui-this")
                $(".layui-nav a[lay-href='"+href+"']").parent().addClass("layui-this")
            },
            widthBar:function(tag){//计算选项卡容器宽度
                var titleBar = $(".layui-tab-title");//容器
                var titleBarWidth =  titleBar.width();//容器宽度
                var cha =null;
                var widthLine = 0;//选项卡总宽度

                var prevWidth = Math.abs(parseFloat(titleBar.css("left")))//容器left的值
                var rightBoxWidth = null;//这是当前可见最右边的box之前选项卡总长度
                var nowTag = true;

                titleBar.find("li").each(function(i,o){//获取总宽度

                    widthLine+=$(this).outerWidth();//总宽度

                    if(nowTag){//点击右箭头时，此时视野中最后一个容器前面所有容器的长度


                        if(widthLine>=prevWidth+titleBarWidth){//计算，当此元素大于left+父容器宽度时。判定此容器是视野中最后一个元素

                            rightBoxWidth = widthLine - $(this).outerWidth()
                            nowTag = false;
                        }
                    }
                })

                if(tag==0){//选项卡正常伸缩

                    if(widthLine-prevWidth>titleBarWidth){//当选项卡总长度-left的长度>父容器宽度时
                        cha = titleBarWidth-widthLine;
                        titleBar.css("left",cha+"px")
                    }
                    if(widthLine-prevWidth==0){//当选项卡总长度-left的长度==0时

                        titleBar.css("left","-"+(parseFloat(prevWidth)-parseFloat(titleBar.find("li:last").outerWidth()))+"px")
                    }
                    if(widthLine<titleBarWidth){//当选项卡总长度<父容器长度时时
                        titleBar.css("left",0)
                    }

                }else if(tag==1){//向 right

                    if(rightBoxWidth!==null){

                        if(widthLine>titleBarWidth){

                            titleBar.css("left","-"+(rightBoxWidth)+"px")
                        }
                    }


                }else if(tag==2){//向 left
                    if(widthLine>titleBarWidth){
                        if(prevWidth>=titleBarWidth){

                            titleBar.css("left","-"+(prevWidth-titleBarWidth)+"px")
                        }else{
                            titleBar.css("left",0)
                        }
                    }else{
                        titleBar.css("left",0)
                    }
                }


            },
            menuOn:function(json){//垂直菜单栏生成

                var str = '';
                var _this = this;
                $.each(json,function(i,o){
                    if(cv==1){
                        var cvTag = (o.pid=="0")
                        var myId = o.id;
                        var title = o.title;
                        var layHref = o.layHref;
                        var icon = o.icon;
                    }else{

                        cvTag = true;
                        var myId = o.parentId;
                        var title  = o.permisssionName;
                        var layHref = o.url

                        var icon = null;
                        if(myId=="1"){//基础功能
                            icon = "&#xe702;"
                        }else if(myId=="2"){
                            icon = "&#xe640;"
                        }else if(myId=="3"){//证书管理
                            icon = "&#xe640;"
                        }else if(myId=="4"){//渠道管理
                            icon = "&#xe65c;"
                        }else if(myId=="5"){//模板管理
                            icon = "&#xe667;"
                        }else if(myId=="6"){//报表统计
                            icon = "&#xe607;"
                        }else if(myId=="7"){//操作审计
                            icon = "&#xe686;"
                        }else if(myId=="8"){//签章接口测试
                            icon = "&#xe698;"
                        }else if(myId=="9"){//业务管理
                            icon="&#xe631;"
                        }else if(myId=="10"){
                            icon="&#xe606;"
                        }
                    }

                    if(cvTag){


                    str+='<li class="layui-nav-item">'
                    //var tag = _this.sonIs(myId,json);//判断是否有子孙
                    //if(tag){//有子孙

                        str+='<a  class="fSon" href="javascript:;"><i class="icon iconfont">'+icon+'</i> <span>'+title+'</span></a>'
                            +'<dl class="layui-nav-child">'
                            if(cv==1){
                                str+=_this.menuSon(myId,json)//子节点展示函数
                            }else{
                                    $.each(o.subPermission,function(n,b){
                                        str+='<dd>'
                                        +'<a lay-href="'+b.url+'"><span title='+b.permisssionName+'>'+b.permisssionName+'</span></a>'
                                        +'</dd>'
                                    })



                            }
                            str+='</dl>'
                    //}
                    // else{

                    //     str+='<a  lay-href="'+layHref+'"><i class="icon iconfont">'+o.icon+'</i> <span>'+title+'</span></a>'//若无子孙，则直接展示

                    // }
                    str+=' </li>';


                    }

                })
                $(".menuAgile").append(str)
            },
            menuSon:function(id,json){//传入父辈id
                var _this =this;
                var str = '';

                var tag = true;
                $.each(json,function(i,o){
                    if(cv==1){
                        var pId = o.pid;
                        var myId = o.id;
                        var title  = o.title;
                        var layHref = o.layHref
                    }else{
                        if (o.parentFunction) {
                          var pId = o.parentFunction.functionCode;
                        }
                        var myId = o.functionCode;
                        var title  = "["+o.functionCode+"]"+o.functionName;
                        var title2 = o.functionName;
                        var layHref = o.jspUrl
                    }
                    if(pId==id){//找到是父亲的儿子数据
                        var tag = _this.sonIs(myId,json);//判断是否有儿子
                        if(tag){//有儿子

                            str+='<dd>'
                                +'<a href="javascript:;" class="menu_three"  ftrue="1"><span>'+title2+'</span></a>'
                                +'<ol class="layui-nav-child">'
                                +_this.menuGSon(myId,json)//调用孙生成节点函数
                                +'</ol>'
                                +'</dd>'

                        }else{//无儿子

                            str+='<dd>'
                                +'<a lay-href="'+layHref+'"><span title='+title+'>'+title+'</span></a>'
                            +'</dd>'

                        }

                    }
                })

                return str

            },
            menuGSon:function(id,json){//传入父节点id
                var str = '';
                var _this =this;

                var tag = true;

                $.each(json,function(i,o){
                    if(cv==1){
                        var pId = o.pid;

                        var title  = o.title;
                        var layHref = o.layHref
                    }else{
                        if(o.parentFunction){                          var pId = o.parentFunction.functionCode;                     }

                        var title  = "["+o.functionCode+"]"+o.functionName;
                        var layHref = o.jspUrl
                    }
                    if(pId==id){//找到父节点的子数据
                        str+='<li>'
                            +'<a lay-href="'+layHref+'"><span  title='+title+'>'+title+'</span></a>'
                        +'</li>'
                    }
                })

                return str

            },
            sonIs:function(id,json){//查找是否有儿子
                var tag = false;

                $.each(json,function(i,o){
                    if(cv==1){
                        var pId = o.pid;


                    }else{



                            if(o.parentFunction){                          var pId = o.parentFunction.functionCode;

                            }



                    }
                    if(pId==id){
                        tag=true;
                    }
                })
                return tag;
            },
            shrink:{
                tag:null,
                init:function(){

                    var _this =this;

                    //判断isshow的状态
                    if(index.isShow){
                       this.retraction();
                    }else{
                        this.stretch();
                    }
                },
                retraction:function(){//收回
                    //选择出所有的span，并判断是不是hidden
                    $(".menuAgile").find('.layui-nav-item span').each(function(){
                        if($(this).is(':hidden')){
                            $(this).show();
                        }else{
                            $(this).hide();
                        }
                    });
                    var _this = this;
                    $('.layui-side.layui-bg-black').width(60); //设置宽度
                    $(".menuAgile").find(".layui-nav-item").width(60);
                    $(".menuAgile").find(".shrink").width(60);
                    $(".menuAgile").find(".shrink i").css("margin-right","15%")
                    $(".layui-body").css("left","80px")
                    //将footer和body的宽度修改
                    $('.layadmin-pagetabs').css('left', 60+'px');
                    $('.layui-footer').css('left', 60+'px');
                    //将二级导航栏隐藏
                    $('dd').each(function(){
                        $(this).hide();
                    });
                    //修改标志位
                    index.isShow =false;
                    _this.hoverFun(index.isShow);
                },
                stretch:function(){//伸出
                    //选择出所有的span，并判断是不是hidden
                    $(".menuAgile").find('.layui-nav-item span').each(function(){
                        if($(this).is(':hidden')){
                            $(this).show();
                        }else{
                            $(this).hide();
                        }
                    });
                    var _this =this;
                    $('.layui-side.layui-bg-black').width(220);
                    $(".menuAgile").find(".layui-nav-item").width(220);
                    $(".menuAgile").find(".shrink").width(220);
                    $(".menuAgile").find(".shrink i").css("margin-right","0")
                    $('.layadmin-pagetabs').css('left', 220+'px');
                    $('.layui-footer').css('left', 220+'px');
                    $(".layui-body").css("left","220px")
                    $('dd').each(function(){
                        $(this).show();
                    });
                    index.isShow =true;
                    _this.hoverFun(index.isShow);
                },
                hoverFun:function(tag){//左竖菜单缩进去时，鼠标移入移除变化
                     var _this = this;
                    if(!tag){

                        $(".menuAgile").find(".layui-nav-item").on("mouseenter",function(){
                            var tipText = $(this).find("span").html()
                            if(tipText){

                                _this.tip = layer.tips(tipText,$(this));
                            }
                        })
                        $(".menuAgile").find(".layui-nav-item").on("mouseleave",function(){
                            layer.close(_this.tip)
                        })
                    }else{

                        $(".menuAgile").find(".layui-nav-item").off("mouseenter");
                        layer.close(_this.tip)
                    }
                }

            }


        }



        if(cv==1){
            index.menuOn(json);
            element.render('nav');
            $(".adminWin").attr("src",$(".adminWin").attr("u-src"))
       }else{

           var obj = {

           }
           publicFun.ajax(url.menu,common.type,obj,success)
            function success(data){
              index.menuOn(data.data.roles[1].permsExt);
              element.render('nav');
              /////ifram
              var urls = $(".adminWin").attr("u-src");
              //common.getUrl($(".adminWin").attr("u-src"));
              $(".adminWin").attr("src",urls)
            }
        }


        $(".menu_three").on("click", function () {
            if($(this).attr("ftrue")==1){
                $(this).next().show();
                $(this).attr("ftrue",0);
            }else{
                $(this).attr("ftrue",1);
                $(this).next().hide();
            }
        })
        $("ol").on("click", "li a", function () {//三级
            // $.each($(this).parent().siblings(), function (i, e) {
            //     $(e).find("a").removeClass('three_this')
            // });
            $(this).parent().siblings().find("a").removeClass('three_this')
            $(this).addClass('three_this');// 添加当前元素的样式
        })

        element.on('nav(test)', function (elem,e) {//监听左侧菜单栏

            if(elem.attr("lay-href")){//如果存在lay-href属性，则调用index.tabAdd方法
                index.tabAdd(elem);
            }
        });

        element.on('tabDelete(test)', function(data){//删除tab页监听
           var box =  $(".layui-tab-title").find("li");
           if(box.eq(data.index+1).lenth>0){

               box.eq(data.index+1).click();
           }else{
                box.eq(data.index-1).click();
           }

            index.widthBar(0);
        });
        element.on('tab(test)', function(data){//监听tab页变化  则调用左侧菜单高亮匹配函数

            index.menuThis(data.elem.find("li").eq(data.index+1).attr("lay-id"));
        });

        $(".shrink").on("click",function(){//左菜单栏伸缩点击事件
            index.shrink.init();
        })
        $(".menuAgile").find(".layui-nav-item").on("click",function(){//当边框缩起来，点击图标，但菜单有多级时，索要恢复菜单栏状态
            if(!index.isShow){

                if($(this).find("dl").length>0){

                    index.shrink.stretch();
                }
            }
        })
        $(".quit").on("click",function(){//退出
            $.cookie("getLogin",null, { path: '/'})
            $.cookie("JSESSIONID_token",null, { path: '/'})
            
            location.href = "../index.html"
        })
        $("div[layadmin-event=rightPage]").on("click",function(){//选项卡右箭头点击事件

            index.widthBar(1)
        })
        $("div[layadmin-event=leftPage]").on("click",function(){//选项卡左箭头点击事件
            index.widthBar(2)
        })

        $(".webPage").on("mouseenter",function(){//选项卡最右边的鼠标移入变化
            $(this).find(".layui-this").removeClass("layui-this")
            $(this).find("dl").show();

        })
        $(".webPage").on("mouseleave",function(){//选项卡最右边的鼠标移出变化
            $(this).find("dl").hide();
        })
        $("dd[layadmin-event=closeThisTabs]").on('click',function(){//选项卡最右边关闭当前选项卡
             var nowTab = $(".layui-tab-title").find(".layui-this").attr("lay-id");
             if($(".layui-tab-title").find(".layui-this").index()!=0){

                 index.tabDelete(nowTab)
             }
            $(".webPage").find("dl").hide();
            index.widthBar(0)
        })
        $("dd[layadmin-event=closeOtherTabs]").on('click',function(){//选项卡最右边关闭其他选项卡

            $(".layui-tab-title").find("li").not(".layui-this").each(function(i,o){
                if(i!=0){
                    index.tabDelete($(this).attr("lay-id"))
                }
            })
            $(".webPage").find("dl").hide();
            index.widthBar(0)
        })
        $("dd[layadmin-event=closeAllTabs]").on('click',function(){//选项卡最右边关闭所有选项卡
            $(".layui-tab-title").find("li").each(function(i,o){
                if(i!=0){
                    index.tabDelete($(this).attr("lay-id"))
                }
            })
            index.widthBar(0)
            $(".webPage").find("dl").hide();
        })
        $('.loginName').on("click",function(){
            var chan = publicFun.getLogin("channelNo");
            if(chan!="DQHR1001"){
                index.tabAdd($(this))
            }
        })
        $('.apiB').on("click",function(){
            index.tabAdd($(this))
        })
    }
})
