import { Currency } from 'cardano-js';
import {
  SearchForPaymentAddressQuery,
  SearchForStakeAddressQuery,
} from '../../../../generated/typings/graphql-schema';
import { sortTokensDesc } from '../../../lib/arrays';
import { decodeHex } from '../../../lib/decodeHex';
import { isDefined } from '../../../lib/types';
import { IPaymentAddressSummary, IStakeAddressSummary } from '../types';

export const paymentAddressDetailTransformer = (
  address: string,
  s: SearchForPaymentAddressQuery
): IPaymentAddressSummary => {
  return {
    address,
    finalBalance: Currency.Util.lovelacesToAda(
      s.paymentAddresses![0]?.summary?.assetBalances[0]?.quantity || '0'
    ),
    tokensBalance:
      s
        .paymentAddresses![0]?.summary?.assetBalances?.filter(isDefined)
        .filter(({ assetName }) => assetName !== 'ada')
        .map((t) => ({ ...t, assetName: decodeHex(t.assetName.substr(2)) }))
        .sort(sortTokensDesc) || [],
    transactionsCount:
      s.transactions_aggregate?.aggregate?.count.toString() || '0',
  };
};

export const stakeAddressDetailTransformer = (
  address: string,
  s: SearchForStakeAddressQuery
): IStakeAddressSummary => {
  return {
    address,
    totalWithdrawals:
      s.withdrawals_aggregate?.aggregate?.count.toString() || '0',
    totalWithdrawn: Currency.Util.lovelacesToAda(
      s.withdrawals_aggregate?.aggregate?.sum?.amount || '0'
    ),
    transactionsCount:
      s.transactions_aggregate?.aggregate?.count.toString() || '0',
  };
};
