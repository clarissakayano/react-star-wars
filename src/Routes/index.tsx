import { memo } from 'react';

import { BrowserRouter, Routes as Switch, Route } from 'react-router-dom';

import Home from 'pages/Home';
import NotFound from 'pages/NotFound';
import Checkout from 'pages/Checkout';
import CreditsConfirmation from 'pages/CreditsConfirmation';
import BankConfirm from 'pages/BankConfirm';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" element={<Home />} />
        <Route path="/checkout/:id" element={<Checkout />} />
        <Route path="/Confirm" element={<CreditsConfirmation />} />
        <Route path="/BankConfirm" element={<BankConfirm />} />
        <Route path="*" element={<NotFound />} />
      </Switch>
    </BrowserRouter>
  );
};

export default memo(Routes);
