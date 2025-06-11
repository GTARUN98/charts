import React, { useState } from 'react';
import { Container, Box, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export default function AgentPerformance() {
  const [value, setValue] = useState('');
  const [stat, setstat] = useState('');
  const [Product, setProduct] = useState('');


  const handleChangeAgentID = (event) => {
    setValue(event.target.value);
  };
  const handleChangeProduct = (event) => {
    setProduct(event.target.value);
  };
  const handleChangeState = (event) => {
    setstat(event.target.value);
  };
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());



  return (<Container sx={{
    alignItems: "center",
    justifyContent: "center"
  }}>
    <Box
      sx={{
        height: "100vh",
        width: "80vw",
        // margin: "1rem auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        overflow: "hidden",
        // padding: "16px",
        boxSizing: "border-box",
      }}
    >
      {/* Container 1 - height: 1 */}
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
              display: "flex",             // Enable flex layout
              alignItems: "center",        // Vertically center
              justifyContent: "center"     // Optional: Horizontally center
            }}
          >
            <Typography sx={{ fontWeight: "Bold" }}>Agent Performance</Typography>
          </Box>

          <Box
            sx={{
              width: "8.33%",
              border: "1px solid #ccc",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {/* Header with white background */}
            <Box
              sx={{
                backgroundColor: "whitesmoke",
                padding: "4px 8px",
                borderBottom: "1px solid #ccc",
              }}
            >
              <Typography variant="body2" fontWeight="bold">
                Agent ID
              </Typography>
            </Box>

            {/* Dropdown Section */}
            <Box
              sx={{

                padding: "8px",
                flexGrow: 1,
              }}
            >
              <FormControl fullWidth size="small">
                <InputLabel id="dropdown-label">All</InputLabel>
                <Select
                  labelId="dropdown-label"
                  id="dropdown"
                  value={value}
                  label="Select"
                  onChange={handleChangeAgentID}
                  sx={{ fontSize: "0.8rem", minWidth: 0 }}
                >
                  <MenuItem value="option1">Option 1</MenuItem>
                  <MenuItem value="option2">Option 2</MenuItem>
                  <MenuItem value="option3">Option 3</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>


          <Box
            sx={{
              width: "16.67%",
              height: "100%",
              border: "1px solid #ccc",
              backgroundColor: "whitesmoke",
              boxSizing: "border-box",
              borderRadius: 1,
              padding: 0, // no internal padding
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Title Header */}
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

            {/* Date Pickers in Row */}
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



          <Box sx={{ width: "8.33%", border: "1px solid #ccc", boxSizing: "border-box" }}>

            {/* Header with white background */}
            <Box
              sx={{
                backgroundColor: "whitesmoke",
                padding: "4px 8px",
                borderBottom: "1px solid #ccc",
              }}
            >
              <Typography variant="body2" fontWeight="bold">
                State
              </Typography>
            </Box>

            {/* Dropdown Section */}
            <Box
              sx={{

                padding: "8px",
                flexGrow: 1,
              }}
            >
              <FormControl fullWidth size="small">
                <InputLabel id="dropdown-label">All</InputLabel>
                <Select
                  labelId="dropdown-label"
                  id="dropdown"
                  value={value}
                  label="Select"
                  onChange={handleChangeState}
                  sx={{ fontSize: "0.8rem", minWidth: 0 }}
                >
                  <MenuItem value="option1">Option 1</MenuItem>
                  <MenuItem value="option2">Option 2</MenuItem>
                  <MenuItem value="option3">Option 3</MenuItem>
                </Select>
              </FormControl>
            </Box>

          </Box>
          <Box sx={{ width: "16.67%", border: "1px solid #ccc", boxSizing: "border-box" }}>

            {/* Header with white background */}
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

            {/* Dropdown Section */}
            <Box
              sx={{

                padding: "8px",
                flexGrow: 1,
              }}
            >
              <FormControl fullWidth size="small">
                <InputLabel id="dropdown-label">All</InputLabel>
                <Select
                  labelId="dropdown-label"
                  id="dropdown"
                  value={value}
                  label="Select"
                  onChange={handleChangeProduct}
                  sx={{ fontSize: "0.8rem", minWidth: 0 }}
                >
                  <MenuItem value="option1">Option 1</MenuItem>
                  <MenuItem value="option2">Option 2</MenuItem>
                  <MenuItem value="option3">Option 3</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Container 2 - height: 2 */}
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

          <Box sx={{ width: "16.67%", border: "1px solid #ccc", boxSizing: "border-box" }}>

            {/* Header with white background */}
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

          </Box>
          <Box sx={{ width: "16.67%", border: "1px solid #ccc", boxSizing: "border-box" }}>

            {/* Header with white background */}
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

          </Box>
          <Box sx={{ width: "16.67%", border: "1px solid #ccc", boxSizing: "border-box" }}>

            {/* Header with white background */}
            <Box
              sx={{
                backgroundColor: "whitesmoke",
                padding: "4px 8px",
                borderBottom: "1px solid #ccc",
              }}
            >
              <Typography variant="body2" fontWeight="bold">
                # Customers Handled
              </Typography>
            </Box>
          </Box>
          <Box sx={{ width: "16.67%", border: "1px solid #ccc", boxSizing: "border-box" }}>
            
          </Box>
          <Box sx={{ width: "16.67%", border: "1px solid #ccc", boxSizing: "border-box" }}>

            {/* Header with white background */}
            <Box
              sx={{
                backgroundColor: "whitesmoke",
                padding: "4px 8px",
                borderBottom: "1px solid #ccc",
              }}
            >
              <Typography variant="body2" fontWeight="bold">
                # Agents
              </Typography>
            </Box>

          </Box>
          <Box sx={{ width: "16.67%", border: "1px solid #ccc", boxSizing: "border-box" }}>

            {/* Header with white background */}
            <Box
              sx={{
                backgroundColor: "whitesmoke",
                padding: "4px 8px",
                borderBottom: "1px solid #ccc",
              }}
            >
              <Typography variant="body2" fontWeight="bold">
                Average CX Score
              </Typography>
            </Box>

          </Box>
          

        </Box>
      </Box>

      {/* Container 3 - height: 5 */}
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
        }}
      >
        <Box sx={{ width: "16.67%", border: "1px solid #ccc", boxSizing: "border-box" }} />
        <Box sx={{ width: "16.67%", border: "1px solid #ccc", boxSizing: "border-box" }} />

        <Box
          sx={{
            width: "66.66%",
            height: "100%",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center", 
            gap: "4px",
            boxSizing: "border-box",
          }}
        >
          {[...Array(2)].map((_, index) => (
            <Box
              key={index}
              sx={{
                width: "49%",
                height: "49%",
                border: "1px solid #ccc",
                boxSizing: "border-box",
              }}
            />
          ))}
          {[...Array(2)].map((_, index) => (
            <Box
              key={index}
              sx={{
                width: "49%",
                height: "49%",
                border: "1px solid #ccc",
                boxSizing: "border-box",
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Container 4 - height: 4 */}
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
        <Box sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box"
        }}>
          <Box sx={{
            height: "100%",
            display: "flex",
            boxSizing: "border-box"
          }}>
            <Box sx={{
              width: "33.33%",
              border: "1px solid #ccc",
              boxSizing: "border-box"
            }} />
            <Box sx={{
              width: "33.33%",
              border: "1px solid #ccc",
              boxSizing: "border-box"
            }} />
            <Box sx={{
              width: "33.33%",
              border: "1px solid #ccc",
              boxSizing: "border-box"
            }} />
          </Box>
          {/* <Box sx={{ 
            height: "50%", 
            display: "flex",
            boxSizing: "border-box" 
          }}> */}
          {/* <Box sx={{ 
              width: "33.33%", 
              border: "1px solid #ccc",
              boxSizing: "border-box" 
            }} />
            <Box sx={{ 
              width: "33.33%", 
              border: "1px solid #ccc",
              boxSizing: "border-box" 
            }} />
            <Box sx={{ 
              width: "33.33%", 
              border: "1px solid #ccc",
              boxSizing: "border-box" 
            }} /> */}
          {/* </Box> */}
        </Box>
      </Box>
    </Box></Container>
  );
}