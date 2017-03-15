var express = require('express');
var bodyParser = require('body-parser');
var fees = require('./fees');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Part 2 of the Code Challenge (called from Part 1)
// This will distribute the funds per line item and return
// it to the order to be merged in Part 1.  Total is the line item total.
// Type 0: Real Property Recording.
// Type 1: Birth Certificate
var distributeFunds = function(total, type){

  var distribution = {};

  for(var i=0; i<fees[type].distributions.length; i++){
    var fundItem = fees[type].distributions[i];
    total -= Number(fundItem.amount);
    distribution[fundItem.name] = Number(fundItem.amount);
  }

  if(total !== 0){
    distribution['Other'] = total;
  }

  return distribution;

}

//Part 1 of the Code Challenge
//fullOrder : the array of orders
//getFundInfo : boolean that determines if we want part 2
var tallyOrder = function(fullOrder, getFundInfo){

  var result = [];
  var order = {};

  for(var i=0; i<fullOrder.length; i++){
    var orderObj = fullOrder[i];
    order.ID = orderObj.order_number;
    order.prices = [];
    order.total = 0;

    if(getFundInfo){
      order.funds = {};
    }

    for(var j=0; j<orderObj.order_items.length; j++){
      var itemObj = orderObj.order_items[j];
      var item = {price: 0, type: itemObj.type};
      var type = 0;

      if(itemObj.type === 'Real Property Recording'){
        for(var k=0; k<itemObj.pages; k++){
          if(k===0){ //initial page
            item.price += Number(fees[type].fees[0].amount);
          } else {  //additional pages
            item.price += Number(fees[type].fees[1].amount);
          }
        }
      }
      else { // Birth Certificate flat fee
        type = 1;
        item.price += Number(fees[type].fees[0].amount);
      }

      order.total += item.price;
      order.prices.push(item);

      if(getFundInfo){
        var itemFund = distributeFunds(item.price, type);
        for(var fund in itemFund){ //merge previous line item funds
          if(order.funds[fund]){
            order.funds[fund] += itemFund[fund];
          } else {
            order.funds[fund] = itemFund[fund];
          }
        }
      }

    }

    result.push(order);
    order = {};
  }
  console.log(result);
  return result;
}

//Part 3 API endpoints
app.post('/api/priceInfo', function(req, res){

  var fullOrder = req.body;
  var tally = tallyOrder(fullOrder, 0);

  res.status(200).send(tally);
});

app.post('/api/fundInfo', function(req,res){

  var fullOrder = req.body;
  var fundInfo = tallyOrder(fullOrder, 1);

  res.status(200).send(fundInfo);

});




module.exports = app;