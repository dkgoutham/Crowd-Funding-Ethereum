import web3 from "./web3"
import CampaignFactory from "./build/CampaignFactory.json"

const instance = new web3.eth.Contract(
    CampaignFactory.abi,
    "0x23c48b74B122BD27fFa326636F313d069C44cfaA"
);

export default instance;