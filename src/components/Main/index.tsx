import { memo } from 'react';

import { Container } from 'react-bootstrap';

import logo from 'assets/logo.png';

import { BgColor } from './styles';

const Main: React.FC = () => (
  <BgColor>
    <Container className="d-flex justify-content-start">
      <div>
        <img src={Space} alt="Space Motors Banner" className="img-fluid" />
      </div>
    </Container>
  </BgColor>
);

export default memo(Main);
