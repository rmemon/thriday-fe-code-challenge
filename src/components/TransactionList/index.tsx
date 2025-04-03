import React from 'react';
import './styles.css';


const TransactionLoader = ({ showSkeleton = false }: { showSkeleton?: boolean }) => {
  const skeletonStyle = {
    background: 'var(--border-color)',
    borderRadius: '4px'
  };

  const SkeletonRow = () => (
    <div className="d-flex align-items-center transaction-row">
      <div className="d-flex align-items-center justify-content-center transaction-row__icon" style={skeletonStyle} />
      <div className="d-flex justify-content-between align-items-center flex-1">
        <div>
          <div className="transaction-row__title">
            <div style={{ ...skeletonStyle, width: '200px', height: '20px' }} />
          </div>
          <div className="transaction-row__subtitle">
            <div style={{ ...skeletonStyle, width: '120px', height: '14px', marginTop: '8px' }} />
          </div>
        </div>
        <div className="transaction-row__amount">
          <div style={{ ...skeletonStyle, width: '80px', height: '20px' }} />
        </div>
      </div>
    </div>
  );

  if (showSkeleton) {
    return (
      <div className="d-flex d-flex-column gap-8">
        {Array.from({ length: 7 }).map((_, i) => (
          <SkeletonRow key={`skeleton-${i}`} />
        ))}
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center align-items-center mt-1 mb-1">
      <div className="d-flex align-items-center gap-8">
        <p><strong style={{ color: 'var(--text-secondary-color)' }}>Loading transactions...</strong></p>
      </div>
    </div>
  );
};

export const Transaction: React.FC = () => {
  const generateTransaction = (index: number) => {
    const isInflow = Math.random() > 0.7;
    const amounts = ['29.95', '85.50', '1500.00', '42.00', '250.00', '95.00', '750.00'];
    const titles = [
      'Woolworths Groceries',
      'Office Supplies Purchase',
      'Client Payment',
      'Software Subscription',
      'Utility Bill Payment',
      'Marketing Expenses',
      'Consulting Services'
    ];
    const suburbs = ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'];
    const categories = ['Groceries', 'Office', 'Income', 'Software', 'Utilities', 'Marketing', 'Services'];

    return {
      date: '12/11/2024',
      transactionTitle: titles[index % titles.length],
      status: 'POSTED',
      bkStatus: 'C',
      description: titles[index % titles.length],
      bankDescription: `Transaction for ${titles[index % titles.length]}`,
      referenceClean: '',
      cashflow: isInflow ? 'inflow' : 'outflow',
      amount: amounts[index % amounts.length],
      balanceAmount: null,
      postedDate: '2024-11-12T06:10:27',
      transactiondate: '2024-11-12T06:10:27',
      logoUrl: 'https://webapp-ae-thrive-dev-primary.azurewebsites.net/images/cat-other-expenses-icon.png',
      receiptName: null,
      receiptUrl: null,
      receiptID: null,
      attachedFileName: null,
      attachmentId: null,
      gst: '0.00',
      merchantPresence: null,
      category: categories[index % categories.length],
      shortCategory: categories[index % categories.length],
      categoryId: String(index + 1).padStart(2, '0'),
      merchantName: null,
      merchantNameAlias: null,
      addressShort: null,
      addressLong: null,
      suburb: suburbs[index % suburbs.length],
      longitude: null,
      latitude: null,
      phone: null,
      email: null,
      webSite: null,
      acn: null,
      abn: null,
      originalCofACode: 358,
      currentCofACode: 358,
      chartOfAccount: null,
      salesTaxSource: 'SYSTEM',
      notes: null,
      invoiceTotalAmount: null,
      coaName: categories[index % categories.length],
      businessUsePercentage: 100.0000,
      tags: [],
      attachment: [],
      orderPriority: 0,
      id: Math.random().toString(36).substring(2, 6)
    };
  };

  const transactions = Array.from({ length: 7 }, (_, index) => generateTransaction(index));

  return (
    <section>
      <div className="d-flex d-flex-column gap-8">
        <TransactionLoader showSkeleton={true} />
        <div>Today</div>
        {transactions.map((transaction: any, index: number) => (
          <div
            className="d-flex align-items-center transaction-row"
            key={`transaction-${index}-${transaction.id}`}
          >
            <div className="d-flex align-items-center justify-content-center transaction-row__icon">
              <img
                src={transaction.logoUrl}
                alt="Category Icon"
              />
            </div>

            <div className="d-flex justify-content-between align-items-center flex-1">
              <div>
                <div className="transaction-row__title">
                  {transaction.transactionTitle}
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
        ))}
        <TransactionLoader showSkeleton={false} />
      </div>
    </section>
  );
};

export default Transaction;