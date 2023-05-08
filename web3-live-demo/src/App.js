import React, { useEffect } from 'react'

import {  useEtherBalance, useEthers } from '@usedapp/core'
import { formatEther } from '@ethersproject/units'


export default function App() {
  const { account, deactivate, activateBrowserWallet, chainId, error } = useEthers()
  const etherBalance = useEtherBalance(account)
  //deleted check for if config.readOnlyUrls is populated
  useEffect(() => {
      console.log(account);
    }, [account])
    // 'account' being undefined means that we are not connected.


  return (
    <div>
      {/* <ConnectButton /> */}
      {!account && <button onClick={() => activateBrowserWallet()}>Connect</button>}
      {account && <p>Account: {account}</p>}
      {etherBalance && (
        <div className="balance">
          <br />
          Address:
          <p className="bold">{account}</p>
          <br />
          Balance:
          <p className="bold">{formatEther(etherBalance)}</p>
        </div>
      )}
    </div>
  )
}