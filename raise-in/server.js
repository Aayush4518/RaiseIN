const express= require('express');
const Razorpay = require('razorpay');
const app= express();

app.use(express.json());

const razorpay= new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

app.post('/api/create-order', async (req, res)=>{
    const options={
        amount: req.body.amount*100,
        currency: 'INR',
        receipt: `receipt_${Date.now()}`,
    }
    try{
        const order= await razorpay.orders.create(options)
        res.json(order);
    }catch(err){
        console.error(err);
        res.status(500).json({error: 'Failed to create order'});

    }
})
app.listen(3000, ()=>{
    console.log('Server running on port 3000');
})