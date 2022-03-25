# GenuineFund

<p>A new way of funding a project or venture by raising small amounts of money from a large number of people via ethereum blockchain technology without any middleman to function or to manage a user’s information.</p>

## Problem Statement

Crowdfunding is one of the most popular ways to raise funds for any project, cause or for helping any individual in need. With the onset of Covid we have seen a rise in Crowdfunding activities across the globe which includes small campaigns to help people get oxygen and medical help to large funds initiated by NGOs.

The major problems with the Current Crowdfunding Platforms are :
- Security : As the funds become larger, they need to be heavily secure, although stringent measures such as symmetric encryption are in place to make e-payment safe and secure, it is still vulnerable to hacking. Blockchain, which has never been compromised yet, can provide that level of security.
- Transparency and Anti-Fraud : We have seen, and continue to see a lot of crowdfunding scams happening around. There is no way to see where the funds are being used. GenuineFund aims to make the entire flow of funds transparent at every stage, so that there is no possibility of the money being misused.
- Global contribution : With some of the platforms being country specific, it becomes hard for people from other countries to contribute to various campaigns. Using blockchain anyone in the world can contribute to the campaign. Transactions are quick and convenient.

## Proposed Solution

### Stakeholders
The stakeholders can be divided into two parts:
- Campaign Creators : These are the users who created the Campaign.
- Contributors & Approvers : Contributors are the users who contribute and fund the campaigns. Approvers are Contributors who have contributed more than the Minimum Contribution, and have the power to approve the withdrawal requests.

### Detailed Solution

GenuineFund is a **Decentralized Application** powered by **Ethereum Blockchain**, where all the information about campaigns, contributions, withdrawal requests and funds are on a Blockchain Network, visible to all and decentralized. This means the funds and transactions are visible to everyone, stored at every node on the blockchain, thereby preventing the data from being stored in a centralized server or a single location. Hence not letting the money get into the hands of anyone and eliminating every possibility of it getting misused, an elegant and logical solution to the problem in hand.

#### Features
1. **Creating a Campaign** : Just like Crowdfunding in the real world as well as on other crowdfunding platforms, anyone can create a campaign in a few minutes. The campaign information will be managed by the Ethereum-based smart contract and thus cannot be tampered with.
  - Homepage
    <img width="1439" alt="Home Page" src="https://user-images.githubusercontent.com/75137173/160055557-1ae912d8-22dd-4ee9-9fc0-14f66bdca448.png">
    
  - Creating a Campaign
    <img width="1439" alt="creating campaign" src="https://user-images.githubusercontent.com/75137173/160055694-f9b03a0f-1b30-4c98-910d-4d2f71a4fcc6.png">

2. **Contributing to a Campaign** : Once a campaign has been created, users can share the campaign and anybody can contribute to the campaign. The funds will go to the address of the campaign and not to the creator of the campaign, thus making the process more efficient and anti-fraudulent.
  - Details of the Campaign
  <img width="1439" alt="Details of campaign" src="https://user-images.githubusercontent.com/75137173/160055955-af786434-3f23-4e5d-9acd-d23ebaa75b2a.png">
  
3. **Withdrawal of Funds** : The Creator of a Campaign can propose how to use the funds in the form of a Withdrawal Request. Anybody who contributes more than a particular amount is called an approver, and will be able to approve or deny the request.
**_Funds can’t be withdrawn without the approval of 50% approvers._**
  - Requests
    <img width="1439" alt="requests" src="https://user-images.githubusercontent.com/75137173/160057088-57c44187-16ad-4ca8-bd69-a0a779d2b313.png">
    
  - Finalising a request
    <img width="1439" alt="finalising request" src="https://user-images.githubusercontent.com/75137173/160057112-b6ab0c57-c448-4549-8f62-4adb99fcd51a.png">
    
### `CampaignFactory`

**Variables**

| variable |data types  | desc |
|--|--|--|
| deployedCampaigns| address[] | addresses of all the deployed contract|

<br> **Function**

| name| desc |
|--|--|
| createCampaign| create a new campaign contract |
|getDeployedCampaigns| return addresses of all the deployed contract|

### `Campaign`

**Variables**

|variable|data types|desc|
|--|--|--|
|manager  |address  |address of the person who is managing this compaign|
|minimumContribution|unint|Minimum donation required to be considered a contributor or 'approver' |
|approvers|address[]|List of addresses for every person who has donated money|
|requests|Request[]|List of requests that the manager has created.|

<br>**Functions**

|name| desc |
|--|--|
|Campaign  | constructor function that sets the minimumContribution and the owner |
|contribute|called when someone wants to donate money to the compaign and become an 'approver'|
|createRequest|called by the manager to create a new 'spending request'|
|approveRequest|called by each contributor to approve a spending request|
|finalizeRequest|After a request has gotten enough approvals, the manager can call this to get money sent  to the vendor|
|getSummary() |function to retrieving Campaign balance, minimumContribution , no of requests , no of Contributors and manager address |
|getRequestsCount() | function returning number of requests |

<br>**Request Struct**

|Name  |Type  |Purpose|
|--|--|--|
| description |string  |Describes why the request is being created|
|value|uint|Amount of money that the manager wants to send to the vendor|
|recipient|address|Address that the money will be sent to|
|complete|bool|True if the request has already been processed (money sent)|

###  `Prerequisites`

 1. Install **Metamask** as Google Chrome Extension and Create an account.
 2.  Request Ether by sharing your ethereum address in social media <br>(`https://faucet.rinkeby.io/)`
 3. Get 0.01 ether free by giving the ethereum address <br>`(http://rinkeby-faucet.com/)`
 4. Create an account in [https://infura.io](https://infura.io/)
 5. Create .env file in Ethereum directory and add these line to it.
	 

	> mnemonic = 'Your mnemonic code' <br>
	link = 'Your infura end point link '
	
 6. Deploy Contract by going into Ethereum Directory and run.
	> node deploy.js
	Copy the contract deploy address and replace it in factory.js file.

 7. Replace your "infura end point link" in web3.js file

### `Dependencies Used`

| Name | Version | Description |
|--|--|--|
| solc | 0.8.12 | Programming language to write smart contracts |
| ganache-cli  | 6.12.2 | Local Ethereum Test Network |
| mocha | 9.1.2 | JavaScript test framework |
|@truffle/hdwallet-provider | 1.5.1 | The **Truffle HDWallet provider** is a convenient and easy to configure network connection to ethereum through infura.io |
| web3 | 1.6.0 | Ethereum JavaScript API which connects to the Generic JSON RPC spec. |
| dotenv| 8.0.0 | Loads environment variables from a `.env` file into `process.env`|
| fs-extra| 10.0.0 | file system methods that aren't included in the native fs |
| next | 12.1.0 | JavaScript framework to build server-side rendering and static web application using React |
| react | 17.0.2 | JavaScript library for creating user interfaces |
| react-dom | 17.0.2 | DOM specific methods that can be used on React application |
| semantic-ui-react | 2.1.2 | react component kit provides pre define react component |
| semantic-ui-css | 2.4.1 | react component kit provides theme to react component as CSS |

### `Steps`
- **To install dependencies**
 > npm install
 - **To Compile the Contract**
 > node compile.js
 - **To test the Contract**
 > npm run test
 - **To deploy the Contract**
 > node deploy.js
 - **To run the application**
 > npm run dev
