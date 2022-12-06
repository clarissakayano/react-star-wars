import { VehiclesProvider } from 'context/VehiclesContext';

import { FormType } from 'components/types/CheckoutType';
import { VehicleType } from 'components/types/VehicleType';

type NormalizeFormType = {
  name: string;
  email: string;
  phone: number;
  cpf: number;
};

export const normalizeFormData = (data: FormType): NormalizeFormType => ({
  ...data,
  phone: data.phone.length ? Number(data.phone) : undefined,
  cpf: data.cpf.length ? Number(data.cpf) : undefined,
});

export const urlToId = (url: string): string => url.split('/')[5];
export const normalizeVehicleData = (vehicles: VehicleType[]): VehicleType[] =>
  vehicles.map((vehicle) => ({ ...vehicle, id: urlToId(vehicle.url) }));
