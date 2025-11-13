export interface AddressDto {
  cep: string;
  streetName: string;
  complement: string | null;
  neighborhood: string | null;
  state: string;
}
