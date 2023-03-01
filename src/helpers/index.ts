import { FormType, NormalizedFormType } from 'components/types/FormType';
import { VehicleType } from 'components/types/VehicleType';

export const normalizeFormData = (data: FormType): NormalizedFormType => ({
  ...data,
  cep: Number(data.cep),
  cpf: Number(data.cpf),
  phone: Number(data.phone),
  number: Number(data.number),
  card_number: data.card_number.length ? Number(data.card_number) : undefined,
  card_validity: data.card_validity.length
    ? Number(data.card_validity)
    : undefined,
  card_code: data.card_code.length ? Number(data.card_code) : undefined,
});

export const urlToId = (url: string): string => url.split('/')[5];
export const normalizeVehicleData = (vehicles: VehicleType[]): VehicleType[] =>
  vehicles.map((vehicle) => ({ ...vehicle, id: urlToId(vehicle.url) }));
