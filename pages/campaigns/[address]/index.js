import Link from 'next/link'
import React from 'react'
import { Button, Card, Grid } from 'semantic-ui-react'
import ContributeForm from '../../../components/ContributeForm'
import Layout from '../../../components/Layout'
import Campaign from '../../../ethereum/campaign'
import CampaignFactory from '../../../ethereum/factory'
import web3 from '../../../ethereum/web3'

export const getStaticPaths = async ()=>{
  const addresses = await CampaignFactory.methods.getDeployed().call();

  const paths = addresses.map((a)=>{
    return {
      params:{address: a}
    }
  })

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async(context)=>{
  const address = context.params.address

  const campaign = Campaign(address);

  const _summary = await campaign.methods.getSummary().call();
  
  const summary = {
    address,
    minimumContribution: _summary[0],
    balance: _summary[1],
    requestsCount: _summary[2],
    contributers: _summary[3],
    manager: _summary[4]
  }

  return {
    props:{summary}
  }
}

const CampaignShow = ({summary}) => {
  const {address, manager, contributers, requestsCount, balance, minimumContribution} = summary;

  const Cards = ()=>{
    const items = [
      {
        header: manager,
        meta: "Address of the manager",
        description: "The manager created this campaign",
        style: {overflowWrap: "break-word"}
      },
      {
        header: minimumContribution,
        meta: "Minimum Contribution (wei)",
        description:
          "You must contribute at least this much wei to become an approver",
      },
      {
        header: requestsCount,
        meta: "Number of Requests",
        description:
          "A request tries to withdraw money from the contract. Requests must be approved by approvers",
      },
      {
        header: contributers,
        meta: "Number of Approvers",
        description:
          "Number of people who have already donated to this campaign",
      },
      {
        header: web3.utils.fromWei(balance, "ether"),
        meta: "Campaign Balance (ether)",
        description:
          "The balance is how much money this campaign has left to spend.",
      },
    ]

    return <Card.Group items={items} />;
  }

  return (
    <Layout>
      <h3>Campaign Show</h3>
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>
            {Cards()}
          </Grid.Column>
          <Grid.Column width={6}>
            <ContributeForm address={address} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Link href={`/campaigns/${address}/requests/`}>
                <a>
                  <Button primary>View Requests</Button>
                </a>
            </Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      
    </Layout>
  )
}

export default CampaignShow