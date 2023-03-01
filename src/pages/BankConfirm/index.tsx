import { memo, useEffect } from 'react';

import { Button, Card, Container } from 'react-bootstrap';
import { BiArrowBack } from 'react-icons/bi';
import { Link, useParams } from 'react-router-dom';

import { useVehicles } from 'context/VehiclesContext';

import Footer from 'components/Footer';
import { BgColor } from 'components/Footer/styles';
import Header from 'components/Header';
import { VehicleType } from 'components/types/VehicleType';
import VehicleCard from 'components/VehicleCard';

import useTitle from 'hooks/useTitle';

import { ContainerCheck, Title, Title1 } from './styles';

const BankConfirm: React.FC = () => {
  const setTitle = useTitle();
  const { selectedVehicle, fetchVehicle } = useVehicles();

  const { id } = useParams();

  useEffect(() => {
    fetchVehicle(Number(id)); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  useEffect(() => {
    setTitle(`Confirmação `); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ContainerCheck>
        <Header />
        <Container className="my-3">
          <Link style={{ textDecoration: 'none' }} to="/">
            <Title1>
              <BiArrowBack />
              Confirmação
            </Title1>
          </Link>
        </Container>
        <div className="d-flex justify-content-center">
          <Card
            className="mb-5"
            style={{ width: '40rem', backgroundColor: 'black', color: 'white' }}
          >
            <Card.Body>
              <Card.Subtitle className="mb-2 text-muted mx-1">
                Corellia Mining Corporation
              </Card.Subtitle>
              <Title className="d-flex align-items-left mx-2">
                {selectedVehicle.name}
              </Title>
              <Title className="d-flex justify-content-center">
                Pedido realizado com sucesso!
              </Title>
              <div className="d-flex justify-content-center">
                <Button>imprimir boleto</Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      </ContainerCheck>
      <Footer />
    </>
  );
};

export default memo(BankConfirm);
