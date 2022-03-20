import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { Button, Header, Table, TableHeaderCell, TableRow } from 'semantic-ui-react'
import Layout from '../../../../components/Layout'
import RequestRow from '../../../../components/RequestRow'
import Campaign from '../../../../ethereum/campaign'
import CampaignFactory from '../../../../ethereum/factory'

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

export async function getStaticProps(context) {

    const address = context.params.address;

    const campaign = Campaign(address);
    const requestCount = await campaign.methods.getRequestCount().call()
    const contributersCount = await campaign.methods.contributersCount().call()

    const requests = await Promise.all(
        Array(parseInt(requestCount)).fill().map((e, i)=>{
            return campaign.methods.requests(i).call()
        })
    )

    return {
      props: {
        address,
        requestCount,
        requests: JSON.stringify(requests),
        contributersCount
      }, // will be passed to the page component as props
    }
  }

const Index = ({address,requestCount,requests, contributersCount}) => {
    const _requests = JSON.parse(requests);

    const rows = ()=>{
        return _requests.map((request, i)=>(
            <RequestRow
                key={i}
                id={i}
                request = {request}
                address = {address}
                contributersCount = {contributersCount}
            />
        ))
    }


  return (
    <Layout>
        <h3>Requests</h3>
        <Link href={`/campaigns/${address}/requests/new`}>
            <a>
                <Button primary floated='right' style={{marginBottom: 10}} >Add Request</Button>
            </a>
        </Link>
        <Table>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>ID</Table.HeaderCell>
                    <Table.HeaderCell>Description</Table.HeaderCell>
                    <Table.HeaderCell>Amount</Table.HeaderCell>
                    <Table.HeaderCell>Recipient</Table.HeaderCell>
                    <Table.HeaderCell>Approval</Table.HeaderCell>
                    <Table.HeaderCell>Approve</Table.HeaderCell>
                    <Table.HeaderCell>Finalize</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {rows()}
            </Table.Body>
        </Table>
        <div>Found {requestCount} requests.</div>
    </Layout>
  )
}

export default Index