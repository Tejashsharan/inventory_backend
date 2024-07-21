const express=require('express');
const router=express.Router();
const Transaction=require('../modules/Transacation');
const {body,validationResult}=require('express-validator')
const fetch=require('../middleware/fetchItem')

//making api for fetching the transaction history
router.get('/transaction/history',fetch,async(req,res)=>{
    try {
        
        const trans = await Transaction.find({seller:req.seller.id});
        if(!trans){
            return res.status(404).send("Inventory not found");
        }
        return res.status(200).json(trans);

    } catch (error) {
        return res.status(500).json({error:error});
    }
})

//making api for adding tranction
router.post('/transaction/add', fetch, [
  body("type", "Enter the type of transaction you want to record").exists(),
  body("product", "Enter the product whose transaction you want to record").isArray().notEmpty(),
  body("amount", "Enter the amount you want to enter").isNumeric()
], async (req, res) => {

  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

  try {
    const { type, product, amount } = req.body;

    const trans = new Transaction({
      type,
      products: product,
      amount,
      seller: req.seller.id
    });

    const newtrans = await trans.save();
    return res.status(200).json(newtrans);

  } catch (error) {
    return res.status(500).json({ error });
  }

});


//for updating the transaction history
router.put('/transaction/update/:id', fetch, [
    body("type", "Enter the type of transaction you want to record").exists(),
    body("product", "Enter the product whose transaction you want to record").isArray().notEmpty(),
    body("amount", "Enter the amount you want to enter").isNumeric()
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

    try {
        const { type, product, amount } = req.body;

        const updateFields = {};
        if (type) updateFields.type = type;
        if (product) updateFields.products = product;
        if (amount) updateFields.amount = amount;

        const change = await Transaction.findByIdAndUpdate(req.params.id, { $set: updateFields }, { new: true });

        if (!change) {
            return res.status(404).send("Transaction not found");
        }
        return res.status(200).json(change);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});


module.exports=router;