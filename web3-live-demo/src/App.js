import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

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

  useEffect(() => {
    if (
      document.getElementById('canvas-spine-animation') &&
      !document.getElementsByClassName('spine-player')[0]
    ) {
        
        new spine.SpinePlayer('canvas-spine-animation', {
          jsonUrl: 'https://zoombies.world/spine/space_walker_green.json',
          atlasUrl: 'https://zoombies.world/spine/Space_Walker_02.atlas',
          
          showControls: false,
          alpha: true,
          backgroundColor: '#00000000',
          // success: function (player) {
          //   setSpineRef(player);
          //   startRandomAnimation(player);
            
          // },
          error: function (player, reason) {
            alert(reason);
          },
        });
      }
    }, []);

  const getRandomAnim = () => {
    const animations = ['idle', 'idle2', 'run', 'jump'];
    const randomAnimation = animations[Math.floor(Math.random() * animations.length)];

    return randomAnimation;
  };

  const startRandomAnimation = (player) => {
    const anim = getRandomAnim();
    player.animationState.setAnimation(0, anim, true);

    setTimeout(() => {
      startRandomAnimation(player);
    }, 50000);
  };

  // 'account' being undefined means that we are not connected.
  return (
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
          {library && account && chainId && <ContractsInformation acc={account} chainId={chainId} provider={library ? library : ""} />}
        </Grid>
      </Grid>
    </Grid>
  )
}