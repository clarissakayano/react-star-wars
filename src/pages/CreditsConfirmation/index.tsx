import { memo } from 'react';

import { Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useVehicles } from 'context/CheckoutContext';

import Footer from 'components/Footer';
import { BgColor } from 'components/Footer/styles';
import Header from 'components/Header';
import VehicleCard from 'components/VehicleCard';

import { ContainerCheck, Subtitle, Text1, TextSub, Title } from './styles';

const CreditsConfirm: React.FC = () => {
  const { selectedVehicle, fetchVehicles } = useVehicles();

  return (
    <>
      <Header />
      <ContainerCheck>
        <Link style={{ textDecoration: 'none' }} to="checkout/">
          <Text1>Confirmação</Text1>
        </Link>

        <div className="d-flex justify-content-center">
          <Card
            className="mb-5"
            style={{ width: '40rem', backgroundColor: 'black', color: 'white' }}
          >
            <Card.Body>
              <Card.Subtitle className="mb-2 text-muted">
                Corellia Mining Corporation
              </Card.Subtitle>
              <Title className="d-flex align-items-left">Digger Crawler</Title>
              <Title className="d-flex justify-content-center">
                Compra realizada com sucesso!
              </Title>
              <div>
                <p className="d-flex justify-content-center">
                  Confirmamos o seu pedido. Em breve você receberá um e-mail com
                  o status do processo de entrega
                </p>
              </div>
            </Card.Body>
          </Card>
          );
        </div>
      </ContainerCheck>
      <Footer />
    </>
  );
};

export default memo(CreditsConfirm);
