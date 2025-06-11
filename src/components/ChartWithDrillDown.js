import React, { useState } from 'react';
import ReactECharts from 'echarts-for-react';
import 'echarts-wordcloud';
// Sample data
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

  const barChartOptions = {
    title: { text: 'Sales by Department' },
    tooltip: {},
    xAxis: {
      type: 'category',
      data: departmentData.map((d) => d.name),
    },
    yAxis: { type: 'value' },
    series: [
      {
        type: 'bar',
        data: departmentData.map((d) => d.value),
      },
    ],
  };

  const subcategoryOptions = {
    title: {
      text: selectedDept
        ? `Sales in ${selectedDept}`
        : 'Click a department to view details',
    },
    tooltip: {},
    xAxis: {
      type: 'category',
      data: selectedDept ? subcategoryMap[selectedDept].map((d) => d.name) : [],
    },
    yAxis: { type: 'value' },
    series: [
      {
        type: 'bar',
        data: selectedDept ? subcategoryMap[selectedDept].map((d) => d.value) : [],
      },
    ],
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
      formatter: function (params) {
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
          option={barChartOptions}
          onEvents={{
            click: (params) => {
              const dept = departmentData[params.dataIndex]?.name;
              if (dept) setSelectedDept(dept);
            },
          }}
        />
      </div>

      <div>
        <ReactECharts option={subcategoryOptions} />
      </div>

      <div>
        <ReactECharts option={wordCloudOptions} />
      </div>

      <div>
        <ReactECharts option={journeyOptions} />
      </div>
    </div>
  );
};

export default ChartWithSideDrilldownECharts;
