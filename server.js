const app = require('./app')
 const http = require('http');
const schedule = require('node-schedule');
const axios  = require('axios');

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
  });

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "config.env" });
}




// server code
const server = http.createServer(app);
server.listen(process.env.PORT,()=>{
    console.log(`🚀🚀🚀 server is runing at ${process.env.PORT} 🚀🚀🚀`);
})

const job = schedule.scheduleJob(' */1 * * * *', function async(){
  console.log("server refreshed");
  // axios.post("https://schooloil-api.onrender.com/api/v1/user/isExist/harshraj@gmail.com").then(data=>console.log(data.data.msg));
});



// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    server.close(() => {
      process.exit(1);
    });
  });
