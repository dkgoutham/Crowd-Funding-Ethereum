import React from 'react'
import { Button, Table } from 'semantic-ui-react'
import campaign from '../ethereum/campaign'
import Campaign from '../ethereum/campaign'
import web3 from '../ethereum/web3'

const RequestRow = ({id, request, address, contributersCount}) => {

  const onApprove = async()=>{
    const campaign = Campaign(address);
    const accounts = await web3.eth.getAccounts();
    await campaign.methods.approveRequest(id).send({
      from: accounts[0]
    });
  }

  const onFinalize = async()=>{
    const campaign = Campaign(address);
    const accounts = await web3.eth.getAccounts();
    await campaign.methods.finaliseRequest(id).send({
      from: accounts[0]
    });
  }

  const readyToFinalize = request.approvalCount > contributersCount/2;

  return (
    <Table.Row disabled={request.complete} positive={readyToFinalize && !request.complete}>
        <Table.Cell>{id}</Table.Cell>
        <Table.Cell>{request.description}</Table.Cell>
        <Table.Cell>{web3.utils.toWei(request.value, "ether")}</Table.Cell>
        <Table.Cell>{request.recipient}</Table.Cell>
        <Table.Cell>{request.approvalCount}/{contributersCount}</Table.Cell>
        <Table.Cell>
          {
            request.complete ? null :
            (<Button color='green' basic onClick={onApprove}>Approve</Button>)
          }
        </Table.Cell>
        <Table.Cell>
          {
            request.complete ? null:
            (<Button color="teal" basic onClick={onFinalize}>Finalize</Button>)
          }
        </Table.Cell>
    </Table.Row>
  )
}

export default RequestRow