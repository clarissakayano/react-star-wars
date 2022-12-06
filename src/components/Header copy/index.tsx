import { memo } from 'react';

import { Container } from 'react-bootstrap';

import logo from 'assets/logo.png';
import SpaceM from 'assets/sppicture.png';

import Main from 'components/Main';

import { BgColor } from './styles';

const Header: React.FC = () => (
  <>
    <BgColor className="d-flex justify-content-start">
      <div>
        <img src={logo} alt="space-motors" className="img-fluid" />
      </div>
    </BgColor>

    <Main />
  </>
);

export default memo(Header);
