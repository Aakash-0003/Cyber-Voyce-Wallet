//SPDX-License-Identifier: UNLICENSED
pragma solidity >0.7.5;

contract Wallet {
    mapping(address => uint256) balance;

    event deposited(uint256 amount);
    event withdrawn(uint256 amount, address indexed withdrawnTo);
    event transfer(uint256 amount, address indexed transferredTo);

    function deposit() public payable returns (uint256) {
        balance[msg.sender] += msg.value;
        emit deposited(msg.value);
        return msg.value;
    }

    function withdraw(uint256 amount) public returns (uint256, address) {
        require(balance[msg.sender] >= amount, "INSUFFICIENT BALANCE!");
        balance[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);   
        emit withdrawn(amount, msg.sender);
        return (amount, msg.sender);
    }

    function transferTo(address recipient, uint256 amount)
        public
        returns (address, uint256)
    {
        require(balance[msg.sender] >= amount);
        balance[msg.sender] -= amount;
        balance[recipient] += amount;
        payable(recipient).transfer(amount);
        emit transfer(amount, msg.sender);
        return (recipient, amount);
    }

    function getBalance() public view returns (uint256) {
        return balance[msg.sender];
    }
}
