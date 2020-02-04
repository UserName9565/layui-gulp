var common = {

    getString: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURIComponent(r[2]);
        } else {
            return null;
        }
    },
    IEVersion:function() {
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
        var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器  
        var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器  
        var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
        if(isIE) {
            var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
            reIE.test(userAgent);
            var fIEVersion = parseFloat(RegExp["$1"]);
            if(fIEVersion == 7) {
                return 7;
            } else if(fIEVersion == 8) {
                return 8;
            } else if(fIEVersion == 9) {
                return 9;
            } else if(fIEVersion == 10) {
                return 10;
            } else {
                return 6;//IE版本<=7
            }   
        } else if(isEdge) {
            return 'edge';//edge
        } else if(isIE11) {
            return 11; //IE11  
        }else{
            return -1;//不是ie浏览器
        }
    },
    eleEvent:function(filter,type,fun1,fun2){
        /***
         * filter 判断具体元素
         * type 判断调用函数
         * fun1  单选回调
         * fun2 全选回调
         */
        var argumentsLen = arguments.length
        if(type==="multiple"){
            multiple();//多选加全选功能
        }
        function multiple(){//多选加全选功能
            
            $('.ag-checkall[checkfor='+filter+']').off("click").on("click",function(){
                 
                var checkfor  =filter;
                var status = $(this).hasClass("check-active");
                if(status){
                    $("[checkname="+checkfor+"]").removeClass("check-active")
                    $(this).removeClass("check-active")
                }else{
                    $(this).addClass("check-active")
                    $("[checkname="+checkfor+"]").addClass("check-active")
                }
                
                if(argumentsLen>2){
                    fun2($(this),!status);
                }
            })
            $(".ag-checkbox[checkname="+filter+"]").off("click").on("click",function(){
                var checkname  = filter;
                var status =$(this).hasClass("check-active")
                var len = $("[checkname="+checkname+"]").length;
               
                if(status){
                    $("[checkfor="+checkname+"]").removeClass("check-active")
                    $(this).removeClass("check-active")
                }else{
                    $(this).addClass("check-active")
                    
                }
                if(argumentsLen>=2){
                    fun1($(this),!status);
                }
                var lens = $(".check-active[checkname="+checkname+"]").length;
                
                if(lens==len){
                    $("[checkfor="+checkname+"]").addClass("check-active");
                    if(argumentsLen>2){
                        fun2($(this),!status);
                    }
                }
                 
            })

        }
        
    }
      

}


var ctx = "";
var url = {
    login:ctx+""
}
 
 