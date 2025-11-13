import type { ERole } from "../enums/role.enum";

export interface JwtPayload {
  sub: number;
  username: string;
  role: ERole;
}
