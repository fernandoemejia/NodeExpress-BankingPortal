const express= require('express');
const router= express.Router();

const {accounts, writeJSON} = require('../data');

router.get('/transfer', (request, response) =>{
    response.render('transfer')
})

router.post('/transfer', (request, response) => {
   accounts[request.body.from].balance=  parseInt(accounts[request.body.from].balance) -  parseInt(request.body.amount);
   accounts[request.body.to].balance= parseInt(accounts[request.body.to].balance) + parseInt(request.body.amount,10);
  
   /*
   const accountsJSON= JSON.stringify(accounts,null,4);
   fs.writeFileSync(path.join(__dirname,'json/accounts.json'),accountsJSON,'utf8');
*/

    writeJSON();

   response.render('transfer', {message: "Transfer Completed"});
})

router.get('/payment', (request, response)=>{
    response.render('payment',{account: accounts.credit});
    //const accountsJSON= JSON.stringify(accounts);

   
})

router.post('/payment', (request, response)=>{
    accounts.credit.balance=accounts.credit.balance-request.body.amount;
    accounts.credit.available= parseInt(accounts.credit.available) + parseInt(request.body.amount, 10);
/*
    accountsJSON= JSON.stringify(accounts,null,4);
    fs.writeFileSync(path.join(__dirname,'json/accounts.json'),accountsJSON,'utf8');
*/
    writeJSON();
    response.render('payment',{ message: "Payment Successful", account: accounts.credit });
})

module.exports= router