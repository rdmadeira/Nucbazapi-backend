// 3 entidades interfaces de auth:

export interface AuthLogin {
  email: string;
  password: string;
}

export interface RoleDto {
  roleName: string;
  roleId: number;
}

export interface AuthSignIn {
  name: string;
  email: string;
  password: string;
  roleId: number;
}

// En general, no se devuelve una entidad, cuando hay datos sensibles, como en un usuario. El DTO se encarga de no devolver todo.
// Las entidades sí son representaciones fieles de la base de datos. Por eso, pusimos auth en una carpeta a parte DTO, para organizar.
export interface AuthDto {
  userId: number;
  name: string;
  email: string;
  token: string;
  expiresIn: number;
  role: RoleDto;
}

export interface UserDto {
  userId: number;
  name: string;
  email: string;
  role: RoleDto;
}
