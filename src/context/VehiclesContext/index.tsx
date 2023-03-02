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
  fetchVehicle: (charId: number | string) => Promise<void>;
  isLoading: boolean;
  totalPages: number;
  setSelectedVehicle: (vehicle: VehicleType) => void;
  selectedVehicle: VehicleType;
}

interface IVehiclesProviderProps {
  children: React.ReactNode;
}

export const ReactContext = createContext<IContextProps>({} as IContextProps);

export const VehiclesProvider: React.FC<IVehiclesProviderProps> = ({
  children,
}) => {
  const [vehicles, setVehicles] = useState<VehicleType[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleType[]>([]);
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
    } catch {
      setError('Algo de errado não está certo');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVehicles(1);
  }, [fetchVehicles]);

  const fetchVehicle = useCallback(async (charId: number | string) => {
    setIsLoading(true);

    try {
      const { data } = await Api.get(`/vehicles/${charId}`);

      setSelectedVehicle(data);
    } catch {
      setError('Não foi possível carregar o veículo');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <ReactContext.Provider
      value={useMemo(
        () => ({
          vehicles,
          selectedVehicle,
          currentPage,
          isLoading,
          pages,
          error,
          totalPages,
          fetchVehicles,
          fetchVehicle,
          setSelectedVehicle,
        }),
        [
          vehicles,
          selectedVehicle,
          currentPage,
          isLoading,
          pages,
          error,
          totalPages,
          fetchVehicles,
          fetchVehicle,
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
