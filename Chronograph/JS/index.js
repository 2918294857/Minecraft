var EData = []
var EData1 = []
let xAxis = []
let series = []
let SLxAxis = []
let SLseries = []
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

    $.ajax(
        {
            url: "http://127.0.0.1/api/SLCount",
            async: false,
            success: function (result) {
                 EData1=result.data
            }
        });
EData.forEach(element => {
    xAxis.push(element.indexestwo)
    series.push(element.count)
});



