import '@sei-js/sei-global-wallet/eip6963';
import { createAppKit } from '@reown/appkit/react';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAccount, useBalance } from 'wagmi';
import { mainnet, arbitrum, polygon, optimism, base, type AppKitNetwork } from '@reown/appkit/networks';
import type { InferredCaipNetwork } from '@reown/appkit-common'


const projectId = 'c1ad19896ae25c0f46a9d4dbee5fbe78';
const queryClient = new QueryClient();


const sei : InferredCaipNetwork = {
  id : 1329,
  chainNamespace : "sei" as const,
  caipNetworkId : "sei:1329",
  name : "Sei Mainnet",
  nativeCurrency : { name : "SEI", symbol: "SEI", decimals: 18 },
  rpcUrls : {
    default: {
      http: ["https://evm-rpc.sei-apis.com"],
    }
},
  blockExplorers : {
    default: {
      name: "Sei Explorer",
      url: "https://seitrace.com",
    }
  }
}

const networks = [mainnet, arbitrum, polygon, optimism, base, sei] as [AppKitNetwork, ...AppKitNetwork[]]

const wagmiAdapter = new WagmiAdapter({
  networks: networks,
  projectId
});

createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata: {
    name: 'SEI Test',
    description: 'SEI Wallet Test',
    url: 'http://localhost:5173',
    icons: []
  },
  featuredWalletIds: [],
  includeWalletIds: [],
  excludeWalletIds: [],
  features: {
    analytics: false
  }
});

function WalletInfo() {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });

  return (
    <div style={{ padding: '20px' }}>
      <appkit-button />
      {isConnected && (
        <div style={{ marginTop: '20px' }}>
          <div>Address: {address}</div>
          <div>Balance: {balance?.formatted} {balance?.symbol}</div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <WalletInfo />
      </QueryClientProvider>
    </WagmiProvider>
  );
}