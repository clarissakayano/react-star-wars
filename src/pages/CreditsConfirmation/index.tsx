import { memo, useCallback, useEffect } from 'react';

import { Card, Container } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { BiArrowBack } from 'react-icons/bi';
import { Link, useParams } from 'react-router-dom';

import { useVehicles } from 'context/VehiclesContext';

import Footer from 'components/Footer';
import { BgColor } from 'components/Footer/styles';
import Header from 'components/Header';
import { Wrapper } from 'components/styles/GlobalStyles';
import { VehicleType } from 'components/types/VehicleType';
import VehicleCard from 'components/VehicleCard';

import { normalizeFormData } from 'helpers';

import useTitle from 'hooks/useTitle';

import {
  ContainerCheck,
  Subtitle,
  Text1,
  TextSub,
  Title,
  Title1,
} from './styles';

const CreditsConfirm: React.FC = () => {
  const { selectedVehicle, fetchVehicle, vehicle } = useVehicles();
  const setTitle = useTitle();

  const { id } = useParams();

  useEffect(() => {
    setTitle(`Confirmação `); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchVehicle(Number(id)); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <Wrapper>
      <ContainerCheck>
        <Header />
        <main>
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
              style={{
                width: '40rem',
                backgroundColor: 'black',
                color: 'white',
              }}
            >
              <Card.Body>
                <Card.Subtitle className="mb-2 text-muted">
                  {selectedVehicle?.manufacturer}
                </Card.Subtitle>
                <Title className="d-flex align-items-left">
                  {selectedVehicle?.name}
                </Title>
                <Title className="d-flex justify-content-center">
                  Compra realizada com sucesso!
                </Title>
                <div>
                  <p className="d-flex justify-content-center">
                    Confirmamos o seu pedido. Em breve você receberá um e-mail
                    com o status do processo de entrega
                  </p>
                </div>
              </Card.Body>
            </Card>
          </div>
        </main>
      </ContainerCheck>
      <Footer />
    </Wrapper>
  );
};

export default memo(CreditsConfirm);
