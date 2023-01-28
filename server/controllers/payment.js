import { instance } from "../index.js";
import crypto from 'crypto'
import { Payment } from "../models/payment.js";

export const checkout = async (req, res) => {
    var options = {
        amount: Number(req.body.amount * 100),  // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11"
    };
    const order = await instance.orders.create(options);
    res.status(200).json({
        status: true,
        order
    })
}

export const paymentVerification = async (req, res) => {
    const {razorpay_order_id,razorpay_payment_id,razorpay_signature} = req.body;

    let body = razorpay_order_id + "|" + razorpay_payment_id;
    console.log()
    var expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_API_SECRET)
        .update(body.toString())
        .digest('hex');
    console.log("sig received ", razorpay_signature);
    console.log("sig generated ", expectedSignature);
    var response = { "signatureIsValid": "false" }
    if (expectedSignature === razorpay_signature){
        response = { "signatureIsValid": "true" };
        await Payment.create({
            razorpay_order_id,razorpay_payment_id,razorpay_signature
        })
        res.redirect(`http://localhost:3000/payment-successfull?reference=${razorpay_payment_id}`)
    }
    res.status(200).json({
        status: true,
        response
    })
}

export const getKey = async (req, res) => {
    res.status(200).json({
        status: true,
        key: process.env.RAZORPAY_KEY_ID
    })
}