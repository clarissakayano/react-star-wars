import { memo } from 'react';

import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { VehicleType } from 'components/types/VehicleType';

import { Text1, Title } from './styles';

interface IVehicleCardProps {
  vehicle: VehicleType;
  onClick: (evt: any) => void;
}

// Adicione o evento de click como prop e no card
const VehicleCard: React.FC<IVehicleCardProps> = ({ vehicle, onClick }) => (
  <Card
    className="w-100"
    style={{ backgroundColor: 'black', color: 'white' }}
    onClick={onClick}
  >
    <Text1>{vehicle.manufacturer}</Text1>

    <Link style={{ textDecoration: 'none' }} to={`checkout/${vehicle.id}`}>
      <Title>{vehicle.name}</Title>
    </Link>
    <Text1>{vehicle.model}</Text1>
    <Card.Body className="d-flex flex-column-4 justify-content-between">
      <Card.Title className="d-flex flex-column">
        <p>Largura: {vehicle.length}</p>
        <p>Velocidade: {vehicle.max_atmosphering_speed}</p>
        <p>Equipe: {vehicle.crew}</p>
        <p>Passageiros: {vehicle.passengers}</p>
        <p>Capacidade de carga: {vehicle.cargo_capacity}</p>
        <Title>¢ {vehicle.cost_in_credits}</Title>
        <p />
      </Card.Title>
    </Card.Body>
  </Card>
);
export default memo(VehicleCard);
