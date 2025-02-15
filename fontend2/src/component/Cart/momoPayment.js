// import axios from "axios";
// import crypto from "crypto";
// export const createPaymentRequest = async (order) => {
//     const endpoint = 'https://test-payment.momo.vn/gw_payment/transactionProcessor';
//     const partnerCode = "MOMO";
//     const accessKey = "F8BBA842ECF85";
//     const serectkey = "";
//     const orderDescription = "Payment for order #" + order._id;
//     const orderInfo = 'Payment for order #123'
//     const returnUrl = 'http://localhost:3000';
//     const notifyurl = 'http://localhost:3000';
//     const amount = order.totalPrice;
//     const orderId = order._id;
//     const requestId = orderId;
//     const requestType = 'captureMoMoWallet';
//     const extraData = 'merchantName=;merchantId=';


//     const rawSignature = `partnerCode=${partnerCode}&accessKey=${accessKey}&requestId=${requestId}&amount=${amount}&orderId=${orderId}&orderInfo=${orderInfo}&returnUrl=${returnUrl}&notifyUrl=${notifyurl}&extraData=${extraData}`;
//     const signature = crypto.createHmac('sha256', serectkey).update(rawSignature).digest('hex');
//     const data = {
//         partnerCode,
//         accessKey,
//         requestId,
//         amount,
//         orderId,
//         orderInfo: orderDescription,
//         returnUrl,
//         notifyurl,
//         extraData,
//         requestType,
//         signature
//     };
//     const response = await axios.post(endpoint, data);
//     if (response.data && response.data.payUrl) {
//         window.location.href = response.data.payUrl;
//     }
//     else {
//         console.error('Error while creating payment request', response.data);
//     }
//     // return response.data;
// }