import { memo, useCallback } from 'react';

import { Card, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { VehicleType } from 'components/types/VehicleType';

import { CardVehicle, Text1, Title } from './styles';

interface IVehicleCardProps {
  vehicle: VehicleType;
  onClick: (evt: any) => void;
}

const VehicleCard: React.FC<IVehicleCardProps> = ({ vehicle, onClick }) => {
  const NormalizeNumber = useCallback(
    (num: number): string => new Intl.NumberFormat('pt-BR').format(num),
    [],
  );
  return (
    <CardVehicle onClick={onClick} className="w-100 d-md-flex mb-4">
      <Text1 className="mt-3 mx-2">{vehicle.manufacturer}</Text1>
      <Link style={{ textDecoration: 'none' }} to={`checkout/${vehicle.id}`}>
        <Title className="d-flex  mx-2">{vehicle.name}</Title>
      </Link>
      <Table className="">
        <tbody>
          <tr>
            <th colSpan={3}>Largura: </th>
            <td>{vehicle.length}</td>
          </tr>
          <tr>
            <th colSpan={3}>Velocidade: </th>
            <td>{vehicle.max_atmosphering_speed}</td>
          </tr>
          <tr>
            <th colSpan={3}>Equipe:</th>
            <td>{vehicle.crew}</td>
          </tr>
          <tr>
            <th colSpan={3}>Passageiros:</th>
            <td> {vehicle.passengers}</td>
          </tr>
          <tr>
            <th colSpan={3}>Capacidade de carga:</th>
            <td>
              {vehicle.cargo_capacity === 'none'
                ? '0'
                : NormalizeNumber(Number(vehicle.cargo_capacity))}
            </td>
          </tr>
        </tbody>{' '}
      </Table>
      <Title className="mx-2 mb-3">
        {vehicle.cost_in_credits === 'unknown'
          ? '-'
          : `¢ ${NormalizeNumber(Number(vehicle.cost_in_credits))}`}
      </Title>
    </CardVehicle>
  );
};
export default memo(VehicleCard);
