import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  DateTime: any,
};

export type Account = {
   __typename?: 'Account',
  id: Scalars['Int'],
  sortCode: Scalars['String'],
  iban: Scalars['String'],
  bic: Scalars['String'],
  currency: Scalars['String'],
  balance: Scalars['Float'],
};

export type AccountResponse = {
   __typename?: 'AccountResponse',
  account: Account,
  message: Scalars['String'],
};

export type Card = {
   __typename?: 'Card',
  id: Scalars['Int'],
  cardNumber: Scalars['String'],
  pin: Scalars['Float'],
  expiresIn: Scalars['DateTime'],
  cvv: Scalars['Float'],
  monthlySpendingLimit: Scalars['Float'],
};


export type LoginResponse = {
   __typename?: 'LoginResponse',
  accessToken: Scalars['String'],
  user: User,
};

export type Mutation = {
   __typename?: 'Mutation',
  logout: Scalars['Boolean'],
  revokeRefreshTokensForUser: Scalars['Boolean'],
  login: LoginResponse,
  register: Scalars['Boolean'],
  updatePassword: Scalars['Boolean'],
  destroyAccount: Scalars['Boolean'],
  addMoney: AccountResponse,
  exchange: AccountResponse,
  createAccount: Scalars['Boolean'],
  deleteAccount: Scalars['Boolean'],
  createTransaction: Scalars['Float'],
  createCard: Scalars['Boolean'],
};


export type MutationRevokeRefreshTokensForUserArgs = {
  userId: Scalars['Int']
};


export type MutationLoginArgs = {
  password: Scalars['String'],
  email: Scalars['String']
};


export type MutationRegisterArgs = {
  country: Scalars['String'],
  city: Scalars['String'],
  postCode: Scalars['String'],
  streetAddress: Scalars['String'],
  dateOfBirth: Scalars['String'],
  lastName: Scalars['String'],
  firsName: Scalars['String'],
  password: Scalars['String'],
  email: Scalars['String']
};


export type MutationUpdatePasswordArgs = {
  newPassword: Scalars['String'],
  oldPassword: Scalars['String']
};


export type MutationAddMoneyArgs = {
  currency: Scalars['String'],
  amount: Scalars['Float']
};


export type MutationExchangeArgs = {
  amount: Scalars['Float'],
  toAccountCurrency: Scalars['String'],
  selectedAccountCurrency: Scalars['String']
};


export type MutationCreateAccountArgs = {
  currency: Scalars['String']
};


export type MutationDeleteAccountArgs = {
  currency: Scalars['String']
};


export type MutationCreateTransactionArgs = {
  currency: Scalars['String']
};

export type Query = {
   __typename?: 'Query',
  me?: Maybe<User>,
  accounts: Array<Account>,
  account: Account,
  transactions: Array<Transaction>,
  cards: Array<Card>,
};


export type QueryAccountArgs = {
  currency: Scalars['String']
};


export type QueryTransactionsArgs = {
  currency: Scalars['String']
};

export type Transaction = {
   __typename?: 'Transaction',
  id: Scalars['Int'],
  transactionType: Scalars['String'],
  date: Scalars['DateTime'],
  amount: Scalars['String'],
};

export type User = {
   __typename?: 'User',
  id: Scalars['Int'],
  email: Scalars['String'],
  firstName: Scalars['String'],
  lastName: Scalars['String'],
  dateOfBirth: Scalars['String'],
  streetAddress: Scalars['String'],
  postCode: Scalars['String'],
  city: Scalars['String'],
  country: Scalars['String'],
};

export type AccountQueryVariables = {
  currency: Scalars['String']
};


export type AccountQuery = (
  { __typename?: 'Query' }
  & { account: (
    { __typename?: 'Account' }
    & Pick<Account, 'id' | 'balance'>
  ) }
);

export type AccountsQueryVariables = {};


export type AccountsQuery = (
  { __typename?: 'Query' }
  & { accounts: Array<(
    { __typename?: 'Account' }
    & Pick<Account, 'id' | 'balance' | 'currency' | 'sortCode' | 'iban' | 'bic'>
  )> }
);

export type AddMoneyMutationVariables = {
  amount: Scalars['Float'],
  currency: Scalars['String']
};


export type AddMoneyMutation = (
  { __typename?: 'Mutation' }
  & { addMoney: (
    { __typename?: 'AccountResponse' }
    & Pick<AccountResponse, 'message'>
    & { account: (
      { __typename?: 'Account' }
      & Pick<Account, 'id' | 'balance'>
    ) }
  ) }
);

export type CardsQueryVariables = {};


export type CardsQuery = (
  { __typename?: 'Query' }
  & { cards: Array<(
    { __typename?: 'Card' }
    & Pick<Card, 'id' | 'cardNumber' | 'pin' | 'expiresIn' | 'cvv' | 'monthlySpendingLimit'>
  )> }
);

export type CreateAccountMutationVariables = {
  currency: Scalars['String']
};


export type CreateAccountMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createAccount'>
);

export type CreateCardMutationVariables = {};


export type CreateCardMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createCard'>
);

export type CreateTransactionMutationVariables = {
  currency: Scalars['String']
};


export type CreateTransactionMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createTransaction'>
);

export type DeleteAccountMutationVariables = {
  currency: Scalars['String']
};


export type DeleteAccountMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteAccount'>
);

export type DestroyAccountMutationVariables = {};


export type DestroyAccountMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'destroyAccount'>
);

export type ExchangeMutationVariables = {
  selectedAccountCurrency: Scalars['String'],
  toAccountCurrency: Scalars['String'],
  amount: Scalars['Float']
};


export type ExchangeMutation = (
  { __typename?: 'Mutation' }
  & { exchange: (
    { __typename?: 'AccountResponse' }
    & Pick<AccountResponse, 'message'>
    & { account: (
      { __typename?: 'Account' }
      & Pick<Account, 'id' | 'balance'>
    ) }
  ) }
);

export type LoginMutationVariables = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'accessToken'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email' | 'firstName' | 'lastName' | 'dateOfBirth' | 'streetAddress' | 'postCode' | 'city' | 'country'>
    ) }
  ) }
);

export type LogoutMutationVariables = {};


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type MeQueryVariables = {};


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'firstName' | 'lastName' | 'dateOfBirth' | 'streetAddress' | 'postCode' | 'city' | 'country'>
  )> }
);

export type RegisterMutationVariables = {
  email: Scalars['String'],
  password: Scalars['String'],
  firstName: Scalars['String'],
  lastName: Scalars['String'],
  dateOfBirth: Scalars['String'],
  streetAddress: Scalars['String'],
  postCode: Scalars['String'],
  city: Scalars['String'],
  country: Scalars['String']
};


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'register'>
);

export type TransactionsQueryVariables = {
  currency: Scalars['String']
};


export type TransactionsQuery = (
  { __typename?: 'Query' }
  & { transactions: Array<(
    { __typename?: 'Transaction' }
    & Pick<Transaction, 'id' | 'transactionType' | 'date' | 'amount'>
  )> }
);

export type UpdatePasswordMutationVariables = {
  oldPassword: Scalars['String'],
  newPassword: Scalars['String']
};


export type UpdatePasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updatePassword'>
);


export const AccountDocument = gql`
    query Account($currency: String!) {
  account(currency: $currency) {
    id
    balance
  }
}
    `;

/**
 * __useAccountQuery__
 *
 * To run a query within a React component, call `useAccountQuery` and pass it any options that fit your needs.
 * When your component renders, `useAccountQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAccountQuery({
 *   variables: {
 *      currency: // value for 'currency'
 *   },
 * });
 */
export function useAccountQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AccountQuery, AccountQueryVariables>) {
        return ApolloReactHooks.useQuery<AccountQuery, AccountQueryVariables>(AccountDocument, baseOptions);
      }
export function useAccountLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AccountQuery, AccountQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<AccountQuery, AccountQueryVariables>(AccountDocument, baseOptions);
        }
export type AccountQueryHookResult = ReturnType<typeof useAccountQuery>;
export type AccountLazyQueryHookResult = ReturnType<typeof useAccountLazyQuery>;
export type AccountQueryResult = ApolloReactCommon.QueryResult<AccountQuery, AccountQueryVariables>;
export const AccountsDocument = gql`
    query Accounts {
  accounts {
    id
    balance
    currency
    sortCode
    iban
    bic
  }
}
    `;

/**
 * __useAccountsQuery__
 *
 * To run a query within a React component, call `useAccountsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAccountsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAccountsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAccountsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AccountsQuery, AccountsQueryVariables>) {
        return ApolloReactHooks.useQuery<AccountsQuery, AccountsQueryVariables>(AccountsDocument, baseOptions);
      }
export function useAccountsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AccountsQuery, AccountsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<AccountsQuery, AccountsQueryVariables>(AccountsDocument, baseOptions);
        }
export type AccountsQueryHookResult = ReturnType<typeof useAccountsQuery>;
export type AccountsLazyQueryHookResult = ReturnType<typeof useAccountsLazyQuery>;
export type AccountsQueryResult = ApolloReactCommon.QueryResult<AccountsQuery, AccountsQueryVariables>;
export const AddMoneyDocument = gql`
    mutation AddMoney($amount: Float!, $currency: String!) {
  addMoney(amount: $amount, currency: $currency) {
    account {
      id
      balance
    }
    message
  }
}
    `;
export type AddMoneyMutationFn = ApolloReactCommon.MutationFunction<AddMoneyMutation, AddMoneyMutationVariables>;

/**
 * __useAddMoneyMutation__
 *
 * To run a mutation, you first call `useAddMoneyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddMoneyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addMoneyMutation, { data, loading, error }] = useAddMoneyMutation({
 *   variables: {
 *      amount: // value for 'amount'
 *      currency: // value for 'currency'
 *   },
 * });
 */
export function useAddMoneyMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddMoneyMutation, AddMoneyMutationVariables>) {
        return ApolloReactHooks.useMutation<AddMoneyMutation, AddMoneyMutationVariables>(AddMoneyDocument, baseOptions);
      }
export type AddMoneyMutationHookResult = ReturnType<typeof useAddMoneyMutation>;
export type AddMoneyMutationResult = ApolloReactCommon.MutationResult<AddMoneyMutation>;
export type AddMoneyMutationOptions = ApolloReactCommon.BaseMutationOptions<AddMoneyMutation, AddMoneyMutationVariables>;
export const CardsDocument = gql`
    query Cards {
  cards {
    id
    cardNumber
    pin
    expiresIn
    cvv
    monthlySpendingLimit
  }
}
    `;

/**
 * __useCardsQuery__
 *
 * To run a query within a React component, call `useCardsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCardsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCardsQuery({
 *   variables: {
 *   },
 * });
 */
export function useCardsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CardsQuery, CardsQueryVariables>) {
        return ApolloReactHooks.useQuery<CardsQuery, CardsQueryVariables>(CardsDocument, baseOptions);
      }
export function useCardsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CardsQuery, CardsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CardsQuery, CardsQueryVariables>(CardsDocument, baseOptions);
        }
export type CardsQueryHookResult = ReturnType<typeof useCardsQuery>;
export type CardsLazyQueryHookResult = ReturnType<typeof useCardsLazyQuery>;
export type CardsQueryResult = ApolloReactCommon.QueryResult<CardsQuery, CardsQueryVariables>;
export const CreateAccountDocument = gql`
    mutation CreateAccount($currency: String!) {
  createAccount(currency: $currency)
}
    `;
export type CreateAccountMutationFn = ApolloReactCommon.MutationFunction<CreateAccountMutation, CreateAccountMutationVariables>;

/**
 * __useCreateAccountMutation__
 *
 * To run a mutation, you first call `useCreateAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAccountMutation, { data, loading, error }] = useCreateAccountMutation({
 *   variables: {
 *      currency: // value for 'currency'
 *   },
 * });
 */
export function useCreateAccountMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateAccountMutation, CreateAccountMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateAccountMutation, CreateAccountMutationVariables>(CreateAccountDocument, baseOptions);
      }
export type CreateAccountMutationHookResult = ReturnType<typeof useCreateAccountMutation>;
export type CreateAccountMutationResult = ApolloReactCommon.MutationResult<CreateAccountMutation>;
export type CreateAccountMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateAccountMutation, CreateAccountMutationVariables>;
export const CreateCardDocument = gql`
    mutation createCard {
  createCard
}
    `;
export type CreateCardMutationFn = ApolloReactCommon.MutationFunction<CreateCardMutation, CreateCardMutationVariables>;

/**
 * __useCreateCardMutation__
 *
 * To run a mutation, you first call `useCreateCardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCardMutation, { data, loading, error }] = useCreateCardMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateCardMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateCardMutation, CreateCardMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateCardMutation, CreateCardMutationVariables>(CreateCardDocument, baseOptions);
      }
export type CreateCardMutationHookResult = ReturnType<typeof useCreateCardMutation>;
export type CreateCardMutationResult = ApolloReactCommon.MutationResult<CreateCardMutation>;
export type CreateCardMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateCardMutation, CreateCardMutationVariables>;
export const CreateTransactionDocument = gql`
    mutation CreateTransaction($currency: String!) {
  createTransaction(currency: $currency)
}
    `;
export type CreateTransactionMutationFn = ApolloReactCommon.MutationFunction<CreateTransactionMutation, CreateTransactionMutationVariables>;

/**
 * __useCreateTransactionMutation__
 *
 * To run a mutation, you first call `useCreateTransactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTransactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTransactionMutation, { data, loading, error }] = useCreateTransactionMutation({
 *   variables: {
 *      currency: // value for 'currency'
 *   },
 * });
 */
export function useCreateTransactionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateTransactionMutation, CreateTransactionMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateTransactionMutation, CreateTransactionMutationVariables>(CreateTransactionDocument, baseOptions);
      }
export type CreateTransactionMutationHookResult = ReturnType<typeof useCreateTransactionMutation>;
export type CreateTransactionMutationResult = ApolloReactCommon.MutationResult<CreateTransactionMutation>;
export type CreateTransactionMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateTransactionMutation, CreateTransactionMutationVariables>;
export const DeleteAccountDocument = gql`
    mutation DeleteAccount($currency: String!) {
  deleteAccount(currency: $currency)
}
    `;
export type DeleteAccountMutationFn = ApolloReactCommon.MutationFunction<DeleteAccountMutation, DeleteAccountMutationVariables>;

/**
 * __useDeleteAccountMutation__
 *
 * To run a mutation, you first call `useDeleteAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAccountMutation, { data, loading, error }] = useDeleteAccountMutation({
 *   variables: {
 *      currency: // value for 'currency'
 *   },
 * });
 */
export function useDeleteAccountMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteAccountMutation, DeleteAccountMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteAccountMutation, DeleteAccountMutationVariables>(DeleteAccountDocument, baseOptions);
      }
export type DeleteAccountMutationHookResult = ReturnType<typeof useDeleteAccountMutation>;
export type DeleteAccountMutationResult = ApolloReactCommon.MutationResult<DeleteAccountMutation>;
export type DeleteAccountMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteAccountMutation, DeleteAccountMutationVariables>;
export const DestroyAccountDocument = gql`
    mutation DestroyAccount {
  destroyAccount
}
    `;
export type DestroyAccountMutationFn = ApolloReactCommon.MutationFunction<DestroyAccountMutation, DestroyAccountMutationVariables>;

/**
 * __useDestroyAccountMutation__
 *
 * To run a mutation, you first call `useDestroyAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDestroyAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [destroyAccountMutation, { data, loading, error }] = useDestroyAccountMutation({
 *   variables: {
 *   },
 * });
 */
export function useDestroyAccountMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DestroyAccountMutation, DestroyAccountMutationVariables>) {
        return ApolloReactHooks.useMutation<DestroyAccountMutation, DestroyAccountMutationVariables>(DestroyAccountDocument, baseOptions);
      }
export type DestroyAccountMutationHookResult = ReturnType<typeof useDestroyAccountMutation>;
export type DestroyAccountMutationResult = ApolloReactCommon.MutationResult<DestroyAccountMutation>;
export type DestroyAccountMutationOptions = ApolloReactCommon.BaseMutationOptions<DestroyAccountMutation, DestroyAccountMutationVariables>;
export const ExchangeDocument = gql`
    mutation Exchange($selectedAccountCurrency: String!, $toAccountCurrency: String!, $amount: Float!) {
  exchange(selectedAccountCurrency: $selectedAccountCurrency, toAccountCurrency: $toAccountCurrency, amount: $amount) {
    account {
      id
      balance
    }
    message
  }
}
    `;
export type ExchangeMutationFn = ApolloReactCommon.MutationFunction<ExchangeMutation, ExchangeMutationVariables>;

/**
 * __useExchangeMutation__
 *
 * To run a mutation, you first call `useExchangeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useExchangeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [exchangeMutation, { data, loading, error }] = useExchangeMutation({
 *   variables: {
 *      selectedAccountCurrency: // value for 'selectedAccountCurrency'
 *      toAccountCurrency: // value for 'toAccountCurrency'
 *      amount: // value for 'amount'
 *   },
 * });
 */
export function useExchangeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ExchangeMutation, ExchangeMutationVariables>) {
        return ApolloReactHooks.useMutation<ExchangeMutation, ExchangeMutationVariables>(ExchangeDocument, baseOptions);
      }
export type ExchangeMutationHookResult = ReturnType<typeof useExchangeMutation>;
export type ExchangeMutationResult = ApolloReactCommon.MutationResult<ExchangeMutation>;
export type ExchangeMutationOptions = ApolloReactCommon.BaseMutationOptions<ExchangeMutation, ExchangeMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    accessToken
    user {
      id
      email
      firstName
      lastName
      dateOfBirth
      streetAddress
      postCode
      city
      country
    }
  }
}
    `;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = ApolloReactCommon.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return ApolloReactHooks.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = ApolloReactCommon.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = ApolloReactCommon.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    email
    firstName
    lastName
    dateOfBirth
    streetAddress
    postCode
    city
    country
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>;
export const RegisterDocument = gql`
    mutation Register($email: String!, $password: String!, $firstName: String!, $lastName: String!, $dateOfBirth: String!, $streetAddress: String!, $postCode: String!, $city: String!, $country: String!) {
  register(email: $email, password: $password, firsName: $firstName, lastName: $lastName, dateOfBirth: $dateOfBirth, streetAddress: $streetAddress, postCode: $postCode, city: $city, country: $country)
}
    `;
export type RegisterMutationFn = ApolloReactCommon.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      dateOfBirth: // value for 'dateOfBirth'
 *      streetAddress: // value for 'streetAddress'
 *      postCode: // value for 'postCode'
 *      city: // value for 'city'
 *      country: // value for 'country'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return ApolloReactHooks.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = ApolloReactCommon.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = ApolloReactCommon.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const TransactionsDocument = gql`
    query Transactions($currency: String!) {
  transactions(currency: $currency) {
    id
    transactionType
    date
    amount
  }
}
    `;

/**
 * __useTransactionsQuery__
 *
 * To run a query within a React component, call `useTransactionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTransactionsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTransactionsQuery({
 *   variables: {
 *      currency: // value for 'currency'
 *   },
 * });
 */
export function useTransactionsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<TransactionsQuery, TransactionsQueryVariables>) {
        return ApolloReactHooks.useQuery<TransactionsQuery, TransactionsQueryVariables>(TransactionsDocument, baseOptions);
      }
export function useTransactionsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<TransactionsQuery, TransactionsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<TransactionsQuery, TransactionsQueryVariables>(TransactionsDocument, baseOptions);
        }
export type TransactionsQueryHookResult = ReturnType<typeof useTransactionsQuery>;
export type TransactionsLazyQueryHookResult = ReturnType<typeof useTransactionsLazyQuery>;
export type TransactionsQueryResult = ApolloReactCommon.QueryResult<TransactionsQuery, TransactionsQueryVariables>;
export const UpdatePasswordDocument = gql`
    mutation UpdatePassword($oldPassword: String!, $newPassword: String!) {
  updatePassword(oldPassword: $oldPassword, newPassword: $newPassword)
}
    `;
export type UpdatePasswordMutationFn = ApolloReactCommon.MutationFunction<UpdatePasswordMutation, UpdatePasswordMutationVariables>;

/**
 * __useUpdatePasswordMutation__
 *
 * To run a mutation, you first call `useUpdatePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePasswordMutation, { data, loading, error }] = useUpdatePasswordMutation({
 *   variables: {
 *      oldPassword: // value for 'oldPassword'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useUpdatePasswordMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdatePasswordMutation, UpdatePasswordMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdatePasswordMutation, UpdatePasswordMutationVariables>(UpdatePasswordDocument, baseOptions);
      }
export type UpdatePasswordMutationHookResult = ReturnType<typeof useUpdatePasswordMutation>;
export type UpdatePasswordMutationResult = ApolloReactCommon.MutationResult<UpdatePasswordMutation>;
export type UpdatePasswordMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdatePasswordMutation, UpdatePasswordMutationVariables>;