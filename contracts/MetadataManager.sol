// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

library MetadataManager {
    

    function getSvgOfTokenId(address recipient, address sender, bool opened ) public pure returns(string memory) {
        string memory isOpened;
        
        opened ? isOpened = "opened" : isOpened = "unopened";
        

        string memory _recipient = toAsciiString(recipient);
        string memory _sender = toAsciiString(sender);
        
        string memory svg = string(abi.encodePacked(
            
            
            '<svg width="500" height="500" xmlns="http://www.w3.org/2000/svg">',
            	'<text x="10" y="20" style="fill:red;">Happy Birthday ',
            	_recipient,
            	'!!',
                '<tspan x="10" y="45">You have a have a gift </tspan>',
                '<tspan x="10" y="70">from waiting for you from ',
                _sender,
                '!</tspan>',
                '<tspan x="10" y="95">',
                isOpened,
                '</tspan>'
              '</text>',
            '</svg>'
            
            
            ));
            return svg;
        
    }
    
    // function copied from https://ethereum.stackexchange.com/questions/8346/convert-address-to-string/58341
    function toAsciiString(address x) internal pure returns (string memory) {
        bytes memory s = new bytes(40);
        for (uint i = 0; i < 20; i++) {
            bytes1 b = bytes1(uint8(uint(uint160(x)) / (2**(8*(19 - i)))));
            bytes1 hi = bytes1(uint8(b) / 16);
            bytes1 lo = bytes1(uint8(b) - 16 * uint8(hi));
            s[2*i] = char(hi);
            s[2*i+1] = char(lo);            
        }
        return string(s);
    }

    function char(bytes1 b) internal pure returns (bytes1 c) {
        if (uint8(b) < 10) return bytes1(uint8(b) + 0x30);
        else return bytes1(uint8(b) + 0x57);
    }
    
    
}