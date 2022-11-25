export { CoreWalletConnector } from '../src/connector/CoreWallet';
export type {
  AvalancheProvider,
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
  ConnectorNotFoundError,
  ContractMethodNoResultError,
  ContractMethodRevertedError,
  ContractResultDecodeError,
} from '../src/errors';
