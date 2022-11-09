window.onload = function () {
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
    alert(param.name);  //X轴的值
  });

  var myChart1 = echarts.init(document.getElementById("newsEcharts"));
  var option1 = {
    title: {
      text: '功能完成度',
      x:'center',
      y:'center',
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
        data:EData1
      }
    ]
  };
  myChart1.setOption(option1);
}



