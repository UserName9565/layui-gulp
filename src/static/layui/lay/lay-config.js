

window.rootPath = (function (src) {
    src = document.scripts[document.scripts.length - 1].src;
   
    var astr = ''
    if(src.indexOf('modules')!=-1){
        astr = src.lastIndexOf('lay/')+3
    }else{
        astr = src.lastIndexOf('/')
    }
    return src.substring(0, astr);
})();
console.log(rootPath+ "/modules/")
layui.config({
    base: rootPath + "/modules/",
    version: true
}).extend({
    layuimini: "layuimini/layuimini", // layuimini扩展
    step: 'step-lay/step', // 分步表单扩展
    treetable: 'treetable-lay/treetable', //table树形扩展
    tableSelect: 'tableSelect/tableSelect', // table选择扩展
    iconPickerFa: 'iconPicker/iconPickerFa', // fa图标选择扩展
    echarts: 'echarts/echarts', // echarts图表扩展
    echartsTheme: 'echarts/echartsTheme', // echarts图表主题扩展
    wangEditor: 'wangEditor/wangEditor', // wangEditor富文本扩展
    layarea: 'layarea/layarea', //  省市县区三级联动下拉选择器
    dtree: 'dtree/dist/dtree', //树形结构
	checkForm:'checkForm/checkForm',  //表单校验
    mapChooser:'mapChooser/mapChooser'    //映射选择
});

// layui.config({
//     base: rootPath + "mymodules/",
//     version: true
// }).extend({
//     dtree: 'dtree/dtree'

// });
