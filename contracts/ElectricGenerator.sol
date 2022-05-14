// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.13;

import "./ElectronToken.sol";

contract ElectricGenerator {
    string public name = "ElectricGenerator_engine";
    address public owner;
    /* ------------------------------ALL STRUCT----------------------------------------------------------- */
    struct GeneratorInfo {
        uint GeneratorId;
        string Email;
        string Password;
        string Address;
        address GeneratorBalanceAddress;
    }

    struct GeneratorLoginValidator {
        uint GeneratorId;
        string Email;
        string Password;
    }

    struct LockStorage {
        uint GeneratorId;
        uint LockAmount;
    }

    /* ----------ALL PROPERTIES-------------------------------------------------------*/
    mapping(uint => GeneratorInfo) public currentGenerator;
    string[] public existUsername;
    GeneratorLoginValidator[] public loginValidator;
    uint public id;
    ElectronToken public electronToken;
    LockStorage[] public lockStorage;


    constructor(ElectronToken _electronToken) public {
        electronToken = _electronToken;
        owner = msg.sender;
    }



    /* ------------------------------ALL FUNCTIONS----------------------------------------------------------- */
    function registerGenerator( string memory _email, string memory _password, string memory _address) public returns(uint) {
        id = id + 1;
        currentGenerator[id] = GeneratorInfo(id, _email, _password, _address, msg.sender);
        loginValidator.push(GeneratorLoginValidator(id, _email, _password));
        return id;
    }

    function lockElectricityToPool(uint id, uint _quantity) public {
        require(_quantity > 0, "Quantity must be greater than 0");
        electronToken.mint(_quantity);
        lockStorage.push(LockStorage(id, _quantity));
    }






















   /*------------------------------------ALL VIEW FUNCTION HERE-----------------------------------*/
    function getLoginInfo() public view returns(GeneratorLoginValidator[] memory) {
        return loginValidator;
    }

    function getCurrentGeneratorBalance() public view returns(uint) {
        return electronToken.balanceOf(msg.sender);
    }

    

}
