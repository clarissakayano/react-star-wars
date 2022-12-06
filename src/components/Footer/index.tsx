import { memo } from 'react';

import { Container } from 'react-bootstrap';

import logo from 'assets/logo.png';

import { BgColor } from './styles';

const Footer: React.FC = () => (
  <BgColor>
    <Container>
      <div>
        <img
          className="d-flex justify-content-center img-fluid "
          src={logo}
          alt="space-motors"
        />
      </div>
    </Container>
  </BgColor>
);

export default memo(Footer);
