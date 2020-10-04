import React, { useState } from 'react';
import { Button } from 'reactstrap';
import { Transactions } from './components/Transactions';
import { Rewards } from './components/Customers/Rewards';
import { transactions } from './constants';
import './App.css';

function App() {
  const [showRewards, setShowRewards] = useState(false);
  return (
    <div className="App">
      <Button color="primary" onClick={() => setShowRewards(!showRewards)}>{`${showRewards ? 'Hide' : 'Show'} rewards`}</Button>
      <header className="App-header" style={{ flexDirection: 'row' }}>
        <Transactions
          data={transactions}
        />
        {showRewards && (<Rewards data={transactions} />)}
      </header>
    </div>
  );
}

export default App;
