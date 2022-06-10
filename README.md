# chit-mobile
This is a [React Native](https://reactnative.dev/) project bootstrapped with [`npx react-native init MyTestApp`](https://github.com/expo/create-react-native-app).



## Getting Started



First, run the metro:



```bash

npm run android or npx react-native run-android

# or

yarn run android

```



Open emulator or your device to see the result.



You can start editing the page by modifying `screens/index.js`. The page auto-updates as you edit the file.







## Learn More



To learn more about React Native, take a look at the following resources:



- [React Native Documentation](https://reactnative.dev/) - learn about React Native features and API.





You can check out [the React Native GitHub repository](https://github.com/facebook/react-native)


## About

This is an cross platform mobile app works on android,ios mobile phones and tablets.
User can login to their chit account and view their ongoing chit schemes and new chit schemes,users chit scheme transaction details are tracked and displyed in ordered Manner,user can join  any new chit scheme they wish for 
 and daily gold,silver and platinum prices are displayed for user referance.

The integrated Razorpay payment service accepts any valid debit/ credit card,and upi payments,all user transactions
  are authenticated and processed by our  backend and data is received,(showed) to user in frontend.

Link to test card payment details provided by Stripe 👉 https://razorpay.com/payment-gateway/#methods

## APPLICATION MODULES:

This application is created with different custom react componenets,
Different components are assembled together into a screen.  

## Login module:

Login module has a basic user loin form,forgotpassword screen,and reset password screen.
The purpose of this module is authenticating the user identification.


## Dashboard module:
This screen shows users specific data fetched from backend like joined schemes,due dates and upcoming schemes.


## Chits module:

Chits screen displays all the chits available at the time and user can view the scheme details, user joined scehems and user transaction details.


## Transactions module:

Displays users all transactions and dues ,user can view details and filer them.


## Profile module:

Users account details are fetched from the backend and showed ,user can edit if it is necessary.







