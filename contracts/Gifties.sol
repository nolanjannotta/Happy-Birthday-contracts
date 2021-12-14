// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";
import "./GiftiesCard.sol";
import "./MetadataManager.sol";




contract Gifties is GiftiesCard {
    
    uint public fee;
    
    
    // mapping(uint => uint) public idToEth;  // tracks amount of Eth for gift Id
    // mapping(uint => mapping(address => uint)) public idToErc20Amount; // tracks token address to amount to gift id
    
                              
    // mapping(uint => mapping(address => uint)) public idToErc721Id; // tracks nft address to nft id to gift id
    enum GiftType{ETH, ERC20, ERC721}

    

    
    struct Gift {
        GiftType giftType;
        address asset;        
        address sender;
        address recipient;
        uint tokenId;
        uint amount;
        bool isOpened;
        bool isThanked;
        string symbol;
        
    }
    mapping(uint => Gift) public giftIdtoGift;
    mapping(address => uint[]) public addressToIdSent;
    mapping(address => uint) public addressToAmountSent;
    // mapping(uint => bool) public idToSaidThanks;
    // mapping(uint => bool) public isOpened;

    constructor(uint _fee) {
        fee = _fee;

    }
    function addressToIds() public view {


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
        addressToIdSent[msg.sender].push(id);
        addressToAmountSent[msg.sender]++;
        // isOpened[id] = false;

        giftIdtoGift[id] = Gift(GiftType.ETH, address(0), msg.sender, recipient, id, amount, false, false, "Eth");
    }
    
    function giftErc20(address tokenAddress, uint amount, address recipient) public payable {
        require(msg.value == fee, "please send fee");
        withdrawFee();
        uint id = mintCard(recipient);
        addressToIdSent[msg.sender].push(id);
        addressToAmountSent[msg.sender]++;
        // isOpened[id] = false;
        IERC20Metadata token = IERC20Metadata(tokenAddress);
        string memory symbol = token.symbol();
        token.transferFrom(msg.sender, address(this), amount);
        giftIdtoGift[id] = Gift(GiftType.ERC20, tokenAddress, msg.sender, recipient, id, amount, false, false, symbol);
    }
    
    function giftErc721(address tokenAddress, address recipient, uint tokenId) public payable {
        require(msg.value == fee, "please send fee");
        withdrawFee();
        uint id = mintCard(recipient); 
        addressToIdSent[msg.sender].push(id);
        addressToAmountSent[msg.sender]++;
        // isOpened[id] = false;
        IERC721Metadata token = IERC721Metadata(tokenAddress);
        string memory symbol = token.symbol();
        token.safeTransferFrom(msg.sender, address(this), tokenId);
        giftIdtoGift[id] = Gift(GiftType.ERC721, tokenAddress, msg.sender, recipient, tokenId, id, false, false, symbol);

        
    }
    
    
    
    function open(uint id) public {
        Gift storage gift =  giftIdtoGift[id];
        require(ownerOf(id) == msg.sender, "you cant open this one!");
        require(gift.isOpened == false, "already opened");
        gift.isOpened = true;
        
        
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
        Gift storage gift =  giftIdtoGift[id];
        require(ownerOf(id) == msg.sender, "this isnt your order");
        require(gift.isThanked == false, "already said thanks");
        gift.isThanked = true;

    }
    
    
    
}