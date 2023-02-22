/* eslint-disable jsx-a11y/label-has-associated-control */
import { memo, useCallback, useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { BiArrowBack } from 'react-icons/bi';
import InputMask from 'react-input-mask';
import { Link, useParams } from 'react-router-dom';

import r2d2 from 'assets/r2d2.gif';

import { useVehicles } from 'context/VehiclesContext';

import Footer from 'components/Footer';
import Header from 'components/Header';
/*
import { FormType } from 'components/types/CheckoutType'; */

import { normalizeFormData } from 'helpers';

import cepApi from 'services/CepApi';

import {
  BgColor,
  BtnBg,
  ButtonBank,
  ButtonCredit,
  ButtonCreditCard,
  ButtonTicket,
  FormCheck,
  FormContainer,
  FormVehicule,
  Subtitle,
  TextInvalid,
  TextSub,
  Title,
} from './styles';

type FormType = {
  name: string;
  email: string;
  phone: string;
  cpf: string;

  cep: string;
  logradouro: string;
  número: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
};

const Checkout: React.FC = () => {
  const [lastCep, setLastCep] = useState('');
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);
  const [isInvalidCep, setIsInvalidCep] = useState(false);
  const { selectedVehicle, fetchVehicles } = useVehicles();
  const [payment, setPayment] = useState('');

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormType>();

  const { id } = useParams();

  const handleFormSubmit = useCallback((data: FormType) => {
    console.log('SUBMITED', normalizeFormData(data));
  }, []);

  const cepValue = watch('cep');

  const fetchAddress = useCallback(
    async (cep: string) => {
      setIsInvalidCep(false);
      setIsLoadingAddress(true);
      const { data } = await cepApi.get(`/${cep}/json/`);
      if (data.erro) {
        setIsInvalidCep(true);
      }
      setIsLoadingAddress(false);

      setValue('logradouro', data.logradouro);
      setValue('bairro', data.bairro);
      setValue('cidade', data.localidade);
      setValue('estado', data.uf);
    },
    [setValue],
  );

  useEffect(() => {
    const sanitizedCEP = cepValue?.replaceAll(/\D/g, '');

    if (sanitizedCEP?.length === 8 && cepValue !== lastCep) {
      setLastCep(cepValue);
      fetchAddress(sanitizedCEP);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cepValue]);
  /*
  setValue('Logradouro', address?.Logradouro ?? '');
*/

  return (
    <>
      <BgColor>
        <Header />
        <Container className="my-4">
          <Link style={{ textDecoration: 'none' }} to="/">
            <Title>
              <BiArrowBack size={30} className="me-3" />
              Checkout
            </Title>
          </Link>
        </Container>
        <Container>
          <Row className="row-cols-1 row-cols-md-2 row-cols-lg-3 justify-content-md-end">
            <Col>
              <FormContainer>
                <FormCheck className="mb-3">
                  <Subtitle>Informações Pessoais</Subtitle>
                  <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <div>
                      <span>Nome:</span>
                      <div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Digite o seu nome"
                          // eslint-disable-next-line react/jsx-props-no-spreading
                          {...register('name', {
                            required: 'Informe seu nome',
                            minLength: {
                              value: 3,
                              message: 'O nome precisa ter no mínimo 3 letras',
                            },
                          })}
                        />

                        {errors.name && <p>{errors.name.message}</p>}
                      </div>
                    </div>
                    <div>
                      <span>E-mail:</span>
                      <div>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Digite o seu e-mail"
                          // eslint-disable-next-line react/jsx-props-no-spreading
                          {...register('email')}
                        />
                      </div>
                    </div>

                    <div>
                      <span>Telefone</span>
                      <div>
                        <InputMask
                          className="form-control"
                          mask="(99) 99999-9999"
                          // eslint-disable-next-line react/jsx-props-no-spreading
                          {...register('phone')}
                        />
                      </div>
                    </div>
                    <div>
                      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                      <label htmlFor="cpf">CPF</label>
                      <div>
                        <InputMask
                          className="form-control"
                          mask="999-999-999-99"
                          {...register('cpf')}
                        />
                      </div>
                    </div>
                  </form>
                </FormCheck>
              </FormContainer>
            </Col>
            <Col>
              <FormContainer>
                <FormCheck className=" mb-3">
                  <Subtitle>Endereço</Subtitle>
                  <form>
                    <div>
                      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                      <label htmlFor="cep">CEP</label>

                      <div>
                        <InputMask
                          className="form-control"
                          mask="99999-999"
                          {...register('cep', { required: 'informe o CEP' })}
                        />
                        {isLoadingAddress && (
                          <span className="d-flex justify-content-center">
                            <img src={r2d2} alt="loading..." />
                          </span>
                        )}
                        {!isLoadingAddress && isInvalidCep && (
                          <TextInvalid>CEP inválido</TextInvalid>
                        )}
                        {errors.cep && <p>{errors.cep.message}</p>}
                      </div>
                    </div>
                    <div>
                      <div>
                        <label htmlFor="Logradouro">Logradouro</label>
                      </div>
                      <input
                        className="form-control"
                        type="text"
                        placeholder=""
                        {...register('logradouro')}
                      />
                      <Row>
                        <Col>
                          <div>
                            <label htmlFor="Número">Número</label>
                          </div>
                          <input
                            type="text"
                            placeholder="número"
                            className="form-control"
                            {...register('número')}
                          />
                        </Col>
                        <Col>
                          <div>
                            <label htmlFor="Complemento">Complemento</label>
                            <div>
                              <input
                                className="form-control"
                                type="text"
                                placeholder="Complemento"
                                {...register('complemento')}
                              />
                            </div>
                          </div>
                        </Col>
                      </Row>
                      <div>
                        <div>
                          <label htmlFor="Bairro">Bairro</label>
                        </div>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="bairro"
                          {...register('bairro')}
                        />
                      </div>
                      <div>
                        <label htmlFor="Cidade">Cidade</label>
                      </div>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="cidade"
                        {...register('cidade')}
                      />

                      <div>
                        <div>
                          <label htmlFor="Estado">Estado</label>
                        </div>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="estado"
                          {...register('estado')}
                        />
                      </div>
                    </div>
                  </form>
                </FormCheck>
              </FormContainer>
            </Col>
            <Col>
              <FormContainer className="mb-2">
                <FormCheck>
                  <Subtitle className="mb-3">Forma de Pagamento</Subtitle>
                  <Row className="row-cols-1 row-cols-md-1 row-cols-lg-2  row-cols-xl-2">
                    <Col className="d-flex justify-content-evenly mb-3">
                      <ButtonCredit
                        type="button"
                        onClick={() => setPayment('credit')}
                        active={payment}
                      >
                        Cartão de crédito
                      </ButtonCredit>
                    </Col>
                    <Col>
                      <ButtonBank
                        type="button"
                        onClick={() => setPayment('bank')}
                        active={payment}
                      >
                        Boleto Bancário
                      </ButtonBank>
                    </Col>
                  </Row>

                  {payment === 'credit' && (
                    <form>
                      <div>
                        <label htmlFor="Nome do Titular">
                          Nome do titular do Cartão
                        </label>
                      </div>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Titular"
                        {...register('name')}
                      />
                      <div>
                        <label htmlFor="Número do Cartão">
                          Número do Cartão
                        </label>
                      </div>
                      <div>
                        <InputMask
                          className="form-control"
                          mask="9999 9999 9999 9999"
                          // eslint-disable-next-line react/jsx-props-no-spreading
                          {...register('number')}
                        />
                      </div>

                      <Row className="row-cols-md-2">
                        <Col>
                          <div>
                            <label htmlFor="Validade">Validade</label>
                          </div>
                          <div>
                            <InputMask
                              className="form-control"
                              mask="99/99"
                              // eslint-disable-next-line react/jsx-props-no-spreading
                              {...register('number')}
                            />
                          </div>
                        </Col>
                        <Col>
                          <div>
                            <div>
                              <label htmlFor="Código de segurança">CVV</label>
                            </div>
                            <InputMask
                              className="form-control"
                              mask="999"
                              // eslint-disable-next-line react/jsx-props-no-spreading
                              {...register('number')}
                            />
                          </div>
                        </Col>
                      </Row>
                    </form>
                  )}
                </FormCheck>
              </FormContainer>

              {selectedVehicle && (
                <FormVehicule className="d-fex justify-content-center mb-3">
                  <Container>
                    <TextSub>{selectedVehicle?.manufacturer}</TextSub>

                    <Subtitle className="mb-4">
                      {selectedVehicle?.name}
                    </Subtitle>
                    <Subtitle>¢{selectedVehicle?.cost_in_credits}</Subtitle>
                  </Container>

                  <div className="my-1 px-3 py-3 ">
                    {payment === 'credit' && (
                      <BtnBg type="submit" className="my-2">
                        <Link to="/confirm">Finalizar compra</Link>
                      </BtnBg>
                    )}
                    {payment === 'bank' && (
                      <BtnBg type="submit" className="my-2">
                        <Link to="/bankConfirm">Finalizar compra</Link>
                      </BtnBg>
                    )}
                  </div>
                </FormVehicule>
              )}
            </Col>
          </Row>
        </Container>
      </BgColor>
      <Footer />
    </>
  );
};

export default memo(Checkout);
