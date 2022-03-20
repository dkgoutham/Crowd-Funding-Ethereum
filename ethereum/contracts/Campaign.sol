// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0 ;

contract CampaignFactory{

    address[] public deployedCampaigns;

    function createCampaign(uint minimum)public{
        address newCampaignAddress = address(new Campaign(minimum, msg.sender));
        deployedCampaigns.push(newCampaignAddress);
    }

    function getDeployed() public view returns(address[] memory){
        return deployedCampaigns;
    }
}

contract Campaign{
    struct Request{
        string description;
        uint value;
        address payable recipient;
        bool complete;
        uint approvalCount;
        mapping(address=>bool) approvals;
    }

    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    mapping(address=>bool) public contributers;
    uint public contributersCount;

    modifier restricted(){
        require(msg.sender == manager);
        _;
    }

    constructor(uint minimum, address creator){
        manager = creator;
        minimumContribution = minimum;
    }

    function createRequest(string memory description, uint value, address payable recipient) public restricted{

        Request storage newRequest = requests.push();

        newRequest.description = description;
        newRequest.value = value;
        newRequest.recipient = recipient;

    }

    function contribute() public payable{
        require( msg.value > minimumContribution);
        contributers[msg.sender]=true;
        contributersCount++;
    }

    function approveRequest(uint index) public{
        Request storage request = requests[index];

        require(contributers[msg.sender]);
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approvalCount++;

    }

    function finaliseRequest(uint index) public restricted{
        Request storage request = requests[index];

        require(request.approvalCount > contributersCount/2);
        require(!request.complete);

        request.recipient.transfer(request.value);
        request.complete = true;
    }

    function getSummary() public view returns(
        uint,
        uint,
        uint,
        uint,
        address
    ) {
        return (
            minimumContribution,
            address(this).balance,
            requests.length,
            contributersCount,
            manager
        );
    }

    function getRequestCount() public view returns(uint){
        return requests.length;
    }
}