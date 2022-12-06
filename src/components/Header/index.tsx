import { memo } from 'react';

import { Container } from 'react-bootstrap';

import logo from 'assets/logo.png';
import SpaceM from 'assets/sppicture.png';

import Main from 'components/Main';

import { BannerM, BgColor } from './styles';

const Header: React.FC = () => (
  <header>
    <BgColor className="d-flex justify-content-start">
      <Container>
        <div>
          <img src={logo} alt="space-motors" className="img-fluid" />
        </div>
      </Container>
    </BgColor>
   <BannerM />
  </header>
);

export default memo(Header);
