import { CNPJ_SIZE, CPF_SIZE } from '../constants/cpf-cnpj-constants';

export function clearCpfCnpj(cpfCnpj: string) {
  return cpfCnpj.replace(/\\D/g, '');
}

export function isValidCpfOrCnpj(cpfCnpj: string) {
  const clearInput = cpfCnpj.replace(/\\D/g, '');

  return clearInput.length === CPF_SIZE || clearInput.length === CNPJ_SIZE;
}

export function isCpf(cpfCnpj: string) {
  return clearCpfCnpj(cpfCnpj).length === CPF_SIZE;
}
