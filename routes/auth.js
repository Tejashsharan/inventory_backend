const express=require('express');
const Seller=require('../modules/Seller');
const {body,validationResult}=require('express-validator');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const fetchItem=require('../middleware/fetchItem');

const jwt_secret=process.env.JWT_SECRET;
//signup
const router=express.Router();
router.post('/seller/signup',[
    body('name','Enter a valid name').isLength({min:3}),
    body('email','Enter a valid email').isEmail(),
    body('password','min lenght of password is 5').isLength({min:5})
],async(req,res)=>{

    //check if the validation conditions are satisfied
    const result=validationResult(req);
    let success=false;
    if(!result.isEmpty()){
        return res.status(400).json({error:error.array()});
    }

    //check if the user exists 
    try {
        const seller=await Seller.findOne({email:req.body.email})
        if(seller){
            return res.status(400).json({error:"A email with this user_id exists."});
            // success=false;
        }

        //saving data to the database
        const salt=await bcrypt.genSalt(10);
        const secPass=await bcrypt.hash(req.body.password,salt);

        const newSeller=await Seller.create({
            name:req.body.name,
            email:req.body.email,
            password:secPass
        })

        const data={
            seller:{
                id:newSeller.id
            }
        }
        const authToken=jwt.sign(data,jwt_secret)

        success=true;
        return res.status(201).json({success,authtoken:authToken});
    } catch (error) {
        return res.status(500).json({error:error.message});
    }

})

// Login
router.post('/seller/login', [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a valid password").exists()
], async (req, res) => {

    // See if all the validation conditions are satisfied or not
    const result = validationResult(req);
    let success = false;
    if (!result.isEmpty()) {
        return res.status(400).json({ error: result.array() });
    }

    // Checking if the user exists
    const { email, password } = req.body;
    try {
        const seller = await Seller.findOne({ email });
        if (!seller) {
            return res.status(401).json({ error: "invalid credentials" });
        }

        // Checking password
        const checkPass = await bcrypt.compare(password, seller.password);
        if (!checkPass) {
            return res.status(401).json({ error: "invalid credentials" });
        }

        // Generating auth token
        const data = {
            seller: {
                id: seller.id
            }
        };
        const authToken = jwt.sign(data, jwt_secret);
        success = true;
        return res.status(201).json({ authtoken: authToken, success });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

});


router.post('/seller/getseller',fetchItem,async(req,res)=>{
    try {
        
        const sellerId=req.seller.id;
        const seller=await Seller.findById(sellerId);
        res.send(seller);
    } catch (error) {
        res.status(401).send("Internal error occureed ")
    }
})

//make put and delete request for the /seller/getseller

router.put('/seller/getseller', fetchItem, async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const item = {};

        if (name) {
            item.name = name;
        }
        if (email) {
            item.email = email;
        }
        if (password) {
            const salt=await bcrypt.genSalt(10);
            const secPass=await bcrypt.hash(password,salt);
            item.password = secPass;
        }

        const updatedSeller = await Seller.findByIdAndUpdate(req.seller.id, item, { new: true });

        if (!updatedSeller) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(updatedSeller);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.delete('/seller/getseller',fetchItem,async(req,res)=>{

    try {
        const deleteSeller=await Seller.findByIdAndDelete(req.seller.id);
        if(!deleteSeller){
            res.status(404).send("user not found")
        }
        res.status(200).json(deleteSeller);
    } catch (error) {
        res.status(500).json({error:error});
    }

})

module.exports=router;


