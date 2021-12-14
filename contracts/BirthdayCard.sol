// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./MetadataManager.sol";

contract BirthdayCard is ERC721, ERC721URIStorage, ERC721Burnable, ERC721Enumerable, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    mapping(uint => bool) public isOpened;
    mapping(address => uint[]) public addressToId;

    constructor() ERC721("Happy Birthday!!!!!!!!", "HBD!") {}

    function mintCard(address to) internal returns(uint) {
        _tokenIdCounter.increment();
        _safeMint(to, _tokenIdCounter.current());
        return _tokenIdCounter.current();
        
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }
    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function tokenURI(uint256 tokenId)
        public
        pure
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return MetadataManager.getSvgOfTokenId(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266,0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266,false);
    }
}
