import React, { useState } from 'react';
import ReactECharts from 'echarts-for-react';
import 'echarts-wordcloud';

const departmentData = [
  { name: 'Electronics', value: 10 },
  { name: 'Clothing', value: 7 },
];

const subcategoryMap = {
  Electronics: [
    { name: 'Laptops', value: 5 },
    { name: 'Mobiles', value: 3 },
    { name: 'TVs', value: 2 },
  ],
  Clothing: [
    { name: 'Men', value: 4 },
    { name: 'Women', value: 3 },
  ],
};

const journeyData = [
  { name: 'Visit Website', desc: 'User lands on homepage', time: '2023-09-01' },
  { name: 'Browse Products', desc: 'User explores categories', time: '2023-09-02' },
  { name: 'Add to Cart', desc: 'Product added to cart', time: '2023-09-03' },
  { name: 'Checkout', desc: 'User proceeds to payment', time: '2023-09-04' },
  { name: 'Order Placed', desc: 'Order completed', time: '2023-09-05' },
];

const wordCloudData = [
  { name: 'ECharts', value: 100 },
  { name: 'JavaScript', value: 90 },
  { name: 'Charting', value: 80 },
  { name: 'Data', value: 70 },
  { name: 'Visualization', value: 60 },
  { name: 'Graphics', value: 50 },
  { name: 'Interactive', value: 40 },
  { name: 'Library', value: 30 },
  { name: 'Open Source', value: 20 },
  { name: 'Web', value: 10 },
];

const ChartWithSideDrilldownECharts = () => {
  const [selectedDept, setSelectedDept] = useState(null);

  const getBarChartOptions = () => {
    const isDrilldown = !!selectedDept;
    const data = isDrilldown
      ? subcategoryMap[selectedDept]
      : departmentData;

    return {
      title: {
        text: isDrilldown ? `Sales in ${selectedDept}` : 'Sales by Department',
        left: 'center',
      },
      tooltip: {},
      xAxis: {
        type: 'category',
        data: data.map((d) => d.name),
        animation: true,
      },
      yAxis: {
        type: 'value',
        animation: true,
      },
      series: [
        {
          type: 'bar',
          universalTransition: true, // 👈 Smooth Power BI–style transitions
          data: data.map((d) => ({
            name: d.name,
            value: d.value,
          })),
          itemStyle: {
            color: isDrilldown ? '#73c0de' : '#5470c6',
          },
        },
      ],
      graphic: isDrilldown
        ? [
            {
              type: 'text',
              left: '5%',
              top: '5%',
              style: {
                text: '🔙 Back',
                fill: '#1890ff',
                font: 'bold 14px sans-serif',
                cursor: 'pointer',
              },
              onclick: () => setSelectedDept(null),
            },
          ]
        : [],
      animationDurationUpdate: 500,
    };
  };

  const wordCloudOptions = {
    series: [
      {
        type: 'wordCloud',
        shape: 'circle',
        sizeRange: [12, 60],
        rotationRange: [-90, 90],
        gridSize: 8,
        data: wordCloudData,
      },
    ],
  };

  const journeyOptions = {
    title: { text: 'User Journey Map' },
    tooltip: {
      trigger: 'item',
      formatter: (params) => {
        return `<b>${params.data.name}</b><br/>${params.data.desc}<br/>${params.data.time}`;
      },
    },
    xAxis: {
      type: 'category',
      data: journeyData.map((step) => step.time),
    },
    yAxis: { show: false },
    series: [
      {
        type: 'scatter',
        symbolSize: 50,
        data: journeyData.map((step, i) => ({
          value: [step.time, i],
          name: step.name,
          desc: step.desc,
          time: step.time,
        })),
        label: {
          show: true,
          formatter: '{b}',
          position: 'top',
        },
      },
    ],
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: 'auto auto',
        gap: '30px',
        padding: '20px',
      }}
    >
      <div>
        <ReactECharts
          option={getBarChartOptions()}
          onEvents={{
            click: (params) => {
              if (!selectedDept) {
                const dept = departmentData[params.dataIndex]?.name;
                if (dept) setSelectedDept(dept);
              }
            },
          }}
          style={{ height: 400 }}
        />
      </div>

      <div>
        <ReactECharts option={wordCloudOptions} style={{ height: 400 }} />
      </div>

      <div style={{ gridColumn: '1 / span 2' }}>
        <ReactECharts option={journeyOptions} style={{ height: 300 }} />
      </div>
    </div>
  );
};

export default ChartWithSideDrilldownECharts;

