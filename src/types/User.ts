export interface User {
  idUser?: number ;
  name: string;
  lastName: string;
  mail: string;
  nameUser: string;
  phone: string;
  gender: boolean;
  dni: string;
  password: string;
}
export interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}
