pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ElectronToken is ERC20 {
    constructor() ERC20("ETR", "ElectronToken") {
        _mint(msg.sender, 37700);
    }
}
