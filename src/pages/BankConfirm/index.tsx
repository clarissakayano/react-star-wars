import { memo } from 'react';

import { Button, Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useVehicles } from 'context/CheckoutContext';

import Footer from 'components/Footer';
import { BgColor } from 'components/Footer/styles';
import Header from 'components/Header';
import VehicleCard from 'components/VehicleCard';

import { ContainerCheck, Subtitle, Text1, TextSub, Title } from './styles';

const BankConfirm: React.FC = () => {
  const { selectedVehicle, fetchVehicles } = useVehicles();

  return (
    <>
      <Header />
      <ContainerCheck>
        <Link style={{ textDecoration: 'none' }} to="checkout/">
          <div>
            <Text1>Confirmação</Text1>
          </div>
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
                Pedido realizado com sucesso!
              </Title>
              <div className="d-flex justify-content-center">
                <Button>imprimir boleto</Button>
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

export default memo(BankConfirm);
