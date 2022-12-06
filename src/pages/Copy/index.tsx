import { memo, useCallback, useEffect, useState } from 'react';

import axios from 'axios';
import { Button, Col, Container, Pagination, Row } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';

import Config from 'Config';

import { useVehicles } from 'context/VehiclesContext';

import Footer from 'components/Footer';
import Header from 'components/Header';
import VehicleCard from 'components/VehicleCard';

import useTitle from 'hooks/useTitle';

import { BgColor } from './styles';

const Home: React.FC = () => {
  const { vehicles, isLoading, currentPage, totalPages, error, fetchVehicles } =
    useVehicles();
  const [search, setSearch] = useState('');

  const handlePageChange = useCallback(
    (page: number) => fetchVehicles(page),
    [fetchVehicles],
  );

  const handleSearch = useCallback(
    () => fetchVehicles(1, search),
    [fetchVehicles, search],
  );

  const handleClearSearch = useCallback(() => {
    fetchVehicles(1);
    setSearch('');
  }, [fetchVehicles]);

  return (
    <div>
      <Header />
      <BgColor>
        <Container>
          <h1 className="d-flex justify-content-center ">Star Wars</h1>
          <input
            type="text"
            placeholder="Buscar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button variant="danger" type="button" onClick={handleSearch}>
            Buscar
          </Button>
          {search.length > 0 && (
            <Button variant="primary" type="button" onClick={handleClearSearch}>
              Limpar
            </Button>
          )}
          {isLoading && <p>Loading...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {!isLoading && !error && (
            <Row className="row-cols-1 row-cols-sm-2 row-cols-md-4  justify-content-center mb-5 g-3">
              {vehicles.map((vehicle) => (
                <Col className="d-flex  g-3" key={vehicle.id}>
                  <VehicleCard vehicle={vehicle} />
                </Col>
              ))}

              {totalPages > 1 && (
                <ReactPaginate
                  className="mt-3 flex-wrap"
                  forcePage={currentPage - 1}
                  nextLabel=">"
                  onPageChange={(p) => handlePageChange(p.selected + 1)}
                  pageCount={totalPages}
                  previousLabel="<"
                />
              )}
            </Row>
          )}
        </Container>
        <Footer />
      </BgColor>
    </div>
  );
};

export default memo(Home);
