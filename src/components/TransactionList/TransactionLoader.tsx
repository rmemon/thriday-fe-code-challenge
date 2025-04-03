export const TransactionLoader = ({ showSkeleton = false }: { showSkeleton?: boolean }) => {
  const skeletonStyle = {
    background: 'var(--border-color)',
    borderRadius: '4px'
  };

  const SkeletonRow = () => (
    <div className="d-flex align-items-center transaction-row">
      <div className="d-flex align-items-center justify-content-center transaction-row__icon" style={skeletonStyle} />
      <div className="d-flex justify-content-between align-items-center flex-1">
        <div className="flex-1">
          <div className="transaction-row__title">
            <div style={{ ...skeletonStyle, width: '50%', height: '20px' }} />
          </div>
          <div className="transaction-row__subtitle">
            <div style={{ ...skeletonStyle, width: '30%', height: '14px', marginTop: '8px' }} />
          </div>
        </div>
        <div className="transaction-row__amount">
          <div style={{ ...skeletonStyle, width: '60px', height: '20px' }} />
        </div>
      </div>
    </div>
  );

  // <div className="d-flex d-flex-column gap-8">
  if (showSkeleton) {
    return (
      <>
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={`skeleton-${i}`} className='transaction-group d-flex d-flex-column gap-8'>
            <div className='transaction-group__date'>
              <div style={{ ...skeletonStyle, width: '120px', height: '16px' }} />
            </div>
            {Array.from({ length: 3 }).map((__, j) => (
              <SkeletonRow key={`skeleton-${i}-${j}`} />
            ))}
          </div>
        ))}
      </>
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