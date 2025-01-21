 const express = require('express');
 const connectDB=require('./config/db');
 const cors=require('cors');
 const path=require('path');

 const app=express();

 require('dotenv').config();
 const PORT=process.env.PORT

//Middlewares
 app.use(express.json());
 app.use(cors());


 app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

 app.use("/api/v1/auth", require('./routes/auth'));
app.use("/api/v1/products", require('./routes/products'));
app.use("/api/v1/orders", require('./routes/Order'));


 app.listen(PORT, () => {
	console.log("Server started at http://localhost:" + PORT);
	connectDB();
 });