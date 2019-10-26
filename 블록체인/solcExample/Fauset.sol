pragma solidity ^0.4.26;


contract owned{
    address owner;
    
    constructor() {
        owner=msg.sender;
    }
    
    modifier onlyOwner{
        require(msg.sender==owner,"Only the contract owner can call this function");
        _;
    }
}

contract mortal is owned{
    function destroy() public onlyOwner{
        selfdestruct(owner);
    }
}

contract Faucet is mortal{
    event Withdrawal(address indexed to,uint amount);
    event Deposit(address indexed from,uint amount);
    
    function withdrawa(uint withdraw_amount) public{
        require(withdraw_amount <= 0.1 ether);
        require(this.balance >= withdraw_amount,"Insufficient balance in faucet for withdrawal request");
        
        msg.sender.transfer(withdraw_amount);
        emit Withdrawal(msg.sender,withdraw_amount);
    }
    
    function () external payable{
        emit Deposit(msg.sender,msg.value);
    }
}