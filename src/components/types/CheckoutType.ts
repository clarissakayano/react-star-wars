export type FormType = {
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

  card_name?: string;
  cartão: string;
  validade: string;
  código: string;
  card_number: string;
};

export type NormalizedFormType = {
  name: string;
  email: string;
  phone: number;
  cpf: number;
  cnpj: number;
  cep: number;
  logradouro: string;
  number: number;
  complement: string;
  bairro: string;
  localidade: string;
  uf: string;
  card_name?: string;
  card_number?: number;
  card_validity?: number;
  card_password?: number;
};
