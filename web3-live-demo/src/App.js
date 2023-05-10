import React, { useEffect, useState} from 'react'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

import DisplayInformation from './components/DisplayInformation'
import ContractsInformation from './components/ContractsInformation'

import {  useEtherBalance, useEthers, useBlockMeta } from '@usedapp/core'

export default function App() {
  const { account, deactivate, activateBrowserWallet, chainId, library} = useEthers();
  const etherBalance = useEtherBalance(account);
  const blockInfo = useBlockMeta();
  const [bgColor, setBgColor] = useState("white");

  useEffect(()=>{
    account ? setBgColor("black") : setBgColor("white");
  },[account])

    // 'account' being undefined means that we are not connected.
  return (
      <Grid container spacing ={2} sx={{justifyContent:"center"}} >
        <Grid xs={3}>
          <Grid item  backgroundColor={bgColor} sx={{maxHeight:"100%", justifyContent:"center", padding:"1rem"}} borderRadius="25px" mt={5}>
            <Box textAlign="center">
              {!account && <Button variant = "contained" color="success" onClick={() => activateBrowserWallet()}>Connect</Button>}
              {account && <Button variant = "contained" color="success"onClick={() => deactivate()}>Disconnect</Button>}
            </Box>
            {account && chainId && <DisplayInformation blk={blockInfo} chainId={chainId}  acc={account} balance={etherBalance}/>}   
        </Grid>

        <Grid item backgroundColor={bgColor} sx={{padding:"1rem"}} borderRadius="25px" mt={5}>
          {library && account && chainId && <ContractsInformation acc={account} chainId={chainId} provider={library ? library: ""}/>}
        </Grid>
      </Grid>  
    </Grid>
  )
}