pragma solidity ^0.8.13;

import "./ElectronToken.sol";



contract LOB {
    string public name = "LOB_engine";

    /* ------------------------------ALL STRUCT----------------------------------------------------------- */
    
    struct Order{
        uint BuyerId;
        uint OrderId;
        uint Price;
        uint Quantity;
        bool isBuyside;
        string orderCreateTime;
    }

 
    struct Limit{
        uint Price;
        Order[] orderList
    }

    struct OrderBook{
        Limit[] BuyLimit;
        Limit[] SellLimit;
    }




    /* ----------ALL PROPERTIES-------------------------------------------------------*/
    OrderBook public orderBook;
    uint public orderId;



    /* ------------------------------ALL FUNCTIONS----------------------------------------------------------- */
    function addOrder(uint _buyerId,uint _price, uint _quantity, bool _isBuyside, string _orderTime) public {
        require(_quantity > 0, "Quantity must be greater than 0");
        require(_price > 0, "Price must be greater than 0");
        orderId = orderId + 1;
        Order newOrder = Order(_buyerId,orderId, _price, _quantity, _isBuyside,_orderTime);
        if(_isBuyside){

            // limit exist
            for (uint i=0;i<orderBook.BuyLimit.length;i++){
                if(orderBook.BuyLimit[i].Price = _price){
                    orderBook.BuyLimit[i].orderList.push(newOrder);
                    return;
                }
            }

            // limit not exist
            Limit newLimit = Limit(_price,[newOrder]);
            orderBook.BuyLimit.push(newLimit);
        }
      
    }




}