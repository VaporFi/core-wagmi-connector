# Core Wagmi Connector

## About

`@vaporfi/core-wagmi-connector` is a connector for the popular [wagmi](https://wagmi.sh) library to support Core wallet extension from Avalabs

## How to use

You can use this connector as any other wagmi connector, import it and use it in your client setup

```js
import { chain, configureChains, createClient } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { publicProvider } from 'wagmi/providers/public';
import { CoreWalletConnector } from '@vaporfi/core-wagmi-connector';

const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon],
  [publicProvider()]
);

const wagmiClient = createClient({
  autoConnect: true,
  connectors: [
    new CoreWalletConnector({ chains, options: {} }),
    new InjectedConnector({ chains }),
  ],
  provider,
});
```

## Documentation

Have a look at [the wagmi repo](https://github.com/tmm/wagmi) and [the wagmi doc](https://wagmi.sh/) to learn more on connectors and wagmi.
