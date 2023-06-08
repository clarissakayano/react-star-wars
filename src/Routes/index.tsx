import { memo } from 'react';

import { BrowserRouter, Routes as Switch, Route } from 'react-router-dom';

import BankConfirm from 'pages/BankConfirm';
import Checkout from 'pages/Checkout';
import CreditsConfirmation from 'pages/CreditsConfirmation';
import Home from 'pages/Home';
import NotFound from 'pages/NotFound';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" element={<Home />} />
        <Route path=":id/:name" element={<Checkout />} />
        <Route path="/confirm" element={<CreditsConfirmation />} />
        <Route path="/bankConfirm" element={<BankConfirm />} />
        <Route path="*" element={<NotFound />} />
      </Switch>
    </BrowserRouter>
  );
};

export default memo(Routes);
