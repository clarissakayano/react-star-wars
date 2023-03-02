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
  isInvalidCep: boolean;
  isLoadingCep: boolean;
  fetchAddress: (cep: string) => Promise<void>;
}

interface IvehiclesProviderProps {
  children: React.ReactNode;
}

export const ReactContext = createContext<IContextProps>({} as IContextProps);

export const AddressProvider: React.FC<IvehiclesProviderProps> = ({
  children,
}) => {
  const [address, setAddress] = useState<AddressType | undefined>();
  const [isLoadingCep, setIsLoadingAddress] = useState(false);
  const [isInvalidCep, setIsInvalidCep] = useState(true);

  const fetchAddress = useCallback(
    async (cep: string) => {
      setIsInvalidCep(false);
      setIsLoadingAddress(true);
      try {
        const { data } = await CepApi.get(`/${cep}/json/`);
        setAddress(data);
        if (data.erro) {
          setIsInvalidCep(true);
        }
        setIsLoadingAddress(false);
      } catch (e) {
        setIsInvalidCep(isInvalidCep);
      } finally {
        setIsLoadingAddress(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <ReactContext.Provider
      value={useMemo(
        () => ({
          address,
          isLoadingCep,
          isInvalidCep,
          fetchAddress,
        }),
        [address, isLoadingCep, isInvalidCep, fetchAddress],
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
    console.error('useAddress must be within AddressProvider');
  }

  return context;
};
