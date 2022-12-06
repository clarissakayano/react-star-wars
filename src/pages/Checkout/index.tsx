import { memo, useCallback, useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { AiOutlineDoubleLeft } from 'react-icons/ai';
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
      <Header />
      <BgColor>
        <Container>
          <Link style={{ textDecoration: 'none' }} to="/">
            <Title>Checkout</Title>
          </Link>
          <Row>
            <Col>
              <Card className="w-100">
                <FormContainer>
                  <Card.Body>
                    <Subtitle>Informações Pessoais</Subtitle>
                    <form onSubmit={handleSubmit(handleFormSubmit)}>
                      <div>
                        <span>Nome:</span>
                        <div>
                          <input
                            type="text"
                            placeholder="Digite o seu nome"
                            // eslint-disable-next-line react/jsx-props-no-spreading
                            {...register('name', {
                              required: 'Informe seu nome',
                              minLength: {
                                value: 3,
                                message:
                                  'O nome precisa ter no mínimo 3 letras',
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
                            id="cpf"
                            mask="999-999-999-99"
                            {...register('cpf')}
                          />
                        </div>
                      </div>
                    </form>
                  </Card.Body>
                </FormContainer>
              </Card>
            </Col>
            <Col>
              <FormContainer>
                <FormCheck className=" mb-5">
                  <Subtitle>Endereço</Subtitle>
                  <form>
                    <div>
                      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                      <label htmlFor="cep">CEP</label>

                      <div>
                        <InputMask
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
                        type="text"
                        placeholder=""
                        {...register('logradouro')}
                      />
                      <div>
                        <label htmlFor="Número">Número</label>
                      </div>
                      <input
                        type="text"
                        placeholder="número"
                        {...register('número')}
                      />
                      <div>
                        <label htmlFor="Complemento">Complemento</label>
                        <div>
                          <input
                            type="text"
                            placeholder="Complemento"
                            {...register('complemento')}
                          />
                        </div>
                      </div>
                      <div>
                        <div>
                          <label htmlFor="Bairro">Bairro</label>
                        </div>
                        <input
                          type="text"
                          placeholder="bairro"
                          {...register('bairro')}
                        />
                      </div>
                      <div>
                        <label htmlFor="Cidade">Cidade</label>
                      </div>
                      <input
                        type="text"
                        placeholder="cidade"
                        {...register('cidade')}
                      />

                      <div>
                        <div>
                          <label htmlFor="Estado">Estado</label>
                        </div>
                        <input
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
              <FormContainer className="mb-5">
                <FormCheck>
                  <Subtitle className="mb-3">Forma de Pagamento</Subtitle>

                  <div className="d-flex justify-content-evenly mb-3">
                    <button className="yellowbutton">Cartão de Crédito</button>
                    <button className="whitebutton">Boleto Bancário</button>
                  </div>

                  <form>
                    <div>
                      <label htmlFor="Nome do Titular">
                        Nome do titular do Cartão
                      </label>
                    </div>
                    <input
                      type="text"
                      placeholder="Titular"
                      {...register('Titular')}
                    />
                    <div>
                      <label htmlFor="Número do Cartão">Número do Cartão</label>
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder=""
                        {...register('número do cartão')}
                      />
                    </div>
                    <div>
                      <div>
                        <label htmlFor="Validade">Validade</label>
                      </div>
                      <div>
                        <div>
                          <input
                            type="text"
                            placeholder="validade"
                            {...register('validade')}
                          />
                        </div>
                        <div>
                          <div>
                            <label htmlFor="Código de segurança">
                              Código de Segurança
                            </label>
                          </div>
                          <input
                            className="form"
                            type="text"
                            placeholder=""
                            {...register('bairro')}
                          />
                        </div>
                      </div>
                    </div>

                    <button type="submit">enviar</button>
                  </form>
                </FormCheck>
              </FormContainer>

              <FormVehicule className="d-fex justify-content-center mb-3">
                <div>
                  <TextSub className="py-3">
                    {selectedVehicle.manufacturer}
                  </TextSub>
                  <Subtitle className="mb-3">{selectedVehicle.name}</Subtitle>
                  <Subtitle>¢{selectedVehicle.cost_in_credits}</Subtitle>
                </div>
                <div className=" d-flex justify-content-center py-3">
                  <button
                    className="paybutton"
                    onClick={() => setSelectedVehicle(vehicle)}
                  >
                    Finalizar Compra
                  </button>
                </div>
              </FormVehicule>
            </Col>
          </Row>
        </Container>
      </BgColor>
      <Footer />
    </>
  );
};

export default memo(Checkout);
