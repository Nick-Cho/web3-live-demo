import React, { useEffect} from 'react'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'

import DisplayInformation from './components/DisplayInformation'

import {  useEtherBalance, useEthers, useBlockMeta } from '@usedapp/core'

export default function App() {
  const { account, deactivate, activateBrowserWallet, chainId, library} = useEthers()
  const etherBalance = useEtherBalance(account)
  const blockInfo = useBlockMeta();

    // 'account' being undefined means that we are not connected.
  return (
      <Grid container spacing ={2}>
        <Grid item xs = {5}></Grid>
        <Grid item backgroundColor="black" sx={{maxHeight:"100%", justifyContent:"center"}} borderRadius="25px" xs = {3} mt={20}>
          {!account && <Button variant = "contained" color="success" onClick={() => activateBrowserWallet()}>Connect</Button>}
          {account && <Button variant = "contained" color="success"onClick={() => deactivate()}>Disconnect</Button>}
          
          <DisplayInformation blk={blockInfo} id={chainId}  acc={account} balance = {etherBalance}/>   
      </Grid>
    </Grid>
  )
}