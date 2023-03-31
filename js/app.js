const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MySQL connection
const connection = mysql.createConnection({
  host: 'your_database_host',
  user: 'your_database_user',
  password: 'your_database_password',
  database: 'login_website'
});

connection.connect(err => {
  if (err) throw err;
  console.log('Connected to the MySQL server.');
});

// Plan creation
app.post('/api/plans', (req, res) => {
  // Get plan details from the request body
  const { name, streaming_platform, base_price } = req.body;

  // Insert the new plan into the database
  connection.query(
    'INSERT INTO plans (name, streaming_platform, base_price) VALUES (?, ?, ?)',
    [name, streaming_platform, parseFloat(base_price)],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create plan.' });
      } else {
        res.status(201).json({ message: 'Plan created successfully.', planId: results.insertId });
      }
    }
  );
});

// User subscription management
app.post('/api/subscriptions', (req, res) => {
  // Get subscription details from the request body
  const { user_id, plan_id, num_users, price, start_date, end_date } = req.body;

  // Insert the new subscription into the database
  connection.query(
    'INSERT INTO user_subscriptions (user_id, plan_id, num_users, price, start_date, end_date) VALUES (?, ?, ?, ?, ?, ?)',
    [parseInt(user_id), parseInt(plan_id), parseInt(num_users), parseFloat(price), start_date, end_date],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create subscription.' });
      } else {
        res.status(201).json({ message: 'Subscription created successfully.', subscriptionId: results.insertId });
      }
    }
  );
});

// Plan search and filtering
app.get('/api/plans', (req, res) => {
  // Get filtering criteria from the query parameters
  const { streaming_platform, min_price, max_price, num_users } = req.query;

  let sql = 'SELECT * FROM plans WHERE 1=1';
  const queryParams = [];

  if (streaming_platform) {
    sql += ' AND streaming_platform = ?';
    queryParams.push(streaming_platform);
  }

  if (min_price) {
    sql += ' AND base_price >= ?';
    queryParams.push(parseFloat(min_price));
  }

  if (max_price) {
    sql += ' AND base_price <= ?';
    queryParams.push(parseFloat(max_price));
  }

  connection.query(sql, queryParams, (error, results) => {
   
    if (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve plans.' });
      } else {
        if (num_users) {
          // Calculate the final price based on the number of users
          results.forEach(plan => {
            plan.final_price = parseFloat(plan.base_price) * parseInt(num_users);
          });
        }
        res.status(200).json(results);
      }
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(Server is running on port ${PORT});
});

