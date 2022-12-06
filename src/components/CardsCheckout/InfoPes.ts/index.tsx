import { Card } from 'react-bootstrap';

const InfoP: React.FC = () => {
  return (
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
                  {...register('name', { required: 'Informe seu nome' })}
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
                <input
                  type="phone"
                  placeholder="Digite o seu número"
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...register('phone')}
                />
              </div>
            </div>
            <div>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="cpf">CPF</label>
              <div>
                {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                <InputMask mask="999-999-999-99" {...register('cpf')} />
              </div>
            </div>

            <button type="submit">enviar</button>
          </form>
        </Card.Body>
      </FormContainer>
    </Card>
  );
};
export default memo(InfoP);
