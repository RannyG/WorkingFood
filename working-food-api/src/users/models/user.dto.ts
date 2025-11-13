import { Role } from 'generated/prisma';

export interface UserDto {
  id: number;
  name: string;
  role: Role;
  cpf: string | null;
  cnpj: string | null;
}
