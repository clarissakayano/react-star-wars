import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import { AddressType } from 'components/types/AddressType';

import CepApi from 'services/CepApi';

interface IContextProps {
  address: AddressType | undefined;
  errorCep: string | null;
  isLoadingCep: boolean;
  fetchAddress: (cep: string, onSuccess?: () => void) => Promise<void>;
}

interface IvehiclesProviderProps {
  children: React.ReactNode;
}

export const ReactContext = createContext<IContextProps>({} as IContextProps);

export const AdressProvider: React.FC<IvehiclesProviderProps> = ({
  children,
}) => {
  const [address, setAdress] = useState<AddressType | undefined>();
  const [isLoadingCep, setIsLoadingCep] = useState(false);
  const [errorCep, setErrorCep] = useState<string | null>(null);

  const fetchAddress = useCallback(
    async (cep: string, onSuccess?: () => void) => {
      setIsLoadingCep(true);
      setErrorCep(null);
      try {
        const { data } = await CepApi.get(`/${cep}/json/`);
        setAdress(data);
        onSuccess?.();
      } catch {
        setErrorCep('Erro: Endereço não encontrado');
      } finally {
        setIsLoadingCep(false);
      }
    },
    [],
  );

  return (
    <ReactContext.Provider
      value={useMemo(
        () => ({
          address,
          isLoadingCep,
          errorCep,
          fetchAddress,
        }),
        [address, isLoadingCep, errorCep, fetchAddress],
      )}
    >
      {children}
    </ReactContext.Provider>
  );
};

export const useAddress = (): IContextProps => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const context = useContext(ReactContext);

  if (!context) {
    // eslint-disable-next-line no-console
    console.error('usevehicles must be within CharatersProvider');
  }

  return context;
};
