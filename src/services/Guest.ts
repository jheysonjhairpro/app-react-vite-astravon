import { Guest } from "../types/Guest";
import { Invitado } from "../types/Participant";
import { ApiResponse } from "../types/Response/Response";

//---------------------------------------------------------------- GET ALL INVITED
export const getAllGuest = async (): Promise<Invitado[]> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/Event/GetAllGuest`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error al obtener los invitados");
    }

    const data: ApiResponse<Invitado[]> = await response.json();
    if (!data.success) {
      throw new Error(data.message);
    }

    return data.data;
  } catch (error) {
    throw error;
  }
};


//---------------------------------------------------------------- ADD INVITED TO EVENT
export const addInvitedToEvent = async (
  participant: Invitado
): Promise<ApiResponse<null>> => {
  try {
    const payload = {
      firstName: participant.firstName,
      lastName: participant.lastName,
      mail: participant.mail,
      dni: participant.dni,
    };

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/Event/CreateGuest`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const data: ApiResponse<null> = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};


//---------------------------------------------------------------- UPDATE GUEST
export const actualizarGuest = async (
  Guest: Partial<Guest>
): Promise<ApiResponse<Guest>> => {
  try {
    const url = `${import.meta.env.VITE_API_URL}/Event/UpdateGuest/`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Guest),
    });
    if (!response.ok) {
      throw new Error("Error al actualizar el invitado");
    }
    const responseData: ApiResponse<Guest> = await response.json();
    return responseData;
  } catch (error) {
    throw new Error("Error al actualizar el invitado: " + error);
  }
};

//---------------------------------------------------------------- DELETE GUEST
export const eliminarGuest = async (
  guestId: number
): Promise<ApiResponse<null>> => {
  try {
    const url = `${import.meta.env.VITE_API_URL}/Event/DeleteGuest/${guestId}`;
    const response = await fetch(url, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Error al eliminar el invitado");
    }
    const responseData: ApiResponse<null> = await response.json();
    return responseData;
  } catch (error) {
    throw new Error("Error al eliminar el invitado: " + error);
  }
};