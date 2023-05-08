import React, { useEffect} from 'react'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import {  useEtherBalance, useEthers, useBlockMeta } from '@usedapp/core'
import { formatEther } from '@ethersproject/units'


export default function App() {
  const { account, deactivate, activateBrowserWallet, chainId, error } = useEthers()
  const etherBalance = useEtherBalance(account)
  const blockInfo = useBlockMeta();
  
  //deleted check for if config.readOnlyUrls is populated
  useEffect(() => {

    console.log(etherBalance)
    }, [account, etherBalance])
    // 'account' being undefined means that we are not connected.
  return (
      <Grid container spacing ={2}>
        <Grid item xs = {5}></Grid>
        <Grid item xs = {3} mt={20} sx={{justifyContent: 'center'}}>
          {!account && <Button variant = "contained" color="success" onClick={() => activateBrowserWallet()}>Connect</Button>}
          {account && <Button variant = "contained" color="success"onClick={() => deactivate()}>Disconnect</Button>}
          
          {etherBalance && account && (
            <div className="balance">
              <br />
              <h3>Chain ID</h3>
              <p>{chainId}</p>
              <h3>Block Number</h3>
              <p>{blockInfo.blockNumber}</p>  
              <h3>Wallet Address:</h3>
              <p className="bold">{account}</p>
              <h3>Wallet Balance (Ether):</h3>
              <p className="bold">{formatEther(etherBalance)}</p>
              <h3>Wallet Balance (Wei):</h3>
              <p>{formatEther(etherBalance)** 10}</p>
            </div>
          )}
      </Grid>
    </Grid>
  )
}