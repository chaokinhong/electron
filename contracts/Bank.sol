// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.13;

import "./ElectronToken.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


interface IUniswap {
    function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline)
        external
        virtual
        override
        payable
        ensure(deadline)
        returns (uint[] memory amounts)
    {
        require(path[0] == WETH, 'UniswapV2Router: INVALID_PATH');
        amounts = UniswapV2Library.getAmountsOut(factory, msg.value, path);
        require(amounts[amounts.length - 1] >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
        IWETH(WETH).deposit{value: amounts[0]}();
        assert(IWETH(WETH).transfer(UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]));
        _swap(amounts, path, to);
    }

    function WETH() external pure returns (address);
}

interface IERC20 {
    function totalSupply() external view returns (uint);

    function balanceOf(address account) external view returns (uint);

    function transfer(address recipient, uint amount) external returns (bool);

    function allowance(address owner, address spender) external view returns (uint);

    function approve(address spender, uint amount) external returns (bool);

    function transferFrom(
        address sender,
        address recipient,
        uint amount
    ) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint value);
    event Approval(address indexed owner, address indexed spender, uint value);
}


contract Bank {
    address owner;
    IUniswap uniswap;
    mapping(bytes32 => address) public whitelistedTokens;
    mapping(address => mapping(bytes32 => uint256)) public accountBalances;

    constructor(address _uniswap) {
        owner = msg.sender;
        uniswap = IUniswap(_uniswap);
    }


    function whitelistedToken(bytes32 symbol, address tokenAddress) external {
        require(msg.sender == owner ,'Private function');
        whitelistedTokens[symbol] = tokenAddress;
    }

    function depositTokens(uint256 amount, bytes32 symbol) external {
        accountBalances[msg.sender][symbol] += amount;
        ERC20(whitelistedTokens[symbol]).transferFrom(msg.sender, address(this), amount);
    }

    function withdrawTokens(uint256 amount, bytes32 symbol) external {
        require(accountBalances[msg.sender][symbol] >= amount, 'Not enough tokens');
        accountBalances[msg.sender][symbol] -= amount;
        ERC20(whitelistedTokens[symbol]).transfer(msg.sender, amount);
    }

    function swapEthToUSDT(address token, uint amountOutMin, uint deadline) external {
            address[] memory path = new address[](2);
            path[0] = uniswap.WETH()
            path[1] = token
            uniswap.swapExactETHForTokens(amountOutMin,path, address(this),deadline)
            accountBalances[msg.sender][symbol] += amount;
    }
    
    
}

