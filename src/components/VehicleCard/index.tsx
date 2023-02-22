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
    <CardVehicle onClick={onClick} className="d-md-flex px-md-5 py-md-4  mt-3">
      <Table className="">
        <Text1 className="mt-1">{vehicle.manufacturer}</Text1>
        <Link style={{ textDecoration: 'none' }} to={`checkout/${vehicle.id}`}>
          <Title>{vehicle.name}</Title>
        </Link>
        <Text1>{vehicle.model}</Text1>
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
      <Title>
        {vehicle.cost_in_credits === 'unknown'
          ? '-'
          : `¢ ${NormalizeNumber(Number(vehicle.cost_in_credits))}`}
      </Title>
    </CardVehicle>
  );
};
export default memo(VehicleCard);
