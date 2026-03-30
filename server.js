const dotenv = require("dotenv");
dotenv.config();

const connectDb = require("./src/config/db");
const app = require("./src/app");

const PORT = process.env.PORT || 3000;


connectDb();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})