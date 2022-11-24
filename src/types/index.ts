import { Ethereum } from "@wagmi/core";

export type AvalancheProvider = Ethereum & {
  isMetamask?: boolean;
  isAvalanche?: boolean;
  isConnected?: () => boolean;
  providers?: any[];
};

export type InjectedConnectorOptions = {
  name?: string | ((detectedName: string | string[]) => string);
  shimChainChangedDisconnect?: boolean;
  shimDisconnect?: boolean;
};

export type CoreWalletConnectorOptions = Pick<
  InjectedConnectorOptions,
  "shimChainChangedDisconnect" | "shimDisconnect"
> & {
  UNSTABLE_shimOnConnectSelectAccount?: boolean;
};
