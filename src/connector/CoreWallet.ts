import {
  NoCoreWalletError,
  ResourceUnavailableError,
  RpcError,
  UserRejectedRequestError,
} from '../errors';
import { CoreWalletConnectorOptions } from '../types';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Address, Chain, WindowProvider } from 'wagmi';
import { getAddress } from 'viem';

export class CoreWalletConnector extends InjectedConnector {
  [x: string]: any;
  readonly id = 'CoreWallet';

  public provider: WindowProvider;
  public UNSTABLE_shimOnConnectSelectAccount: CoreWalletConnectorOptions['UNSTABLE_shimOnConnectSelectAccount'];

  constructor({
    chains,
    options: options_,
  }: {
    chains?: Chain[];
    options?: CoreWalletConnectorOptions;
  } = {}) {
    const options = {
      name: 'CoreWallet',
      shimDisconnect: true,
      shimChainChangedDisconnect: true,
      ...options_,
    };

    super({ chains, options });

    this.UNSTABLE_shimOnConnectSelectAccount =
      options.UNSTABLE_shimOnConnectSelectAccount;
  }

  async connect({ chainId }: { chainId?: number } = {}) {
    try {
      const provider = await this.getProvider();
      if (!provider) throw new NoCoreWalletError();

      if (provider.on && provider.isAvalanche) {
        provider.on('accountsChanged', this.onAccountsChanged);
        provider.on('chainChanged', this.onChainChanged);
        provider.on('disconnect', this.onDisconnect);
      }

      this.emit('message', { type: 'connecting' });

      let account: Address | null = null;
      if (
        this.UNSTABLE_shimOnConnectSelectAccount &&
        this.options?.shimDisconnect
      ) {
        account = await this.getAccount().catch(() => null);

        const isConnected = !!account;
        if (isConnected)
          await provider.request({
            method: 'wallet_requestPermissions',
            params: [{ eth_accounts: {} }],
          });
      }

      if (!account) {
        const accounts = await provider.request({
          method: 'eth_requestAccounts',
        });
        account = getAddress(accounts[0] as string) as Address;
      }

      // Switch to chain if provided
      let id = await this.getChainId();
      let unsupported = this.isChainUnsupported(id);
      if (chainId && id !== chainId) {
        const chain = await this.switchChain(chainId);
        id = chain.id;
        unsupported = this.isChainUnsupported(id);
      }

      return { account, chain: { id, unsupported }, provider };
    } catch (error) {
      if (this.isUserRejectedRequestError(error))
        throw new UserRejectedRequestError(error);
      if ((error as RpcError).code === -32002)
        throw new ResourceUnavailableError(error);
      throw error;
    }
  }

  async getProvider() {
    if (typeof window !== 'undefined') {
      const provider = this.findProvider(
        (window as Window & typeof globalThis & { avalanche?: WindowProvider })
          .avalanche
      );

      if (provider) {
        this.provider = provider;
      }
    }
    return this.provider;
  }

  getReady(ethereum?: WindowProvider) {
    const isCoreWallet = !!ethereum?.isAvalanche;
    if (!isCoreWallet) return;
    if (ethereum.isBraveWallet && !ethereum._events && !ethereum._state) return;
    if (ethereum.isKuCoinWallet) return;
    if (ethereum.isApexWallet) return;
    if (ethereum.isBitKeep) return;
    if (ethereum.isBlockWallet) return;
    if (ethereum.isMathWallet) return;
    if (ethereum.isOkxWallet || ethereum.isOKExWallet) return;
    if (ethereum.isOneInchIOSWallet || ethereum.isOneInchAndroidWallet) return;
    if (ethereum.isOpera) return;
    if (ethereum.isPortal) return;
    if (ethereum.isRabby) return;
    if (ethereum.isDefiant) return;
    if (ethereum.isTokenPocket) return;
    if (ethereum.isTokenary) return;
    if (ethereum.isZerion) return;
    return ethereum;
  }

  findProvider(ethereum?: WindowProvider) {
    if (ethereum?.providers) return ethereum.providers.find(this.getReady);
    return this.getReady(ethereum);
  }
}
