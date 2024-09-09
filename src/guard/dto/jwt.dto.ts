import { Role } from '@prisma/client';

export class JwtDto {
  role: Role;
  email: string;
}
