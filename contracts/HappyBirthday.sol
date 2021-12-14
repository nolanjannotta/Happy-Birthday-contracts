// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
// import "openzeppelin/contracts/token/ERC721/IERC721.sol";
import "./BirthdayCard.sol";
import "./MetadataManager.sol";




contract HappyBirthday is BirthdayCard {
    
    uint public fee;
    
    
    // mapping(uint => uint) public idToEth;  // tracks amount of Eth for gift Id
    // mapping(uint => mapping(address => uint)) public idToErc20Amount; // tracks token address to amount to gift id
    
                              
    // mapping(uint => mapping(address => uint)) public idToErc721Id; // tracks nft address to nft id to gift id
    enum GiftType{ETH, ERC20, ERC721}

    
    struct Gift {
        address asset;
        GiftType giftType;
        address sender;
        address recipient;
        uint tokenId;
        uint amount;
        bool opened;
        
    }
    mapping(uint => Gift) public giftIdtoGift;
    mapping(uint => bool) public idToSaidThanks;

    constructor(uint _fee) {
        fee = _fee;

    }
    
    function withdrawFee() internal {
        address payable owner = payable(owner());
        (bool sent, bytes memory data) = owner.call{value: fee}("");
        require(sent, "Failed to send Ether");
    }
    
    
    function giftEth(address recipient, uint amount) public payable {
        require(msg.value == amount + fee, "please send correct amount");
        withdrawFee();

        uint id = mintCard(recipient);
        isOpened[id] = false;

        giftIdtoGift[id] = Gift(address(0), GiftType.ETH, msg.sender, recipient, 0, msg.value, false);
    }
    
    function giftErc20(address tokenAddress, uint amount, address recipient) public payable {
        require(msg.value == fee, "please send fee");
        withdrawFee();
        uint id = mintCard(recipient);
        isOpened[id] = false;
        IERC20 token = IERC20(tokenAddress);
        token.transferFrom(msg.sender, address(this), amount);
        giftIdtoGift[id] = Gift(tokenAddress, GiftType.ERC20, msg.sender, recipient, 0, amount, false);
    }
    
    function giftErc721(address tokenAddress, address recipient, uint tokenId) public payable {
        require(msg.value == fee, "please send fee");
        withdrawFee();
        uint id = mintCard(recipient); 
        isOpened[id] = false;
        IERC721 token = IERC721(tokenAddress);
        token.safeTransferFrom(msg.sender, address(this), id);
        giftIdtoGift[id] = Gift(tokenAddress, GiftType.ERC721, msg.sender, recipient, tokenId, 1, false);

        
    }
    
    
    
    function open(uint id) public {
        require(ownerOf(id) == msg.sender, "you cant open this one!");
        require(isOpened[id] == false, "already opened");
        isOpened[id] = true;
        Gift storage gift =  giftIdtoGift[id];
        
        if(gift.asset == address(0)) {
            address payable recipient = payable(gift.recipient);
            (bool sent, bytes memory data) = recipient.call{value: gift.amount}("");
            require(sent, "Failed to send Ether");
            
        } else if(gift.giftType == GiftType.ERC20) {
            IERC20 token = IERC20(gift.asset);
            token.transfer(gift.recipient, gift.amount);
            
        } else{
            IERC721 token = IERC721(gift.asset);
            token.safeTransferFrom(address(this), gift.recipient, gift.tokenId);
        }
        
        
    }

    function sayThanks(uint id) public {
        require(ownerOf(id) == msg.sender, "this isnt your order");
        require(idToSaidThanks[id] == false, "already said thanks");
        idToSaidThanks[id] = true;

    }
    
    
    
}