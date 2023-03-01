/* eslint-disable jsx-a11y/label-has-associated-control */
import { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { Col, Container, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { BiArrowBack } from 'react-icons/bi';
import InputMask from 'react-input-mask';
import { Link, useNavigate, useParams } from 'react-router-dom';

import r2d2 from 'assets/r2d2.gif';

import { useVehicles } from 'context/VehiclesContext';

import Footer from 'components/Footer';
import Header from 'components/Header';
import { FormType } from 'components/types/FormType';

import { normalizeFormData } from 'helpers';

import cepApi from 'services/CepApi';

import {
  BgColor,
  BtnBg,
  ButtonBank,
  ButtonCredit,
  Error,
  FormContainer,
  FormVehicule,
  Subtitle,
  TextInvalid,
  TextSub,
  Title,
} from './styles';

const Checkout: React.FC = () => {
  const [lastCep, setLastCep] = useState('');
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);
  const [isInvalidCep, setIsInvalidCep] = useState(false);
  const { selectedVehicle, fetchVehicles } = useVehicles();
  const [payment, setPayment] = useState('');
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    watch,
    setValue,
  } = useForm<FormType>();
  console.log('ERRORS', errors);

  const { id } = useParams();

  const handleFormSubmit = useCallback(
    (data: FormType) => {
      navigate(payment === 'credit' ? `/confirm/` : `/bankConfirm/`);
      normalizeFormData(data);
      console.log('SUBMITED', data);
    },
    [navigate, payment],
  );

  const hasErrors = useMemo(() => Object.keys(errors).length > 0, [errors]);

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
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Row className="row-cols-1 row-cols-md-2 row-cols-lg-3 justify-content-md-end">
              <Col>
                <FormContainer className="mb-3">
                  <Subtitle>Informações Pessoais</Subtitle>

                  <div>
                    <span>Nome:</span>
                    <div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Digite o seu nome"
                        // eslint-disable-next-line react/jsx-props-no-spreading
                        {...register('name')}
                        required
                      />

                      {errors.name && <Error>{errors.name.message}</Error>}
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
                        required
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
                        required
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
                        required
                      />
                    </div>
                  </div>
                </FormContainer>
              </Col>
              <Col>
                <FormContainer className=" mb-3">
                  <Subtitle>Endereço</Subtitle>

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
                          {...register('number')}
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
                </FormContainer>
              </Col>
              <Col>
                <FormContainer className="mb-2">
                  <Subtitle className="mb-3">Forma de Pagamento</Subtitle>
                  <Row className="row-cols-1 row-cols-md-1 row-cols-lg-1 row-cols-xl-2">
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
                    <div>
                      <div>
                        <label htmlFor="Nome do Titular">
                          Nome do titular do Cartão
                        </label>
                      </div>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Titular"
                        {...register('card_name')}
                        required
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
                          {...register('card_number')}
                          required
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
                              {...register('card_validity')}
                              required
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
                              {...register('card_code')}
                              required
                            />
                          </div>
                        </Col>
                      </Row>
                    </div>
                  )}
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
                        <BtnBg
                          type="submit"
                          className="my-2"
                          disabled={hasErrors || !isDirty}
                        >
                          Finalizar compra
                        </BtnBg>
                      )}
                      {payment === 'bank' && (
                        <BtnBg type="submit" className="my-2">
                          Finalizar compra
                        </BtnBg>
                      )}
                    </div>
                  </FormVehicule>
                )}
              </Col>
            </Row>
          </form>
        </Container>
      </BgColor>
      <Footer />
    </>
  );
};

export default memo(Checkout);
