import React, { useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Timeline from 'highcharts/modules/timeline';
import Wordcloud from 'highcharts/modules/wordcloud';

// Initialize the modules
// Timeline(Highcharts);
// Wordcloud(Highcharts);

// Sample Data
const departmentData = [
  { name: 'Electronics', y: 10 },
  { name: 'Clothing', y: 7 },
];

const subcategoryMap = {
  Electronics: [
    ['Laptops', 5],
    ['Mobiles', 3],
    ['TVs', 2],
  ],
  Clothing: [
    ['Men', 4],
    ['Women', 3],
  ],
};

const journeyData = [
  {
    name: 'Visit Website',
    label: 'Step 1',
    description: 'User lands on homepage',
    x: Date.UTC(2023, 8, 1)
  },
  {
    name: 'Browse Products',
    label: 'Step 2',
    description: 'User explores categories',
    x: Date.UTC(2023, 8, 2)
  },
  {
    name: 'Add to Cart',
    label: 'Step 3',
    description: 'Product added to cart',
    x: Date.UTC(2023, 8, 3)
  },
  {
    name: 'Checkout',
    label: 'Step 4',
    description: 'User proceeds to payment',
    x: Date.UTC(2023, 8, 4)
  },
  {
    name: 'Order Placed',
    label: 'Step 5',
    description: 'Order completed',
    x: Date.UTC(2023, 8, 5)
  },
];

const wordCloudOptions = {
  chart: { type: 'wordcloud' },
  title: { text: 'Sample Word Cloud' },
  series: [{
    type: 'wordcloud',
    data: [
      { name: 'Highcharts', weight: 10 },
      { name: 'JavaScript', weight: 9 },
      { name: 'Charting', weight: 8 },
      { name: 'Data', weight: 7 },
      { name: 'Visualization', weight: 6 },
      { name: 'Graphics', weight: 5 },
      { name: 'Interactive', weight: 4 },
      { name: 'Library', weight: 3 },
      { name: 'Open Source', weight: 2 },
      { name: 'Web', weight: 1 }
    ],
    name: 'Occurrences'
  }],
  tooltip: {
    pointFormat: '{point.name}: <b>{point.weight}</b>'
  }
};

const journeyMapOptions = {
  chart: { type: 'timeline' },
  title: { text: 'User Journey Map' },
  xAxis: {
    visible: false,
    type: 'datetime'
  },
  series: [{
    data: journeyData
  }]
};

const ChartWithSideDrilldown = () => {
  const [selectedDept, setSelectedDept] = useState(null);

  const chart1Options = {
    chart: { type: 'column' },
    title: { text: 'Sales by Department' },
    xAxis: { type: 'category' },
    yAxis: { title: { text: 'Values' } },
    legend: { enabled: false },
    plotOptions: {
      series: {
        cursor: 'pointer',
        borderWidth: 0,
        dataLabels: { enabled: true },
        point: {
          events: {
            click: function () {
              setSelectedDept(this.name);
            }
          }
        }
      }
    },
    series: [{
      name: 'Departments',
      colorByPoint: true,
      data: departmentData
    }]
  };

  const chart2Options = {
    chart: { type: 'column' },
    title: {
      text: selectedDept ? `Sales in ${selectedDept}` : 'Click a department to view details'
    },
    xAxis: { type: 'category' },
    yAxis: { title: { text: 'Values' } },
    legend: { enabled: false },
    series: [{
      name: selectedDept || '',
      colorByPoint: true,
      data: subcategoryMap[selectedDept] || []
    }]
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
        <HighchartsReact highcharts={Highcharts} options={chart1Options} />
      </div>
      <div>
        <HighchartsReact highcharts={Highcharts} options={chart2Options} />
      </div>
      <div>
        <HighchartsReact highcharts={Highcharts} options={wordCloudOptions} />
      </div>
      <div>
        <HighchartsReact highcharts={Highcharts} options={journeyMapOptions} />
      </div>
    </div>
  );
};

export default ChartWithSideDrilldown;

