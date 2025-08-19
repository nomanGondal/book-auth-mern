const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const authRouter = require("./routers/authrouter.js");
const bookRouter = require("./routers/bookroutes.js");
const productRouter = require("./routers/productrouter.js");
const connectDB = require("./models/db");

dotenv.config();
const app = express();
const port = process.env.PORT || 8080;

// ===== Middlewares =====
app.use(express.json());
app.use(bodyParser.json());

const allowedOrigins = [
  "http://localhost:3000",
  "https://book-auth-mern.vercel.app"
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true); // allow
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Handle preflight requests
app.options("*", cors());


// ===== Routes =====
app.get("/", (req, res) => {
  res.send("Hello World! Backend is running ✅");
});

app.use("/auth", authRouter);
app.use("/book", bookRouter);
app.use("/product", productRouter);

// ===== Connect DB & Start Server =====
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(` Server running on port: ${port}`);
    });
  })
  .catch((err) => {
    console.error(" Failed to connect to DB:", err);
  });
