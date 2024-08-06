import cors from "cors";
import "dotenv/config";
import express from "express";
import consoleMiddleware from "./middlewares/consoleLogger.middleware.js";

import userRoute from "./routes/user.route.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(consoleMiddleware);
app.use("/", userRoute);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
