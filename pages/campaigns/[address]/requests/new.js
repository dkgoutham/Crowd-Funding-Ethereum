import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { Button, Form, Input, Label, Message } from 'semantic-ui-react';
import Layout from '../../../../components/Layout';
import Campaign from '../../../../ethereum/campaign';
import web3 from '../../../../ethereum/web3';

const RequestNew = () => {
    const router = useRouter();
    const {address} = router.query;

    const [description, setDescription] = useState("");
    const [value, setValue] = useState("");
    const [recipient, setRecipient] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmit = async(e)=>{
        e.preventDefault();

        const campaign = Campaign(address);

        setLoading(true);
        setError("");
        try{
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.createRequest(description, web3.utils.toWei(value, "ether"), recipient).send({
                from: accounts[0]
            });

        }catch(err){
            setError(err.message);
        }
        setLoading(false);
    }

  return (
    <Layout>
        <Link href={`/campaigns/${address}/requests`}>
            <a>Back</a>
        </Link>

        <h3>Create a request</h3>

        <Form onSubmit={onSubmit} error={!!error}>
            <Form.Field>
                <label>Description</label>
                <Input 
                    value={description}
                    onChange={e=>setDescription(e.target.value)}
                    />
            </Form.Field>
            <Form.Field>
                <label>Value in Ether</label>
                <Input 
                    value={value}
                    onChange={e=>setValue(e.target.value)}
                    />
            </Form.Field>
            <Form.Field>
                <label>Recipient</label>
                <Input 
                    value={recipient}
                    onChange={e=>setRecipient(e.target.value)}
                    />
            </Form.Field>
            <Message error header="Oops!" content={error}/>
            <Button loading={loading} primary>Create</Button>
        </Form>
    </Layout>
  )
}

export default RequestNew