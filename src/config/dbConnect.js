import mongoose from "mongoose";

mongoose.connect("mongodb+srv://arTWO:AnalogKid@alura.qktx5lq.mongodb.net/alura-node")

let db = mongoose.connection

export default db