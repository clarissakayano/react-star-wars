import { memo } from 'react';

import { Container } from 'react-bootstrap';

import logo from 'assets/logo.png';

import { BgColor } from './styles';

const Footer: React.FC = () => (
  <BgColor className="d-flex flex-column">
    <Container className="d-flex flex-column">
      <div className="d-flex justify-content-center">
        <img className="img-fluid " src={logo} alt="space-motors" />
      </div>
      <p className="d-flex justify-content-center">
        site por<span>Clarissa A. Kayano</span>
      </p>
    </Container>
  </BgColor>
);

export default memo(Footer);
