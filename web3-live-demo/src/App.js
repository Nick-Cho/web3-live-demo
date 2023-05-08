import React, { useEffect} from 'react'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import {  useEtherBalance, useEthers, useBlockMeta } from '@usedapp/core'
import { formatEther } from '@ethersproject/units'


export default function App() {
  const { account, deactivate, activateBrowserWallet, chainId, library} = useEthers()
  const etherBalance = useEtherBalance(account)
  const blockInfo = useBlockMeta();

  //deleted check for if config.readOnlyUrls is populated
  useEffect(() => {

    console.log(library)
    }, [account, etherBalance])
    // 'account' being undefined means that we are not connected.
  return (
      <Grid container spacing ={2}>
        <Grid item xs = {5}></Grid>
        <Grid item backgroundColor="black" sx={{maxHeight:"100%"}} borderRadius="25px" xs = {3} mt={20} sx={{justifyContent: 'center'}}>
          {!account && <Button variant = "contained" color="success" onClick={() => activateBrowserWallet()}>Connect</Button>}
          {account && <Button variant = "contained" color="success"onClick={() => deactivate()}>Disconnect</Button>}
          
          {etherBalance && account && (
            <div className="balance">
              <br />
              <Typography color="white" variant="h4">Chain ID</Typography>
              <p>{chainId}</p>
              <Typography color="white" variant="h4">Block Number</Typography>
              <p>{blockInfo.blockNumber}</p>  
              <Typography color="white" variant="h4">Wallet Address:</Typography>
              <p className="bold">{account}</p>
              <Typography color="white" variant="h4">Wallet Balance (Ether):</Typography>
              <p className="bold">{formatEther(etherBalance)}</p>
              <Typography color="white" variant="h4">Wallet Balance (Wei):</Typography>
              <p>{formatEther(etherBalance)** 10}</p>
            </div>
          )}
      </Grid>
    </Grid>
  )
}