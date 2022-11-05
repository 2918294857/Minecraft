import { PC_ZYL_table } from "../Table/PCTable.js";
var thModel = 1
var data = {
    HtmlID: 'newstable',//添加位置
    TheadData: ['最新技术', '计划学习'],//表头
    IsDataSeq: 'Seq2',
    TheadSeqName: '功能实现',
    IsEditBtn: true,
    IsDelBtn: true,
    TbodyPageCount: '5',
    TbodyData: []
}
FunctionRealization('功能实现')
$('#newstable table thead th:nth-child(1)').attr('class', 'table_th_color')

function FunctionRealization(text) {
    if (text == '功能实现') {
        data.TbodyData = [{

            content: '编辑组件1',
            rate: '进行中',
        },
        {

            content: '编辑组件2',
            rate: '进行中'
        },
        {

            content: '编辑组件3',
            rate: '进行中'
        },
        {

            content: '编辑组件4',
            rate: '进行中'
        },
        {

            content: '编辑组件5',
            rate: '进行中'
        },
        {

            content: '编辑组件6',
            rate: '进行中'
        },
        {

            content: '编辑表格组件7',
            rate: '进行中'
        }]
    }
    if (text == '最新技术') {
        data.TbodyData = []
    }
    if (text == '计划学习') {
        data.TbodyData = []
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
function newstable_table_BtnDel(data) { console.log(data) }
function newstable_table_BtnEdit(data) { console.log(data) }
export {
    newstable_table_BtnDel,
    newstable_table_BtnEdit
}

