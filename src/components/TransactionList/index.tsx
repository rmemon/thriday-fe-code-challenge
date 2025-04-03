import React, { useEffect, useState, useRef, useCallback } from 'react';
import './styles.css';
import { formatDate, } from '../../utils';
import { TransactionLoader } from './TransactionLoader';
import { getTransactions } from '../../utils/request';
import transactionStore from '../../store/transaction';

interface Transaction {
  transactionId: string;
  transactionTitle: string;
  transactiondate: string;
  logoUrl: string;
  suburb?: string;
  shortCategory?: string;
  cashflow: 'inflow' | 'outflow';
  amount: string;
}

interface TransactionRowProps {
  transaction: Transaction;
  isLastElement: boolean;
  lastTransactionRef: (node: HTMLDivElement | null) => void;
}

const TransactionRow: React.FC<TransactionRowProps> = ({ transaction, isLastElement, lastTransactionRef }) => (
  <div
    ref={isLastElement ? lastTransactionRef : null}
    className="d-flex align-items-center transaction-row"
    key={`transaction-${transaction.transactionId}`}
  >
    <div className="d-flex align-items-center justify-content-center transaction-row__icon">
      <img src={transaction.logoUrl} alt="Category Icon" />
    </div>

    <div className="d-flex justify-content-between align-items-center flex-1">
      <div>
        <div className="transaction-row__title">
          {transaction.transactionTitle}
          {transaction.transactionId}
        </div>
        <div className="transaction-row__subtitle">
          {transaction.suburb && <span>{transaction.suburb}</span>}
          {transaction.shortCategory && <span>{transaction.shortCategory}</span>}
        </div>
      </div>

      <div className="transaction-row__amount">
        <span className={transaction.cashflow === 'inflow' ? 'text-success' : 'text-danger'}>
          {transaction.cashflow === 'inflow' ? '+' : '-'}
        </span>
        <span><strong>${transaction.amount}</strong></span>
      </div>
    </div>
  </div>
);

export const TransactionList: React.FC = () => {
  const cashflow = transactionStore((state) => state.cashflow);
  const [groupedTransactions, setGroupedTransactions] = useState<Record<string, Transaction[]>>({});
  const observer = useRef<IntersectionObserver | null>(null);
  const hasMounted = useRef(false);

  // TODO: Move state to store
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Callback that implements infinite scroll by observing when last element becomes visible
  // and loading more data if available. Uses loading flag to prevent duplicate requests.
  const lastTransactionRef = useCallback((node: HTMLDivElement | null) => {
    if (loading || !node) return;

    observer.current?.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prev => prev + 1);
      }
    });

    observer.current.observe(node);
  }, [loading, hasMore]);

  useEffect(() => {
    setPage(1);
    setGroupedTransactions({});
  }, [cashflow]);

  useEffect(() => {
    if (!hasMounted.current && page === 1) {
      hasMounted.current = true;
      return;
    }

    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const { transactions, hasMore: more } = await getTransactions(page, 10, cashflow);

        setGroupedTransactions(prevGrouped => {
          const newGrouped = { ...prevGrouped };
          const transactionMap = new Map<string, boolean>();

          transactions.forEach((transaction: Transaction) => {
            const date = transaction.transactiondate;
            const key = `${date}-${transaction.transactionId}`;

            if (!transactionMap.has(key)) {
              transactionMap.set(key, true);
              newGrouped[date] = newGrouped[date] || [];
              // if (!newGrouped[date].some(t => t.transactionId === transaction.transactionId)) {
              newGrouped[date].push(transaction);
              // }
            }
          });

          return newGrouped;
        });

        setHasMore(more);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [page, cashflow]);

  const hasTransactions = Object.keys(groupedTransactions).length > 0;
  return (
    <section>
      <div className="d-flex d-flex-column gap-8">
        {Object.entries(groupedTransactions).map(([date, transactions], dateIndex) => (
          <div key={`date-${date}-${dateIndex}`} className='transaction-group d-flex d-flex-column gap-8'>
            <div className='transaction-group__date'>{formatDate(date)}</div>
            {transactions.map((transaction, index) => {
              const isLastElement = dateIndex === Object.keys(groupedTransactions).length - 1 &&
                index === transactions.length - 1;

              return (
                <TransactionRow
                  key={`transaction-${transaction.transactionId}-${index}`}
                  transaction={transaction}
                  isLastElement={isLastElement}
                  lastTransactionRef={lastTransactionRef}
                />
              );
            })}
          </div>
        ))}
        {loading && <TransactionLoader showSkeleton={page === 1} />}
        {!loading && !hasTransactions && (
           <div className='text-center py-4'>
             <div className='text-muted mb-2'>No transactions found</div>
             <div className='text-sm'>Try adjusting your filters or check back later</div>
           </div>
         )}
      </div>
    </section>
  );
};

export default TransactionList;