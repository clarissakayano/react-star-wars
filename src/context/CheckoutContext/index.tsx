import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { VehicleType } from 'components/types/VehicleType';

import { normalizeVehicleData } from 'helpers';

import Api from 'services/Api';

interface IContextProps {
  vehicles: VehicleType[];
  currentPage: number;
  error: string | null;
  fetchVehicles: () => Promise<void>;
  isLoading: boolean;
  totalPages: number;
}

interface IFormProviderProps {
  children: React.ReactNode;
}

export const ReactContext = createContext<IContextProps>({} as IContextProps);

export const FormProvider: React.FC<IFormProviderProps> = ({ children }) => {
  const [form, setForm] = useState<VehicleType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const fetchVehicles = useCallback(async (page: number, search?: string) => {
    const limit = 10;
    setIsLoading(true);

    setCurrentPage(page);
    setIsLoading(true);
    setError(null);

    try {
      const {
        data: { results, count },
      } = await Api.get('vehicles/', { params: { search, page } });

      setVehicles(normalizeVehicleData(results));
      setTotalPages(Math.ceil(count / limit));
      console.log('seacrh', search);
      console.log('data', results);
    } catch {
      console.error('DEU ERRO');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVehicles(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ReactContext.Provider
      value={useMemo(
        () => ({
          vehicles,
          currentPage,
          isLoading,
          pages,
          error,
          currentPage,
          totalPages,
          fetchVehicles,
        }),
        [
          vehicles,
          isLoading,
          pages,
          currentPage,
          error,
          fetchVehicles,
          totalPages,
        ],
      )}
    >
      {children}
    </ReactContext.Provider>
  );
};

export const useCheckout = (): IContextProps => {
  const context = useContext(ReactContext);

  if (!context) {
    // eslint-disable-next-line no-console
    console.error('useCheckout must be within CheckoutProvider');
  }

  return context;
};
