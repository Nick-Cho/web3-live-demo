import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

// import game from './index.js'

import * as spine from '@esotericsoftware/spine-player';

import DisplayInformation from './components/DisplayInformation'
import ContractsInformation from './components/ContractsInformation'

import { useEtherBalance, useEthers, useBlockMeta } from '@usedapp/core'

export default function App() {
  const { account, deactivate, activateBrowserWallet, chainId, library } = useEthers();
  const etherBalance = useEtherBalance(account);
  const blockInfo = useBlockMeta();
  const [bgColor, setBgColor] = useState("white");
  const [spineRef, setSpineRef] = useState(null);
 

  useEffect(() => {
    account ? setBgColor("gray") : setBgColor("white");
  }, [account])

  useEffect(()=>{
    try{
    spineRef.animationState.setAnimation(0,"jump", true);
    setTimeout(() => {
      spineRef.animationState.setAnimation(0,getRandomIdle(), true);
    }, 1000)}
    catch (err) {
      // console.log(err);
    }
  }, [blockInfo, spineRef])

  useEffect(() => {
    if (
      document.getElementById('canvas-spine-animation') &&
      !document.getElementsByClassName('spine-player')[0]
    ) {
        // console.log(spine);
        setSpineRef(new spine.SpinePlayer('canvas-spine-animation', {
          jsonUrl: 'https://zoombies.world/spine/space_walker_green.json',
          atlasUrl: 'https://zoombies.world/spine/Space_Walker_02.atlas',
          showControls: false,
          alpha: true,
          backgroundColor: '#00000000',
          animation: getRandomIdle(),
          // success: function (player) {
          //   setSpineRef(player);
          //   startRandomAnimation(player);
          // },
          error: function (reason) {
            alert(reason);
          },
        }))
      }
    }, []);

  const getRandomIdle  = () => {
    const idles = ['idle', 'idle2'];
    const randomIdle = idles[Math.floor(Math.random() * idles.length)];
    // console.log(`Random Idle chosen: ${randomIdle}`);
    return randomIdle;
  }

  // 'account' being undefined means that we are not connected.
  return (
    <div id ="star-field">
      <Grid container spacing={2} sx={{ justifyContent: "center" }} >
        <Grid item xs={3}>
          <Grid item backgroundColor={bgColor} sx={{ maxHeight: "100%", justifyContent: "center", padding: "1rem" }} borderRadius="25px" mt={5}>
            <Box textAlign="center">
              {!account && <Button variant="contained" color="success" onClick={() => activateBrowserWallet()}>Connect</Button>}
              {account && <Button variant="contained" color="success" onClick={() => deactivate()}>Disconnect</Button>}
            </Box>
            {account && chainId && <DisplayInformation blk={blockInfo} chainId={chainId} acc={account} balance={etherBalance} />}
            <div
              id="canvas-spine-animation"
              className="signin-character"
            ></div>
          </Grid>

          <Grid item backgroundColor={bgColor} sx={{ padding: "1rem" }} borderRadius="25px" mt={5}>
            {library && account && chainId && <ContractsInformation getRandomIdle={getRandomIdle} spineRef={spineRef} acc={account} chainId={chainId} provider={library ? library : ""} />}
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}