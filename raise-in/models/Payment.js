import mongoose from "mongoose";
const { Schema } = mongoose;

const PaymentSchema = new Schema({
    name:{type:String, required:true},
    to_user: {type: String, required:true},
    order_id: {type: String, required:true},
    ammount: {type: Number, required:true},
    status: {type: String, required:true},
    createdAt: {type: Date, default: Date.now},
    done: {type: Boolean, default: false},
});

const Payment= mongoose.models.Payment || mongoose.model("Payment", PaymentSchema)
export default Payment