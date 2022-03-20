import { Router, useRouter } from 'next/router';
import React, { useState } from 'react'
import { Form, Input, Message, Button } from "semantic-ui-react";
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';

const ContributeForm = ({address}) => {

    const [ether, setEther] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const onSubmit = async (e)=>{
        e.preventDefault();

        const campaign = Campaign(address);
        setLoading(true);
        setError("");
        try{
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(ether, "ether")
            });

            router.replace(`/campaigns/${address}`);
        }catch(err){
            setError(err.message);
        }
        setLoading(false);
    }

  return (
    <Form onSubmit={onSubmit} error={!!error}>
        <Form.Field>
          <label>Amount to Contribute</label>
          <Input 
            label="ether" 
            labelPosition="right" 
            value={ether}
            onChange={(e)=>setEther(e.target.value)}
        />
        </Form.Field>
        <Message error header="Oops!" content={error}/>
        <Button loading={loading} primary>Contribute!</Button>
      </Form>
  )
}

export default ContributeForm