// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.13;

import "./ElectronToken.sol";
import './ElectricGenerator.sol';

contract Buyer {
    string public name = "Buyer_engine";
    address public owner;
    /* ------------------------------ALL STRUCT----------------------------------------------------------- */
    struct BuyerInfo {
        uint BuyerId;
        string Email;
        string Password;
        string Address;
        address BuyerBalanceAddress;
    }

    struct BuyerLoginValidator {
        uint BuyerId;
        string Email;
        string Password;
    }

    /* ----------ALL PROPERTIES-------------------------------------------------------*/
    mapping(uint => BuyerInfo) public currentBuyer;
    string[] public existUsername;
    BuyerLoginValidator[] public loginValidator;
    uint public id;
    ElectronToken public electronToken;
    ElectricGenerator public electricGenerator;

    constructor(ElectronToken _electronToken, ElectricGenerator _electricGenerator) public {
        electronToken = _electronToken;
        electricGenerator = _electricGenerator;
        owner = msg.sender;
    }

    /* ------------------------------ALL FUNCTIONS----------------------------------------------------------- */
    function registerBuyer(string memory _email, string memory _password, string memory _address) public returns(uint) {
        id = id + 1;
        currentBuyer[id] = BuyerInfo(id, _email, _password, _address, msg.sender);
        loginValidator.push(BuyerLoginValidator(id, _email, _password));
        return id;
    }
}