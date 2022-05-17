pragma solidity ^0.8.13;

import "./ElectronToken.sol";
import "./ElectricGenerator.sol";



contract LOB {
    string public name = "LOB_engine";
    address public owner;

    /* ------------------------------ALL STRUCT----------------------------------------------------------- */
    
    struct Order{
        uint BuyerId;
        uint OrderId;
        uint Price;
        uint Quantity;
        bool isBuyside;
        string orderCreateTime;
    }


    struct OrderInfo{
        uint BuyerId;
        uint Price;
        uint Quantity;
        bool isBuyside;
    }




    /* ----------ALL PROPERTIES-------------------------------------------------------*/
    mapping(uint=>Order[])  BuyLimitOrderbook;
    mapping(uint=>Order[])  SellLimitOrderbook;
    uint public orderId;
    mapping(uint=> OrderInfo) public orderInfo;
    ElectronToken public electronToken;
    ElectricGenerator public electricGenerator;
    uint[] public buyPriceList;
    uint[] public sellPriceList;



    /* ------------------------------CONSTRUCTOR----------------------------------------------------------- */
    constructor(ElectricGenerator _electricGenerator,ElectronToken _electronToken) public {
        electricGenerator = _electricGenerator;
        electronToken = _electronToken;
        owner = msg.sender;
    }




    /* ------------------------------ALL FUNCTIONS----------------------------------------------------------- */
    function addOrder(uint _buyerId,uint _price, uint _quantity, bool _isBuyside, string memory _orderTime) public {
        require(_quantity > 0, "Quantity must be greater than 0");
        require(_price > 0, "Price must be greater than 0");
        orderId = orderId + 1;
        Order memory newOrder = Order(_buyerId ,orderId, _price, _quantity, _isBuyside,_orderTime);

        // is a buy order
        if(_isBuyside){
            BuyLimitOrderbook[newOrder.Price].push(newOrder);
            orderInfo[_buyerId] = OrderInfo(_buyerId,_price,_quantity,_isBuyside);
            buyPriceList.push(_price);

        // is a sell order
        }else{
            SellLimitOrderbook[newOrder.Price].push(newOrder);
            orderInfo[_buyerId] = OrderInfo(_buyerId,_price,_quantity,!_isBuyside);
            sellPriceList.push(_price);            
        }
    }

    function modifyOrder(uint _buyerId,uint _newPrice, uint _newQuantity, bool _isBuyside, string memory _orderTime) public {
        require(_newQuantity > 0, "Quantity must be greater than 0");
        require(_newPrice > 0, "Price must be greater than 0");
        orderId = orderId + 1;
        Order memory newOrder = Order(_buyerId ,orderId, _newPrice, _newQuantity, _isBuyside,_orderTime);

        // is a buy order
        if(_isBuyside){
            //cancel order
            Order[] memory curLimitArray = BuyLimitOrderbook[_newPrice];
            for(uint i = 0; i < curLimitArray.length; i++){
                if(curLimitArray[i].BuyerId == _buyerId){
                    for(uint j=i; j < curLimitArray.length-1; j++){
                        BuyLimitOrderbook[_newPrice][j] = BuyLimitOrderbook[_newPrice][j+1];
                        BuyLimitOrderbook[_newPrice].pop();
                    }
                    break;
                }
            }

            // add order
            BuyLimitOrderbook[_newPrice].push(newOrder);
            orderInfo[_buyerId] = OrderInfo(_buyerId,_newPrice,_newQuantity,_isBuyside);
            buyPriceList.push(_newPrice);
         } else {
            //cancel order
            Order[] memory curLimitArray = SellLimitOrderbook[_newPrice];
            for(uint i = 0; i < curLimitArray.length; i++){
                if(curLimitArray[i].BuyerId == _buyerId){
                    for(uint j = i; j < curLimitArray.length - 1; j++){
                        SellLimitOrderbook[_newPrice][j] = SellLimitOrderbook[_newPrice][j+1];
                        SellLimitOrderbook[_newPrice].pop();
                    }
                    break;
                }
            }

            // add order
            SellLimitOrderbook[_newPrice].push(newOrder);
            orderInfo[_buyerId] = OrderInfo(_buyerId,_newPrice,_newQuantity,!_isBuyside);
            sellPriceList.push(_newPrice);
         }
    }

    function CancelOrder(uint _buyerId, bool _isBuyside) public {

        OrderInfo memory curBuyerOrderInfo = orderInfo[_buyerId];
        // is a buy order
        if(_isBuyside){
            //cancel order
            Order[] memory curLimitArray = BuyLimitOrderbook[curBuyerOrderInfo.Price];
            for(uint i = 0; i < curLimitArray.length; i++){
                if(curLimitArray[i].BuyerId == _buyerId){
                    for(uint j=i; j < curLimitArray.length-1; j++){
                        BuyLimitOrderbook[curBuyerOrderInfo.Price][j] = BuyLimitOrderbook[curBuyerOrderInfo.Price][j+1];
                        BuyLimitOrderbook[curBuyerOrderInfo.Price].pop();
                    }
                    break;
                }
            }
            orderInfo[_buyerId] = OrderInfo(_buyerId,0,0,false);
        } else {
            //cancel order
            Order[] memory curLimitArray = SellLimitOrderbook[curBuyerOrderInfo.Price];
            for(uint i = 0; i < curLimitArray.length; i++){
                if(curLimitArray[i].BuyerId == _buyerId){
                    for(uint j=i; j < curLimitArray.length-1; j++){
                        SellLimitOrderbook[curBuyerOrderInfo.Price][j] = SellLimitOrderbook[curBuyerOrderInfo.Price][j+1];
                        SellLimitOrderbook[curBuyerOrderInfo.Price].pop();
                    }
                    break;
                }
            }
            orderInfo[_buyerId] = OrderInfo(_buyerId,0,0,false);
        }
    }



    /*---------------------INSIDE CONTRACT FUNCTION------------------------------------------------- */




    /* ------------------------------ALL VIEW FUNCTION----------------------------------------------------------- */
    function getBuyOrderBook(uint _price) public view returns(Order[] memory){
        Order[] memory curLimitArray = BuyLimitOrderbook[_price];
        if(curLimitArray.length != 0){
            return curLimitArray;
        }
    }

    function getSellOrderBook(uint _price) public view returns(Order[] memory){
        Order[] memory curLimitArray = SellLimitOrderbook[_price];
        if(curLimitArray.length != 0){
            return curLimitArray;
        }
    }


}