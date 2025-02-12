import { ApiResponse } from "../types/Response/Response";
import { User } from "../types/User";

//---------------------------------------------------------------- LOGIN User
export const loginUser = async (
  username: string,
  password: string
): Promise<ApiResponse<User>> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/User/Login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      }
    );

    if (!response.ok) {
      throw new Error("Error al iniciar sesión");
    }

    const dataResponse: ApiResponse<User> = await response.json();
    return dataResponse;
  } catch (error: any) {
    throw new Error("Error al iniciar sesión: " + error.message);
  }
};


//---------------------------------------------------------------- GET ALL User
export const getAllUser = async (): Promise<User[]> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/User/GetAll`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error al obtener los usuarios");
    }

    const data: ApiResponse<User[]> = await response.json();
    if (!data.success) {
      throw new Error(data.message);
    }

    return data.data;
  } catch (error) {
    throw error;
  }
};

//---------------------------------------------------------------- POST USER
export const createUser = async (
  data: {
    name: string;
    lastName: string;
    mail: string;
    nameUser: string;
    phone: string;
    gender: boolean;
    dni: string;
    password: string;
  }
): Promise<ApiResponse<User>> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/User/AddUser`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error("Error al crear el usuario");
    }

    const dataResponse: ApiResponse<User> = await response.json();
    return dataResponse;
  } catch (error: any) {
    throw new Error(error);
  }
};

//---------------------------------------------------------------- UPDATE USER
export const actualizarUser = async (
  User: Partial<User>
): Promise<ApiResponse<User>> => {
  try {
    const url = `${import.meta.env.VITE_API_URL}/User/UpdateUser`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(User),
    });
    if (!response.ok) {
      throw new Error("Error al actualizar el usuario");
    }
    const responseData: ApiResponse<User> = await response.json();
    return responseData;
  } catch (error) {
    throw new Error("Error al actualizar el usuario: " + error);
  }
};

//---------------------------------------------------------------- DELETE USER
export const eliminarUser = async (
  userId: number
): Promise<ApiResponse<null>> => {
  try {
    const url = `${import.meta.env.VITE_API_URL}/User/DeleteUser/${userId}`;
    const response = await fetch(url, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Error al eliminar el usuario");
    }
    const responseData: ApiResponse<null> = await response.json();
    return responseData;
  } catch (error) {
    throw new Error("Error al eliminar el usuario: " + error);
  }
};