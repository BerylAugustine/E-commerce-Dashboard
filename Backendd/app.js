
const express = require('express');
const app = express();
const dotenv = require("dotenv");
const path = require('path');
const fs = require('fs');
const cors = require('cors')
const bodyParser = require('body-parser');
const connectDatabase = require('./config/connectDatabase')
dotenv.config({ path: path.join(__dirname, 'config', 'config.env') })

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const products = require('./routes/product')
const orders = require('./routes/order')
const authRoutes = require('./routes/authRoutes');

connectDatabase();

app.use('/uploads', express.static(uploadDir));
app.use(express.json());
app.use(cors())
app.use(bodyParser.json());
app.use('/api/v1', products);
app.use('/api/v1', orders);
app.use('/api/auth', authRoutes);





app.listen(process.env.PORT, () => {
    console.log(`Server listening to port ${process.env.PORT} in ${process.env.NODE_ENV}`)
});