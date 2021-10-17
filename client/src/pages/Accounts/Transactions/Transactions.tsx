import React from 'react';
import { TransactionsQuery, Transaction } from '../../../generated/graphql';
import { useAccountStyles } from '../styles/Account.style';
import { Loading } from '../../../components/Loading/Loading';
import { TransactionCard } from '../../../components/Cards/TransactionCard';
import PaymentIcon from '@material-ui/icons/Payment';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import ReceiptIcon from '@material-ui/icons/Receipt';

interface TransactionProps {
    account: TransactionsQuery | undefined;
    cardNumber: string | undefined;
    currencyIcon?: string;
}

export const Transactions: React.FC<TransactionProps> = ({ account, cardNumber, currencyIcon }) => {
    const classes = useAccountStyles();

    if (!account) {
        return <Loading />;
    }

    return (
        <div>
            <div className={classes.transactions}>
                <div className={classes.transactionsHeader}></div>
                <div className={classes.transactionCards}>
                    {account.transactions.length > 0 &&
                        account.transactions.map((transaction: Transaction) => {
                            let transactionIcon: any;

                            switch (transaction.transactionType) {
                                case 'payment':
                                    transactionIcon = <PaymentIcon />;
                                    break;
                                case 'deposit':
                                    transactionIcon = <AccountBalanceIcon />;
                                    break;
                                case 'withdrawal':
                                    transactionIcon = <LocalAtmIcon />;
                                    break;
                                case 'invoice':
                                    transactionIcon = <ReceiptIcon />;
                                    break;
                            }

                            return (
                                <TransactionCard
                                    key={transaction.id}
                                    title={transaction.transactionType}
                                    time={new Date(
                                        Date.parse(transaction.date),
                                    ).toLocaleDateString()}
                                    card={cardNumber}
                                    amount={transaction.amount}
                                    currencyIcon={currencyIcon}
                                    transactionIcon={transactionIcon}
                                />
                            );
                        })}
                </div>
            </div>
        </div>
    );
};
