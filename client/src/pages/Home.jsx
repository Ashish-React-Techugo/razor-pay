import { Box, Stack } from '@chakra-ui/react'
import React from 'react'
import Card from '../components/Card'
import axios from 'axios'

const Home = () => {
    const checkoutHandler = async (amount) => {

        const { data: { key } } = await axios.get('http://localhost:8000/api/getKey')

        const { data: { order } } = await axios.post('http://localhost:8000/api/checkout', {
            amount
        })

        var options = {
            key, // Enter the Key ID generated from the Dashboard
            amount: order?.amount || 0, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: "Ashish Bisht",
            description: "Test Transaction",
            image: "http://example.com/your_logo",
            order_id: order.id || "order_IluGWxBm9U8zJ8", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            callback_url: "http://localhost:8000/api/paymentverification",
            // handler: function (response){
            //     alert(response.razorpay_payment_id);
            //     alert(response.razorpay_order_id);
            //     alert(response.razorpay_signature)
            // },
            prefill: {
                name: "Gaurav Kumar",
                email: "gaurav.kumar@example.com",
                contact: "9000090000"
            },
            notes: {
                address: "Razorpay Corporate Office"
            },
            theme: {
                color: "#3399cc"
            }
        };
        var razor = new window.Razorpay(options);
        razor.open();
        // console.log()
    }
    return (
        <Box>
            <Stack direction={["column", "row"]}>
                <Card amount={5000} img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjsUjFwQscBOsvDWw4lo3uLO2RCyrfzXbTNg&usqp=CAU" checkoutHandler={checkoutHandler} />
                <Card img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTXHAdECCUJjyj-GOLB9dnHlCmFkstbOgLWA&usqp=CAU" amount={3000} checkoutHandler={checkoutHandler} />
            </Stack>
        </Box>
    )
}

export default Home