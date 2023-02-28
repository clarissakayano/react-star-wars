import { VehiclesProvider } from 'context/VehiclesContext';

import { FormType, NormalizedFormType } from 'components/types/CheckoutType';
import { VehicleType } from 'components/types/VehicleType';

export const normalizeFormData = (data: FormType): NormalizedFormType => ({
  ...data,
  phone: Number(data.phone),
  cpf: data.cpf.length ? Number(data.cpf) : undefined,
  cartão: data.cartão.length ? Number(data.cartão) : undefined,
});

export const urlToId = (url: string): string => url.split('/')[5];
export const normalizeVehicleData = (vehicles: VehicleType[]): VehicleType[] =>
  vehicles.map((vehicle) => ({ ...vehicle, id: urlToId(vehicle.url) }));
