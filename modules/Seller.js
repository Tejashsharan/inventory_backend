// import mongoose from 'mongoose';
const mongoose=require('mongoose');
const { Schema } = mongoose;

const sellerSchema = new Schema({
  name:{
    type:String,
    required:true,
    unique:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required :true
  }
});

const Seller=mongoose.model('Seller',sellerSchema);
module.exports=Seller;

// const mongoose=require('mongoose')
// const kittySchema = new mongoose.Schema({
//   name: String
// });

// kittySchema.methods.speak = function speak() {
//   const greeting = this.name
//     ? 'Meow name is ' + this.name
//     : 'I don\'t have a name';
//   console.log(greeting);
// };

// const kitten=mongoose.model('Kitten',kittySchema);
// module.exports=kitten;

