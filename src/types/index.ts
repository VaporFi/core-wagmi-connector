export type InjectedConnectorOptions = {
  name?: string | ((detectedName: string | string[]) => string);
  shimChainChangedDisconnect?: boolean;
  shimDisconnect?: boolean;
};

export type CoreWalletConnectorOptions = Pick<
  InjectedConnectorOptions,
  'shimDisconnect'
> & {
  UNSTABLE_shimOnConnectSelectAccount?: boolean;
};
