require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/dbconnection');
const adminRoutes = require('./Routes/admin');
const app = express();
app.use(cors());
app.use(express.json());
connectDB();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send("Connected Farmer API");
});

app.use('/admin', adminRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
