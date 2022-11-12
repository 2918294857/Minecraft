var navitem = sessionStorage.getItem("KIndexs").split(',')
var Parameter = sessionStorage.getItem("Parameter")
var nav_select = `nav_${Parameter}`
var str = ''
nav_init()
nav_Click()
function nav_init() {
    for (var i = 0; i < navitem.length; i++) {
        if (navitem[i] == Parameter) {
            str += `<div id="nav_${navitem[i]}" class="nav_Color"><img class="icon1" src="../Img/itemize.png" alt="">${navitem[i]}</div>`
        }
        else {
            str += `<div id="nav_${navitem[i]}"><img class="icon1" src="../Img/itemize.png" alt="">${navitem[i]}</div>`
        }

    }
    $('nav').append(str)
}
function nav_Click() {
    $('nav div').on('click', function () {
        $(`#${nav_select}`).attr('class', '')
        nav_select = this.id
        $(`#${this.id}`).attr('class', 'nav_Color')
        Parameter = this.id.replace('nav_', '');
        sessionStorage.setItem('Parameter', Parameter)
        Table()
    })
}
//#region Table
Table()
function Table() {
    var data = {
        HtmlID: 'newstable',//添加位置
        TheadData: ['ID','标题','内容'],//表头
        IsDataSeq: 'none',
        ThWidth:['10%','35%','40%'],
        BtnThWidth:'15%',
        TheadSeqName: '序号',
        IsEditBtn: true,
        IsDelBtn: true,
        TbodyPageCount: '25',
        TbodyData: []
    }


    $.ajax(
        {
            url: "http://127.0.0.1/api/GetK",
            data: {
                indexs: Parameter
            },
            async: false,
            success: function (result) {
                data.TbodyData=result.Kdata   
            }
        });

        Long.Table(data)

}
function newstable_table_BtnDel(data) {
    $.ajax(
        {
            url: `http://127.0.0.1/api/DelK`,
            type: 'post',
            async: false,
            data: data,
            success: function (result) {
            }
        });

}
function newstable_table_BtnEdit(data) {
    $.ajax(
        {
            url: `http://127.0.0.1/api/EditK`,
            type: 'post',
            async: false,
            data: data,
            success: function (result) {
            }
        });
}
//#endregion
