import Link from 'next/link';
import React, { useEffect } from 'react'
import { Card, Button } from 'semantic-ui-react';
import Layout from '../components/Layout';
import factory from '../ethereum/factory';

export async function getStaticProps(context) {

  const crowdFundings = await factory.methods.getDeployed().call();
  return {
    props: {
      crowdFundings
    }, // will be passed to the page component as props
  }
}

const CrowdFundingIndex = ({crowdFundings}) => {

  const CrowdItems = ()=>{
    const items = crowdFundings.map((t)=>(
      {
        header: t,
        description: <Link href={`/campaigns/${t}`}><a>View CrowdFunding</a></Link>,
        fluid: true
      }
    ));

    return <Card.Group items={items}/>
  }

  return (
    <Layout>
      <h3>Open Crowd Fundings</h3>
      <Link href="/campaigns/new">
        <a>
          <Button floated = "right" content="Create Campaign" icon="add" primary />
        </a>
      </Link>
      {CrowdItems()}
    </Layout>
  )
}

export default CrowdFundingIndex