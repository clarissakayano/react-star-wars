import { memo, useCallback, useEffect, useState } from 'react';

import axios from 'axios';
import {
  Col,
  Container,
  Form,
  FormControl,
  InputGroup,
  Row,
} from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { useParams } from 'react-router-dom';

import r2d2 from 'assets/r2d2.gif';

import Config from 'Config';

import { useVehicles } from 'context/VehiclesContext';

import Footer from 'components/Footer';
import Header from 'components/Header';
import { Pagination } from 'components/styles/Pagination';
import VehicleCard from 'components/VehicleCard';

import useTitle from 'hooks/useTitle';

import { BgButton, BgColor } from './styles';

const Home: React.FC = () => {
  const [search, setSearch] = useState('');
  const {
    vehicles,
    isLoading,
    currentPage,
    error,
    fetchVehicles,
    totalPages,
    setSelectedVehicle,
  } = useVehicles();
  const { id } = useParams();

  const handlePageChange = useCallback(
    (page: number) => {
      fetchVehicles(page, search);
    },
    [fetchVehicles, search],
  );

  const handleSearch = useCallback(
    () => fetchVehicles(1, search),
    [fetchVehicles, search],
  );

  const handleClearSearch = useCallback(() => {
    fetchVehicles(1);
    setSearch('');
  }, [fetchVehicles]);

  console.log(vehicles);

  return (
    <div>
      <Header />
      <BgColor className="d-flex flex-column">
        <Container className="d-flex flex-column justify-content-center">
          <BgButton className="d-flex justify-content-center mb-2 py-3">
            <Row className="w-100">
              <Col md={8}>
                <InputGroup className="mb-3 mt-3">
                  <Form.Control
                    placeholder="Digite o nome ou modelo do veículo"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </InputGroup>
              </Col>
              <Col className="d-flex justify-content-center" md={4}>
                <button
                  className="button d-flex flex-columns-md-1  justify-content-center align-items-center"
                  type="button"
                  onClick={handleSearch}
                >
                  Buscar
                </button>

                <div>
                  {search.length > 0 && (
                    <div className=" px-2">
                      <button
                        className="d-flex justify-content-center align-items-center  clearbutton"
                        id="clear"
                        type="button"
                        onClick={handleClearSearch}
                      >
                        Limpar
                      </button>
                    </div>
                  )}
                </div>
              </Col>
            </Row>
          </BgButton>

          {isLoading && (
            <p className="d-flex justify-content-center">
              {' '}
              <img src={r2d2} alt="loading..." />
            </p>
          )}
          {!isLoading && <p style={{ color: 'red' }}>{error}</p>}
          {!isLoading && !error && (
            <Container className="">
              <Row className="row-cols row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4  justify-content-center">
                {vehicles.map((vehicle, i) => (
                  <Col className="d-md-flex" key={i}>
                    <VehicleCard
                      vehicle={vehicle}
                      onClick={() => setSelectedVehicle(vehicle)}
                    />
                  </Col>
                ))}
              </Row>
            </Container>
          )}
          {totalPages > 1 && (
            <Pagination
              className="mt-3 flex-wrap"
              forcePage={currentPage - 1}
              nextLabel=">"
              onPageChange={(p) => handlePageChange(p.selected + 1)}
              pageCount={totalPages}
              previousLabel="<"
            />
          )}
        </Container>
        <Footer />
      </BgColor>
    </div>
  );
};

export default memo(Home);
