
    var thModel = 1
    var data = {
        HtmlID: 'newstable',//添加位置
        TheadData: ['最新技术', '计划学习'],//表头
        IsDataSeq: 'Seq2',//排序 1.翻页重置 Seq2   2.不重置Seq1  3.其他值则不显示排序
        TheadSeqName: '功能实现',//序号的表头名
        TheadBtnName: '',//操作的表头名
        IsEditBtn: true,//是否有编辑按钮 当为true时 function `${HtmlID}`_table_BtnEdit(data)
        IsDelBtn: true,//是否有删除按钮 当为true时 function `${HtmlID}`_table_BtnDel(data)
        TbodyDataLength: 7,//一共多少条数据
        TbodyPageCount: '5',//每页有多少条 值为'All'时 不分页
        TbodyData: []
    }
    
    FunctionRealization('功能实现')
    $('#newstable table thead th:nth-child(1)').attr('class', 'table_th_color')
    function monitor() {
        $('#newstable table thead th').on('click', function () {
            $(`#newstable table thead th:nth-child(${thModel})`).attr('class', 'table_th_color1')
            thModel = $(this).index() + 1
            FunctionRealization($(this).text())
            $(`#newstable table thead th:nth-child(${thModel})`).attr('class', 'table_th_color')
        })
    }

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
        PC_ZYL_table(data); 
        monitor()
    }
    function newstable_table_BtnDel(data) { console.log(data)}
    function newstable_table_BtnEdit(data) { console.log(data)} 


