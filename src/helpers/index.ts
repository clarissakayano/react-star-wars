import { VehiclesProvider } from 'context/VehiclesContext';

import { FormType, NormalizedFormType } from 'components/types/FormType';
import { VehicleType } from 'components/types/VehicleType';

export const normalizeFormData = (data: FormType): NormalizedFormType => ({
  ...data,
  cep: Number(data.cep),
  cpf: Number(data.cpf),
  phone: Number(data.phone),
  number: data.number.length ? Number(data.number) : undefined,
  card_number: data.card_number.length ? Number(data.card_number) : undefined,
  card_validity: data.card_validity.length
    ? Number(data.card_validity)
    : undefined,
  card_password: Number(data.card_password),
});

export const urlToId = (url: string): string => url.split('/')[5];
export const normalizeVehicleData = (vehicles: VehicleType[]): VehicleType[] =>
  vehicles.map((vehicle) => ({ ...vehicle, id: urlToId(vehicle.url) }));
