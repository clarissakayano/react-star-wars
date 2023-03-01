import { VehiclesProvider } from 'context/VehiclesContext';

import { FormType, NormalizedFormType } from 'components/types/CheckoutType';
import { VehicleType } from 'components/types/VehicleType';

export const normalizeFormData = (data: FormType): NormalizedFormType => ({
  ...data,
  cpf: Number(data.cpf),
  phone: Number(data.phone),
  card_number: data.card_number.length ? Number(data.card_number) : undefined,
});

export const urlToId = (url: string): string => url.split('/')[5];
export const normalizeVehicleData = (vehicles: VehicleType[]): VehicleType[] =>
  vehicles.map((vehicle) => ({ ...vehicle, id: urlToId(vehicle.url) }));
