import { PC_ZYL_table } from "../Table/PCTable.js";
var thModel = 1
var category=''
var data = {
    HtmlID: 'newstable',//添加位置
    TheadData: ['功能实现','最新技术', '计划学习'],//表头
    IsDataSeq: 'false',
    TheadSeqName: '',
    IsEditBtn: true,
    IsDelBtn: true,
    TbodyPageCount: '5',
    TbodyData: []
}
FunctionRealization('功能实现')
$('#newstable table thead th:nth-child(1)').attr('class', 'table_th_color')

function FunctionRealization(text) {
    if (text == '功能实现') {
        category='FP'
        $.ajax(
            {
                url: "http://127.0.0.1/api/FPData",
                async: false,
                success: function (result) {
                    data.TbodyData = result.FPData
                }
            });
    }
    if (text == '最新技术') {
        category='LT'
        $.ajax(
            {
                url: "http://127.0.0.1/api/LTData",
                async: false,
                success: function (result) {
                    data.TbodyData = result.LTData
                }
            });
    }
    if (text == '计划学习') {
        category='SL'
        $.ajax(
            {
                url: "http://127.0.0.1/api/SLData",
                async: false,
                success: function (result) {
                    data.TbodyData = result.SLData
                }
            });
    }
    PC_ZYL_table(data)
    monitor()
}
function monitor() {
    $('#newstable table thead th').on('click', function () {
        $(`#newstable table thead th:nth-child(${thModel})`).attr('class', 'table_th_color1')
        thModel = $(this).index() + 1
        FunctionRealization($(this).text())
        $(`#newstable table thead th:nth-child(${thModel})`).attr('class', 'table_th_color')
    })
}
function newstable_table_BtnDel(data) {
    $.ajax(
        {
            url: `http://127.0.0.1/api/Del${category}`,
            type:'post',
            async: false,
            data:data,
            success: function (result) {
            }
        });
    }
function newstable_table_BtnEdit(data) { 
    $.ajax(
        {
            url: `http://127.0.0.1/api/Edit${category}`,
            type:'post',
            async: false,
            data:data,
            success: function (result) {
            }
        });
 }
export {
    newstable_table_BtnDel,
    newstable_table_BtnEdit
}

