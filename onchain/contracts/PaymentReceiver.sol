// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IPaymentRedemption {
    function redeem(address from, uint256 amount) external;
}

contract PaymentReceiver {
    address public paymentRedemptionAddress;
    address public owner;

    event PaymentReceived(address indexed from, uint256 amount);
    event Redeemed(address indexed from, uint256 amount);

    constructor(address _paymentRedemptionAddress) {
        paymentRedemptionAddress = _paymentRedemptionAddress;
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    receive() external payable {
        emit PaymentReceived(msg.sender, msg.value);
    }

    function redeem(address from, uint256 amount) external onlyOwner {
        IPaymentRedemption(paymentRedemptionAddress).redeem(from, amount);
        emit Redeemed(from, amount);
    }

    function withdraw() external onlyOwner {
        payable(owner).transfer(address(this).balance);
    }
}
