const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

// Your Shopify store details
const SHOP = 'indusai.myshopify.com'; // <-- Change this
const ACCESS_TOKEN = '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'; // <-- Change this
const API_VERSION = '2025-04';

app.get('/shop-data', async (req, res) => {
  const query = {
    query: `
      {
        products(first: 3) {
            edges {
              node {
                id
                title
                status
              }
            }
        }
      }
    `
  };


  try {
    const response = await axios.post(
      `https://${SHOP}/admin/api/${API_VERSION}/graphql.json`,
      query,
      {
        headers: {
          'X-Shopify-Access-Token': ACCESS_TOKEN,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      error: error.response?.data || error.message
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
