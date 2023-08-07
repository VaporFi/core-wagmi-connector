export { CoreWalletConnector } from '../src/connector/CoreWallet';
export type {
  InjectedConnectorOptions,
  CoreWalletConnectorOptions,
} from '../src/types';
export {
  NoCoreWalletError,
  ChainNotConfiguredError,
  ChainDoesNotSupportMulticallError,
  SwitchChainError,
  ChainMismatchError,
  ConnectorAlreadyConnectedError,
} from '../src/errors';
