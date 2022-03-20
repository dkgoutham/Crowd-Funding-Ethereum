import Link from 'next/link'
import Router from 'next/router'
import React, { useState } from 'react'
import { Button, Form, Input, Message } from 'semantic-ui-react'
import Layout from '../../components/Layout'
import factory from "../../ethereum/factory"
import web3 from "../../ethereum/web3"

const CrowdFundingNew = () => {

    const [ minContribution, setMinContribution] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmit = async(e)=>{
        e.preventDefault();

        setLoading(true);
        setError("");
        try{
            const accounts = await web3.eth.getAccounts();
            await factory.methods.createCampaign(minContribution).send({from: accounts[0]})
        }catch(err){
            setError(err.message);
        } 
        setLoading(false);
        Router.push("/")
    }

  return (
      <Layout>
          <h3>Create a campaign</h3>

          <Form onSubmit={onSubmit} error={!!error}>
            <Form.Field>
                <label>Minimum Contribution</label>
                <Input 
                    label="wei" 
                    labelPosition='right' 
                    value={minContribution}
                    onChange = {e=>setMinContribution(e.target.value)}
                />
            </Form.Field>
            <Message error header="Oops!" content={error}/>

            <Button loading={loading} primary> Create </Button>
          </Form>

      </Layout>
  )
}

export default CrowdFundingNew