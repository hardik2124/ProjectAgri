const express = require("express"); // Import Express
// const app = express(); // Create an Express app
require("dotenv").config();
const database = require("./Config/Database");
const cors = require("cors");
const cluster = require("cluster");
const os = require("os");
const userRoutes = require("./Routers/Auth");
const productRoutes = require("./Routers/Product");

// Database connection
PORT = process.env.PORT || 5154;
database.connect();

const app = express(); 

app.use(express.json());
app.use(cors());

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/product", productRoutes);

app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: "Your server is up and running....",
	});
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});




//multiple servers.............................................................................................

// database.connect();
// const cpu = os.cpus().length;
// // console.log("cpu length = ",cpu);

// if (cluster.isPrimary) {
//     for (let i = 0; i < cpu; i++) {
//         cluster.fork();
//     }
// } else {
//     const app = express();
//     app.use(express.json());
//     app.use(cors());

//     app.use("/api/v1/auth", userRoutes);

//     app.get("/", (req, res) => {
//         return res.json({
//             success: true,
//             message: "Your server is up and running....",
//         });
//     });

//     app.listen(PORT, () => {
//         console.log(`Server is running on http://localhost:${PORT}`);
//     });
// }
