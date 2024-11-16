// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ERC20 {
    function burn(address account, uint256 amount) external;
}

contract PaymentRedemption {
    address public tokenAddress;

    constructor(address _tokenAddress) {
        tokenAddress = _tokenAddress;
    }

    function redeem(address from, uint256 amount) external {
        ERC20(tokenAddress).burn(from, amount);
    }
}
