# Core Wagmi Connector

## About

`@vaporfi/core-wagmi-connector` is a connector for the popular [wagmi](https://wagmi.sh) library to support Core wallet extension from Avalabs

## How to use

You can use this connector as any other wagmi connector, import it and use it in your client setup

```js
import { configureChains, createConfig } from 'wagmi';
import { avalanche, avalancheFuji } from '@wagmi/core/chains';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { publicProvider } from 'wagmi/providers/public';
import { CoreWalletConnector } from '@vaporfi/core-wagmi-connector';

const { chains, publicClient } = configureChains(
  [avalanche, avalancheFuji],
  [publicProvider()]
);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [new CoreWalletConnector({ chains, options: {} })],
  publicClient,
});

// wrap your app with WagmiConfig
import { WagmiConfig } from 'wagmi';
const MyApp = ({ children, ...props }) => {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
};
```

## Documentation

Have a look at [the wagmi repo](https://github.com/tmm/wagmi) and [the wagmi doc](https://wagmi.sh/) to learn more on connectors and wagmi.
