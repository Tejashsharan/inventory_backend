const mongoose =require('mongoose');
const {Schema}=mongoose;

const transactionShcema=new Schema({
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller'
      },
    type:String,
    products:[{
        name:String,
        quantity:Number,
        price:Number
    }],
    
    amount:Number,
    timestamp:{type:Date,default:Date.now}
})

const Transaction=mongoose.model("Transaction",transactionShcema);
module.exports=Transaction;