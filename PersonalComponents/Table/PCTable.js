function PC_ZYL_table(TableData) {
    var HtmlID = TableData.HtmlID
    var TheadData = typeof (TableData.TheadData) == "undefined" ? [] : TableData.TheadData
    var TbodyData = TableData.TbodyData
    var TbodyDataKey = TbodyDataKey()
    var IsDataSeq = TableData.IsDataSeq
    var TheadSeqName = TableData.TheadSeqName
    var TheadBtnName = TableData.TheadBtnName
    var IsEditBtn = TableData.IsEditBtn
    var IsDelBtn = TableData.IsDelBtn
    var TbodyDataLength = TableData.TbodyDataLength
    var TbodyPageCount = TableData.TbodyPageCount
    var PagesCount = 1  //当前页数
    var backups = ''//备份
    TableHtml()
    Thead_Th()
    IsTheadData()//判断是否有表头
    IsPaging()//判断是否分页

    function IsTheadData() {
        if (TheadData.length == 0) {
            $(`#${HtmlID}_Tbody`).css('height', '100%')
        }
    }

    function IsPaging() {
        if (TbodyPageCount != 'All') {
            PageHtml()
            if (TbodyDataLength < TbodyPageCount) { Tbody_Td(0, TbodyDataLength - 1) }
            else { Tbody_Td(0, TbodyPageCount - 1) }
        }
        else {
            Tbody_Td(0, TbodyDataLength - 1)
        }
    }

    function TableHtml() {
        var tables = `<table class="PC_ZYL_table" border="0"><thead id="${HtmlID}_Thead"></thead><tbody id="${HtmlID}_Tbody"></tbody></table>`
        $(`#${HtmlID}`).html(tables)
    }

    function Thead_Th() {
        var TheadHtml = ''
        if ((IsDataSeq == 'Seq1' || IsDataSeq == 'Seq2') && TheadData.length != 0) {
            TheadHtml += `<th>${TheadSeqName}</th>`
        }
        for (var i = 0; i < TheadData.length; i++) {
            TheadHtml += `<th>${TheadData[i]}</th>`
        }
        if ((IsEditBtn || IsDelBtn) && TheadData.length != 0) {
            TheadHtml += `<th>${TheadBtnName}</th>`
        }
        $(`#${HtmlID}_Thead`).html(TheadHtml)
    }

    function TbodyDataKey() {
        var key = []
        for (var d in TbodyData[0]) {
            key.push(d)
        }
        return key
    }

    function Tbody_Td(start, end) {
        var TbodyHtml = ''
        for (var i = start; i <= end; i++) {
            if (i % 2 == 0) {
                TbodyHtml += `<tr id="Tbody_Tr${i}" class="SeparateColor" >`
            }
            else {
                TbodyHtml += `<tr id="Tbody_Tr${i}">`
            }

            if (IsDataSeq == 'Seq1' || IsDataSeq == 'Seq2') {
                if (IsDataSeq == 'Seq1') {
                    TbodyHtml += '<td>' + (i + 1) + '</td>'
                }
                else {
                    TbodyHtml += '<td>' + (i - TbodyPageCount * (PagesCount - 1) + 1) + '</td>'
                }
            }

            for (var j = 0; j < TbodyDataKey.length; j++) {
                TbodyHtml += '<td>' + eval(`TbodyData[i].${TbodyDataKey[j]}`) + '</td>'
            }

            if (IsEditBtn || IsDelBtn) {
                TbodyHtml += '<td>'
                if (IsEditBtn) {
                    TbodyHtml += '<button contenteditable="false" class="PC_ZYL_Btn PC_ZYL_table_BtnEdit">编辑</button>'
                }
                if (IsDelBtn) {
                    TbodyHtml += '<button contenteditable="false" class="PC_ZYL_Btn PC_ZYL_table_BtnDel">删除</button>'
                }
                TbodyHtml += '</td>'
            }
            TbodyHtml += '</tr>'
        }

        $(`#${HtmlID}_Tbody`).html(TbodyHtml)
        TableBtn();//按钮事件
    }

    function TableBtn() {
        $('.PC_ZYL_table_BtnEdit').on('click', function () {
            if ($(this).text() == '编辑') {
                if (backups == "") {
                    backups = $(this.parentNode.parentNode.parentNode).html()//备份 用于取消按钮
                    $(this).html('保存')
                    $(this.nextSibling).html('取消')
                    IsEdit(this.parentNode.parentNode, 'true')
                    $(this.parentNode.parentNode).css('color', "red")
                }
            }
            else {
                IsEdit(this.parentNode.parentNode, 'false')
                $(this).html('编辑')
                $(this.nextSibling).html('删除')
                backups = ""
                $(this.parentNode.parentNode).css('color', "black")
                var count = this.parentNode.parentNode.id.replace('Tbody_Tr', '')
                var array = [];//声明一个新的数组
                $(`#${this.parentNode.parentNode.id}`).children().each(function (index, element) {//遍历每个对象
                    array.push($(this).html());//往数组中存入值
                });

                if ((IsDataSeq == 'Seq1' || IsDataSeq == 'Seq2')) {
                    array.shift()
                }
                if (IsEditBtn || IsDelBtn) {
                    array.pop()
                }
                var data = {}
                for (var i = 0; i < TbodyDataKey.length; i++) {
                    data[TbodyDataKey[i]] = array[i]
                }
                TbodyData[count] = data
                data['array_seq'] = count
                PC_ZYL_table_BtnEdit(data)
                data = {}
            }
        })
        $('.PC_ZYL_table_BtnDel').on('click', function () {
            if ($(this).text() == '取消') {
                IsEdit(this.parentNode.parentNode, 'false')
                $(this.previousSibling).html('编辑')
                $(this).html('删除')
                $(this.parentNode.parentNode).css('color', "black")
                $(this.parentNode.parentNode.parentNode).html(backups)
                backups = ""
                TableBtn()
            }
            else {
                var count = this.parentNode.parentNode.id.replace('Tbody_Tr', '')
                var data = TbodyData[count]
                data['array_seq'] = count
                PC_ZYL_table_BtnDel(data)
                data = {}
                TbodyData.splice(count, 1)
                TbodyDataLength = TbodyData.length
                $(`#${HtmlID}_TbodyDataLength`).html(TbodyDataLength)
                if (TbodyPageCount != 'All') {
                    if (PagesCount * TbodyPageCount <= TbodyDataLength) {
                        Tbody_Td((PagesCount - 1) * TbodyPageCount, PagesCount * TbodyPageCount - 1)
                    }
                    else {
                        Tbody_Td((PagesCount - 1) * TbodyPageCount, TbodyDataLength - 1)
                    }
                }
                else {
                    Tbody_Td(0, TbodyDataLength - 1)
                }
            }
        })
    }

    function IsEdit(id, isbool) {
        $(id).attr('contenteditable', isbool)
    }

    function PageHtml() {
        var page = `
    <div class="PC_ZYL_paging">
    <span>共${TbodyPageCount}条/页</span>
    <div>
      <strong class="IsPaging"  id="${HtmlID}_subtract"><<</strong>
        <span id="${HtmlID}_pages" class="PC_ZYL_PagesCount">1</span>
      <strong class="IsPaging"  id="${HtmlID}_add">>></strong>
    </div>
    <span>共<span id="${HtmlID}_TbodyDataLength">${TbodyDataLength}</span>条记录</span>
    </div>
    `
        $(`#${HtmlID}`).append(page)
        Page_Operation()
    }

    function Page_Operation() {
        $(`#${HtmlID}_subtract`).on('click', function () {
            if (PagesCount > 1) {
                PagesCount--;
                $(`#${HtmlID}_pages`).html(PagesCount)
                Tbody_Td(PagesCount * TbodyPageCount - TbodyPageCount, PagesCount * TbodyPageCount - 1)
            }
        })
        $(`#${HtmlID}_add`).on('click', function () {
            if (PagesCount < TbodyDataLength / TbodyPageCount) {
                PagesCount++;
                $(`#${HtmlID}_pages`).html(PagesCount)
                if (PagesCount * TbodyPageCount <= TbodyDataLength) {
                    Tbody_Td((PagesCount - 1) * TbodyPageCount, PagesCount * TbodyPageCount - 1)
                }
                else {
                    Tbody_Td((PagesCount - 1) * TbodyPageCount, TbodyDataLength - 1)
                }
            }
        })
    }
}