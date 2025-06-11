import React, { useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const departmentData = [
  {
    name: 'Electronics',
    y: 10,
  },
  {
    name: 'Clothing',
    y: 7,
  },
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

const ChartWithSideDrilldown = () => {
  const [selectedDept, setSelectedDept] = useState(null);

  const chart1Options = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Sales by Department',
    },
    xAxis: {
      type: 'category',
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      series: {
        cursor: 'pointer',
        borderWidth: 0,
        dataLabels: {
          enabled: true,
        },
        point: {
          events: {
            click: function () {
              setSelectedDept(this.name);
            },
          },
        },
      },
    },
    series: [
      {
        name: 'Departments',
        colorByPoint: true,
        data: departmentData,
      },
    ],
  };

  const chart2Options = {
    chart: {
      type: 'column',
    },
    title: {
      text: selectedDept
        ? `Sales in ${selectedDept}`
        : 'Click a department to view details',
    },
    xAxis: {
      type: 'category',
    },
    legend: {
      enabled: false,
    },
    series: [
      {
        name: selectedDept || '',
        colorByPoint: true,
        data: subcategoryMap[selectedDept] || [],
      },
    ],
  };

  return (
    <div style={{ display: 'flex', gap: '40px' }}>
      <div style={{ flex: 1 }}>
        <HighchartsReact highcharts={Highcharts} options={chart1Options} />
      </div>
      <div style={{ flex: 1 }}>
        <HighchartsReact highcharts={Highcharts} options={chart2Options} />
      </div>
    </div>
  );
};

export default ChartWithSideDrilldown;
