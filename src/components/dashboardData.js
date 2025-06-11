const dashboardData = {
  "dashboardTitle": "Complaints Product Overview",
  "metrics": {
    "totalComplaints": 831,
    "resolvedComplaints": 624,
    "escalations": 189
  },
  "customerDistribution": {
    "labels": ["Credit Card", "Mortgage", "Personal Loan", "Checking Account", "Savings Account"],
    "data": [25, 21, 18, 15, 21],
    "colors": ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"]
  },
  "businessImpact": {
    "labels": ["Financial Loss", "Regulatory Compliance", "Reputation Risk", "Operational Disruption", "Legal Action"],
    "data": [37.18, 22.5, 18.3, 12.7, 9.32],
    "colors": ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"]
  },
  "competitorMentions": {
    "competitors": ["Bank of America", "Chase", "Marcus", "Wells Fargo"],
    "products": {
      "Credit Card": [25, 110, 65, 63],
      "Mortgage": [23, 22, 26, 19],
      "Personal Loan": [22, 22, 28, 17]
    }
  },
  "resolutionStatus": {
    "products": ["Credit Card", "Mortgage", "Personal Loan", "Checking Account", "Savings Account"],
    "pending": [45, 32, 28, 19, 22],
    "resolved": [110, 62, 42, 68, 55]
  },
  "followUps": {
    "products": ["Mortgage", "Personal Loan", "Credit Card", "Savings Account", "Checking Account"],
    "percentages": [27.14, 26.67, 19.05, 10.79, 6.35]
  },
  "customerSentimentTrend": {
    "months": ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    "sentimentScores": {
      "Credit Card": [0.7, 0.5, 0.3, -0.2, -0.5, 0.1],
      "Personal Loan": [0.4, 0.6, 0.2, -0.1, -0.3, 0.0]
    }
  },
  "problemResolutionByMonth": {
    "months": ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    "products": {
      "Checking Account": [15, 20, 25, 18, 22, 30],
      "Credit Card": [40, 35, 50, 45, 60, 55],
      "Mortgage": [10, 12, 8, 15, 20, 18],
      "Personal Loan": [5, 8, 12, 10, 15, 20],
      "Savings Account": [8, 10, 7, 12, 15, 10]
    }
  },
  "complaintsAcrossProducts": {
    "topics": ["Fees", "Service Delay", "Fraud", "Technical Issues"],
    "counts": {
      "Credit Card": [45, 30, 15, 10],
      "Personal Loan": [20, 25, 5, 10]
    }
  }
}
export default dashboardData;