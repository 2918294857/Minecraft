var EData = []
let xAxis = []
let series = []
var EData1 = []
//#region init()
init()
echarts1_data()
echarts2_data()
function init() {
    $.ajax(
        {
            url: "http://127.0.0.1/api/index",
            async: false,
            success: function (result) {
                var Statistics_Reception = result.Statistics[1].count
                var Statistics_Backstage = result.Statistics[0].count
                var Statistics_Task = result.Statistics[2].count
                EData = result.details
                $('#Statistics_Reception').html(Statistics_Reception)
                $('#Statistics_Backstage').html(Statistics_Backstage)
                $('#Statistics_Task').html(Statistics_Task)
            }
        });
}
//#endregion
//#region echarts
function echarts1_data() {
    EData.forEach(element => {
        xAxis.push(element.indexestwo)
        series.push(element.count)
        sessionStorage.setItem('KIndexs',xAxis)
    });
}
function echarts2_data() {
    $.ajax(
        {
            url: "http://127.0.0.1/api/FPCount",
            async: false,
            success: function (result) {
                EData1 = result.data
            }
        });
}
window.onload = function () {
    var myChart1 = echarts.init(document.getElementById("newsEcharts"));
    var option1 = {
        title: {
            text: '功能完成度',
            x: 'center',
            y: 'center',
            textStyle: {
                fontSize: 13
            }
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: '5%',
            left: 'center'
        },
        series: [
            {
                name: '',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: false,
                        fontSize: '10',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: true
                },
                data: EData1
            }
        ]
    };
    myChart1.setOption(option1);

    var myChart = echarts.init(document.getElementById('echarts'));
    var option = {
        title: {
            text: '',
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: []
        },
        toolbox: {
            show: true,
            feature: {
                mark: { show: true },
                magicType: { show: true, type: ['line', 'bar'] },
                restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        grid: { left: '10%', bottom: '10%' },
        calculable: true,
        xAxis: [
            {
                axisLabel: {
                    textStyle: {
                        color: '#000',
                        fontSize: 7,
                    }
                },
                type: 'category',
                data: xAxis
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                //name: '笔记收录',
                type: 'bar',
                data: series,
                markPoint: {
                    data: [
                        { type: 'max', name: '最大值' },
                        { type: 'min', name: '最小值' }
                    ]
                },
                markLine: {
                    data: [
                        { type: 'average', name: '平均值' }
                    ]
                }
            }
        ]
    };
    myChart.setOption(option, true);
    myChart.on('click', function (param) {
        location.replace("./Pages/knowledge.html")
        sessionStorage.setItem('Parameter',param.name)
    });
}
//#endregion
//#region Table
var category = ''
Table()
function Table() {
    var thModel = 1
    var data = {
        HtmlID: 'newstable',//添加位置
        TheadData: ['功能实现', '最新技术', '计划学习'],//表头
        IsDataSeq: 'false',
       // ThWidth:['20%','25%','25%'],
        BtnThWidth:'30%',
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
            category = 'FP'
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
            category = 'LT'
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
            category = 'SL'
            $.ajax(
                {
                    url: "http://127.0.0.1/api/SLData",
                    async: false,
                    success: function (result) {
                        data.TbodyData = result.SLData
                    }
                });
        }
        Long.Table(data)
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
}
function newstable_table_BtnDel(data) {
    $.ajax(
        {
            url: `http://127.0.0.1/api/Del${category}`,
            type: 'post',
            async: false,
            data: data,
            success: function (result) {
            }
        });
        echarts2_data()
        onload()
}
function newstable_table_BtnEdit(data) {
    $.ajax(
        {
            url: `http://127.0.0.1/api/Edit${category}`,
            type: 'post',
            async: false,
            data: data,
            success: function (result) {
            }
        });
    echarts2_data()
    onload()
}
//#endregion


