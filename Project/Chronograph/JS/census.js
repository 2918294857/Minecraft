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
        data: ['Html', 'Css', 'JavaScript', 'TypeScript', 'NodeJs', 'Vue', 'Webapi', 'C#', 'MVC5', 'BootStrap', 'Jquert', '正则表达式']
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
        data: [30, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
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
            show: true,
            fontSize: '10',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: true
        },
        data: [
          { value: 70, name: '已完成-70' },
          { value: 30, name: '未完成-30' },

        ]
      }
    ]
  };
  myChart1.setOption(option1);
}



