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
  vehicle: VehicleType;
  setSelectedVehicle: (vehicle: VehicleType) => void;
}

interface IVehiclesProviderProps {
  children: React.ReactNode;
}

export const ReactContext = createContext<IContextProps>({} as IContextProps);

export const VehiclesProvider: React.FC<IVehiclesProviderProps> = ({
  children,
}) => {
  const [vehicles, setVehicles] = useState<VehicleType[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleType>();
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const fetchVehicles = useCallback(async (page: number, search?: string) => {
    const limit = 10;

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
          totalPages,
          fetchVehicles,
          selectedVehicle,
          setSelectedVehicle,
        }),
        [
          vehicles,
          isLoading,
          pages,
          currentPage,
          error,
          fetchVehicles,
          totalPages,
          selectedVehicle,
          setSelectedVehicle,
        ],
      )}
    >
      {children}
    </ReactContext.Provider>
  );
};

export const useVehicles = (): IContextProps => {
  const context = useContext(ReactContext);

  if (!context) {
    // eslint-disable-next-line no-console
    console.error('useVehicles must be within VehiclesProvider');
  }

  return context;
};
