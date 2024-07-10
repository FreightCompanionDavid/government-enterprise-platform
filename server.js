const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/intelligence/ai-copilot/analyze-context', (req, res) => {
  const { userId, currentTask, environmentData } = req.body;

  // Mock response
  const response = {
    recommendations: [
      `Based on your task "${currentTask}", consider focusing on customer data analysis.`,
      'Ensure all customer interactions are logged for better insights.',
    ],
    relevantData: {
      recentCustomers: ['Customer A', 'Customer B', 'Customer C'],
      upcomingShipments: 5,
      pendingOrders: 3,
    },
    componentSuggestions: [
      'Customer Data Grid',
      'Shipment Status Tracker',
      'Order Management Dashboard',
    ],
  };

  res.json(response);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
