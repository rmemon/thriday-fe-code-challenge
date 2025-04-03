import transactionStore from '../../store/transaction';

import checkIcon from '../../assets/check-circle-fill.svg';
import minusIcon from '../../assets/minus.svg';
import plusIcon from '../../assets/plus.svg';
// import arrowLeftIcon from '../../assets/arrow-left.svg';
// import arrowRightIcon from '../../assets/arrow-right.svg';
// import searchIcon from '../../assets/search.svg';

import './styles.css';


const Toolbar: React.FC = () => {
  const cashflow = transactionStore((state) => state.cashflow);
  const setCashflow = transactionStore((state) => state.setCashflow);

  const handleTabClick = (tab: string) => {
    setCashflow(tab as 'inflow' | 'outflow' | null);
  };

  type ToolbarTab = {
    id: 'inflow' | 'outflow' | null;
    label: string;
    icon: string;
    iconClassName: string;
    // alwaysShowIcon?: boolean;
  };

  const toolbarTabs: ToolbarTab[] = [
    {
      id: null,
      label: 'All',
      icon: checkIcon,
      iconClassName: 'btn-filter__checkicon'
    },
    {
      id: 'inflow',
      label: '',
      icon: plusIcon,
      iconClassName: 'btn-filter__icon'
    },
    {
      id: 'outflow',
      label: '',
      icon: minusIcon,
      iconClassName: 'btn-filter__icon'
    },
  ];


  return <section className="toolbar">
    {/* <div className="d-flex align-items-center justify-content-between mb-1">
      <div>
        Showing account X of X
      </div>

      <div className="d-flex gap-8">
        <button className="d-flex align-items-center justify-content-center btn-arrow">
          <img src={arrowLeftIcon} alt="arrow left" />
        </button>

        <button className="d-flex align-items-center justify-content-center btn-arrow">
          <img src={arrowRightIcon} alt="arrow right" />
        </button>
      </div>
    </div> */}

    <div className="d-flex gap-8 mb-1 flex-wrap">
      {/* <div className="d-flex flex-1 position-relative search-input">
        <img className="search-input__icon" src={searchIcon} alt="search" />
        <input className="search-input__input"
          type="text"
          placeholder="Name, amount, category or date"
        />
      </div> */}

      {toolbarTabs.map((tab, index) => (
        <button key={`tab-${tab.id}-${index}`} className={`d-flex align-items-center justify-content-center btn-filter ${cashflow === tab.id ? 'active' : ''}`} onClick={() => handleTabClick(tab.id)}>
          <img src={tab.icon} className={tab.iconClassName} alt={tab.label} />
          {tab.label}
        </button>
      ))}

      {/* <button className={`d-flex align-items-center justify-content-center btn-filter ${activeTab === 'all' ? 'active' : ''}`} onClick={() => handleTabClick('all')}>
        <img src={checkIcon} className="btn-filter__checkicon" alt="check" />
        All
      </button>

      <button className={`btn-filter ${activeTab === 'plus' ? 'active' : ''}`} onClick={() => handleTabClick('plus')}>
        <img src={plusIcon} className="btn-filter__icon" alt="plus" />
      </button>

      <button className={`btn-filter ${activeTab === 'minus' ? 'active' : ''}`} onClick={() => handleTabClick('minus')}>
        <img src={minusIcon} className="btn-filter__icon" alt="minus" />
      </button> */}
    </div>
  </section>;
};

export default Toolbar;
