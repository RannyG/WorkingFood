import { Role } from 'generated/prisma';

export interface UserWithPasswordDto {
  id: number;
  name: string;
  role: Role;
  password: string;
}
