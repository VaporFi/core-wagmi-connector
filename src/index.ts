export {
  CoreWalletConnector,
  type CoreWalletConnectorOptions,
} from "../src/connector/CoreWallet";
export type { AvalancheProvider, InjectedConnectorOptions } from "../src/types";
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
} from "../src/errors";
