import type { ERole } from "~/core/models/enums/role.enum";

declare module "#auth-utils" {
  interface User {
    id: string;
    name: string;
    role: ERole;
  }
}

export {};
