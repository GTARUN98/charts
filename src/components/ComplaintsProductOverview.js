import React, { useState } from 'react';
import { Container, Box, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import dashboardData from './dashboardData';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";



export default function ComplaintsProductOverview() {
  const [value, setValue] = useState('');
  const [stat, setstat] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());

  const handleChangeAgentID = (event) => {
    setValue(event.target.value);
  };
  const handleChangeProduct = (event) => {
    setSelectedProduct(event.target.value);
  };
  const handleChangeState = (event) => {
    setstat(event.target.value);
  };

  // Prepare data for Highcharts
  const customerDistributionOptions = {
    chart: {
      type: 'pie',
      events: {
        click: function(event) {
          if (event.point) {
            setSelectedProduct(event.point.name);
          }
        }
      }
    },
    title: {
      text: 'Customer Distribution Across Products'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %'
        }
      }
    },
    series: [{
      name: 'Complaints',
      colorByPoint: true,
      data: dashboardData.customerDistribution.labels.map((label, index) => ({
        name: label,
        y: dashboardData.customerDistribution.data[index],
        color: dashboardData.customerDistribution.colors[index],
        drilldown: label.toLowerCase().replace(' ', '-')
      }))
    }],
    drilldown: {
      series: dashboardData.customerDistribution.labels.map(label => ({
        id: label.toLowerCase().replace(' ', '-'),
        name: label,
        data: dashboardData.complaintsAcrossProducts.topics.map(topic => [
          topic,
          dashboardData.complaintsAcrossProducts.counts[label]?.[dashboardData.complaintsAcrossProducts.topics.indexOf(topic)] || 0
        ])
      }))
    }
  };

  const filteredData = selectedProduct 
    ? {
        resolutionStatus: {
          pending: dashboardData.resolutionStatus.pending[
            dashboardData.resolutionStatus.products.indexOf(selectedProduct)
          ],
          resolved: dashboardData.resolutionStatus.resolved[
            dashboardData.resolutionStatus.products.indexOf(selectedProduct)
          ]
        },
        followUps: dashboardData.followUps.percentages[
          dashboardData.followUps.products.indexOf(selectedProduct)
        ],
        businessImpact: dashboardData.businessImpact.data[
          dashboardData.businessImpact.labels.indexOf(selectedProduct)
        ]
      }
    : null;

  const resolutionStatusOptions = {
    chart: {
      type: 'column'
    },
    title: {
      text: selectedProduct 
        ? `Resolution Status for ${selectedProduct}` 
        : 'Resolution Status Across Products'
    },
    xAxis: {
      categories: selectedProduct ? ['Pending', 'Resolved'] : dashboardData.resolutionStatus.products
    },
    yAxis: {
      title: {
        text: 'Number of Complaints'
      }
    },
    series: [{
      name: 'Complaints',
      data: selectedProduct 
        ? [filteredData.resolutionStatus.pending, filteredData.resolutionStatus.resolved]
        : dashboardData.resolutionStatus.pending.map((_, i) => ({
            name: dashboardData.resolutionStatus.products[i],
            y: dashboardData.resolutionStatus.pending[i] + dashboardData.resolutionStatus.resolved[i],
            drilldown: dashboardData.resolutionStatus.products[i]
          }))
    }]
  };

  return (
    <Container sx={{
      alignItems: "center",
      justifyContent: "center"
    }}>
      <Box
        sx={{
          height: "150vh",
          width: "80vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          overflow: "hidden",
          boxSizing: "border-box",
        }}
      >
        {/* Header Container */}
        <Box
          sx={{
            height: "12.33%",
            width: "100%",
            margin: "1%",
            border: "1px solid #ccc",
            borderRadius: 1,
            boxSizing: "border-box",
            flexShrink: 1,
          }}
        >
          <Box sx={{ display: "flex", height: "100%", width: "100%", boxSizing: "border-box" }}>
            <Box
              sx={{
                width: "50%",
                border: "1px solid #ccc",
                boxSizing: "border-box",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Typography sx={{ fontWeight: "Bold" }}>Complaints Product Overview</Typography>
            </Box>

            <Box
              sx={{
                width: "50%",
                height: "100%",
                border: "1px solid #ccc",
                backgroundColor: "whitesmoke",
                boxSizing: "border-box",
                borderRadius: 1,
                padding: 0,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  backgroundColor: "whitesmoke",
                  borderBottom: "1px solid #ccc",
                  textAlign: "center",
                  padding: "4px 0px",
                }}
              >
                <Typography variant="subtitle2" fontWeight="bold">
                  Duration
                </Typography>
              </Box>

              <Box sx={{ padding: "8px" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <DatePicker
                      label="From"
                      value={startDate}
                      onChange={(newValue) => setStartDate(newValue)}
                      slotProps={{ textField: { size: "small", fullWidth: true } }}
                    />
                    <DatePicker
                      label="To"
                      value={endDate}
                      onChange={(newValue) => setEndDate(newValue)}
                      slotProps={{ textField: { size: "small", fullWidth: true } }}
                    />
                  </Box>
                </LocalizationProvider>
              </Box>
            </Box>

            <Box sx={{ width: "16.67%", border: "1px solid #ccc", boxSizing: "border-box" }}>
              <Box
                sx={{
                  backgroundColor: "whitesmoke",
                  padding: "4px 8px",
                  borderBottom: "1px solid #ccc",
                }}
              >
                <Typography variant="body2" fontWeight="bold">
                  Product
                </Typography>
              </Box>

              <Box sx={{ padding: "8px", flexGrow: 1 }}>
                <FormControl fullWidth size="small">
                  <InputLabel id="dropdown-label">All</InputLabel>
                  <Select
                    labelId="dropdown-label"
                    id="dropdown"
                    value={selectedProduct || ''}
                    label="Select"
                    onChange={handleChangeProduct}
                    sx={{ fontSize: "0.8rem", minWidth: 0 }}
                  >
                    <MenuItem value="">All Products</MenuItem>
                    {dashboardData.customerDistribution.labels.map(product => (
                      <MenuItem key={product} value={product}>{product}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Metrics Container */}
        <Box
          sx={{
            height: "16.66%",
            width: "100%",
            marginBottom: "0.5%",
            border: "1px solid #ccc",
            borderRadius: 1,
            backgroundColor: "whitesmoke",
            boxSizing: "border-box",
            flexShrink: 1,
          }}
        >
          <Box sx={{ display: "flex", height: "100%", width: "100%", boxSizing: "border-box" }}>
            <Box sx={{ width: "20%", border: "1px solid #ccc", boxSizing: "border-box" }}>
              <Box
                sx={{
                  backgroundColor: "whitesmoke",
                  padding: "4px 8px",
                  borderBottom: "1px solid #ccc",
                }}
              >
                <Typography variant="body2" fontWeight="bold">
                  Total Complaints
                </Typography>
              </Box>
              <Box sx={{ padding: "8px", textAlign: "center" }}>
                <Typography variant="h6">{dashboardData.metrics.totalComplaints}</Typography>
              </Box>
            </Box>
            
            <Box sx={{ width: "20%", border: "1px solid #ccc", boxSizing: "border-box" }}>
              <Box
                sx={{
                  backgroundColor: "whitesmoke",
                  padding: "4px 8px",
                  borderBottom: "1px solid #ccc",
                }}
              >
                <Typography variant="body2" fontWeight="bold">
                  Total Resolved
                </Typography>
              </Box>
              <Box sx={{ padding: "8px", textAlign: "center" }}>
                <Typography variant="h6">{dashboardData.metrics.resolvedComplaints}</Typography>
              </Box>
            </Box>
            
            <Box sx={{ width: "20%", border: "1px solid #ccc", boxSizing: "border-box" }}>
              <Box
                sx={{
                  backgroundColor: "whitesmoke",
                  padding: "4px 8px",
                  borderBottom: "1px solid #ccc",
                }}
              >
                <Typography variant="body2" fontWeight="bold">
                  No Of Escalations
                </Typography>
              </Box>
              <Box sx={{ padding: "8px", textAlign: "center" }}>
                <Typography variant="h6">{dashboardData.metrics.escalations}</Typography>
              </Box>
            </Box>
            
            <Box sx={{ width: "20%", border: "1px solid #ccc", boxSizing: "border-box" }}>
              <Box
                sx={{
                  backgroundColor: "whitesmoke",
                  padding: "4px 8px",
                  borderBottom: "1px solid #ccc",
                }}
              >
                <Typography variant="body2" fontWeight="bold">
                  Most Popular Product
                </Typography>
              </Box>
              <Box sx={{ padding: "8px", textAlign: "center" }}>
                <Typography variant="h6">
                  {dashboardData.customerDistribution.labels[
                    dashboardData.customerDistribution.data.indexOf(
                      Math.max(...dashboardData.customerDistribution.data)
                    )
                  ]}
                </Typography>
              </Box>
            </Box>
            
            <Box sx={{ width: "20%", border: "1px solid #ccc", boxSizing: "border-box" }}>
              <Box
                sx={{
                  backgroundColor: "whitesmoke",
                  padding: "4px 8px",
                  borderBottom: "1px solid #ccc",
                }}
              >
                <Typography variant="body2" fontWeight="bold">
                  Number Of Follow Ups
                </Typography>
              </Box>
              <Box sx={{ padding: "8px", textAlign: "center" }}>
                <Typography variant="h6">
                  {selectedProduct 
                    ? `${filteredData?.followUps}%` 
                    : `${Math.max(...dashboardData.followUps.percentages)}%`}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Charts Container */}
        <Box
          sx={{
            height: "41.66%",
            width: "100%",
            marginBottom: "0.5%",
            border: "1px solid #ccc",
            borderRadius: 1,
            backgroundColor: "whitesmoke",
            display: "flex",
            boxSizing: "border-box",
            flexShrink: 1,
            padding: "4px",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexWrap: "wrap",
              gap: "2%",
              boxSizing: "border-box",
              justifyContent: "space-between",
              alignContent: "space-between",
            }}
          >
            <Box sx={{ width: "49%", height: "32%" }}>
              <HighchartsReact 
                highcharts={Highcharts} 
                options={customerDistributionOptions} 
              />
            </Box>
            
            <Box sx={{ width: "49%", height: "32%" }}>
              <HighchartsReact 
                highcharts={Highcharts} 
                options={resolutionStatusOptions} 
              />
            </Box>
            
            <Box sx={{ width: "49%", height: "32%" }}>
              <HighchartsReact 
                highcharts={Highcharts} 
                options={{
                  chart: { type: 'bar' },
                  title: { text: selectedProduct ? `Business Impact for ${selectedProduct}` : 'Business Impact' },
                  xAxis: { categories: dashboardData.businessImpact.labels },
                  yAxis: { title: { text: 'Percentage' } },
                  series: [{
                    name: 'Impact',
                    data: selectedProduct 
                      ? [filteredData?.businessImpact || 0]
                      : dashboardData.businessImpact.data
                  }]
                }} 
              />
            </Box>
            
            <Box sx={{ width: "49%", height: "32%" }}>
              <HighchartsReact 
                highcharts={Highcharts} 
                options={{
                  chart: { type: 'column' },
                  title: { text: 'Competitor Mentions' },
                  xAxis: { categories: dashboardData.competitorMentions.competitors },
                  yAxis: { title: { text: 'Count' } },
                  series: selectedProduct
                    ? [{
                        name: selectedProduct,
                        data: dashboardData.competitorMentions.products[selectedProduct] || []
                      }]
                    : Object.entries(dashboardData.competitorMentions.products).map(([product, data]) => ({
                        name: product,
                        data: data
                      }))
                }} 
              />
            </Box>
            
            <Box sx={{ width: "49%", height: "32%" }}>
              <HighchartsReact 
                highcharts={Highcharts} 
                options={{
                  chart: { type: 'line' },
                  title: { text: 'Customer Sentiment Trend' },
                  xAxis: { categories: dashboardData.customerSentimentTrend.months },
                  yAxis: { 
                    title: { text: 'Sentiment Score' },
                    min: -1,
                    max: 1
                  },
                  series: selectedProduct
                    ? [{
                        name: selectedProduct,
                        data: dashboardData.customerSentimentTrend.sentimentScores[selectedProduct] || []
                      }]
                    : Object.entries(dashboardData.customerSentimentTrend.sentimentScores).map(([product, data]) => ({
                        name: product,
                        data: data
                      }))
                }} 
              />
            </Box>
            
            <Box sx={{ width: "49%", height: "32%" }}>
              <HighchartsReact 
                highcharts={Highcharts} 
                options={{
                  chart: { type: 'areaspline' },
                  title: { text: 'Problem Resolution by Month' },
                  xAxis: { categories: dashboardData.problemResolutionByMonth.months },
                  yAxis: { title: { text: 'Count' } },
                  series: selectedProduct
                    ? [{
                        name: selectedProduct,
                        data: dashboardData.problemResolutionByMonth.products[selectedProduct] || []
                      }]
                    : Object.entries(dashboardData.problemResolutionByMonth.products).map(([product, data]) => ({
                        name: product,
                        data: data
                      }))
                }} 
              />
            </Box>
          </Box>
        </Box>

        {/* Additional Containers (4 and 5) */}
        <Box
          sx={{
            height: "33.32%",
            width: "100%",
            marginBottom: "0.5%",
            border: "1px solid #ccc",
            borderRadius: 1,
            backgroundColor: "whitesmoke",
            boxSizing: "border-box",
            flexShrink: 1,
          }}
        >
          {/* Additional content can go here */}
        </Box>
      </Box>
    </Container>
  );
}