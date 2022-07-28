import RazorpayCheckout from 'react-native-razorpay';

export const paymentFunction = async (params) => {
    var options = {
        description: 'Credits towards Chits Due',
        image: 'https://i.imgur.com/3g7nmJC.png',
        currency: 'INR',
        key: 'rzp_test_0Soma3GGNGgA8f',
        amount: params.amount,
        name: 'Chit jewel',
        order_id: params.orederid,//Replace this with an order_id created using Orders API.
        prefill: {
            email: params.email,
            contact: params.phone,
            name: params.name
        },
        theme: { color: 'rgba(213, 186, 143, 1)' }
    }
    await RazorpayCheckout.open(options).then((data) => {
        // handle success
        alert("You transaction was successfull");
        console.log(data, "paymentressssssssssssssssss")
        params.Resfun(data, params.resp)


    })

        .catch((error) => {
            // handle failure
            alert("You transaction was unsuccessfull");
            console.log(error, "paymentressssssssssssssssss")
            params.Resfun(error)
            return error;

        });
}