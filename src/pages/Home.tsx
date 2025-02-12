import { FaLock, FaUnlock, FaUserLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Event } from "../types/Events";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useEffect, useMemo, useState } from "react";
import {
  DeleteEvent,
  getAllEvents,
  updateEvent,
} from "../services/EventService";
import { Loading } from "../components/ui/Loading";
import { formatDate } from "../utils/common";
import Swal from "sweetalert2";
export function HomePage() {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  //---------------------------------------------------------------- GET ALL EVENTS
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventList = await getAllEvents();
        setEvents(eventList);
      } catch (err: any) {
        throw new Error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  //---------------------------------------------------------------- DELETE EVENT
  const handleDeleteEvent = async (id: number) => {
    try {
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "No podrás revertir esta acción.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
        reverseButtons: true,
      });

      if (result.isConfirmed) {
        const response = await DeleteEvent(Number(id));

        if (response.success) {
          Swal.fire({
            icon: "success",
            title: "¡Evento eliminado!",
            text: response.message,
            confirmButtonText: "Aceptar",
          });
          location.reload();
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: response.message,
            confirmButtonText: "Aceptar",
          });
        }
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ups, algo salió mal",
        confirmButtonText: "Aceptar",
      });
    }
  };

  const [showModal, setShowModal] = useState(false);
  const [eventToEdit, setEventToEdit] = useState<Event | null>(null);

  const handleEditClick = (event: Event) => {
    setEventToEdit(event);
    setShowModal(true);
  };

  //---------------------------------------------------------------- UPDATE EVENT
  const handleUpdateEvent = async (updatedEvent: Event) => {
    try {
      const response = await updateEvent(updatedEvent);
      if (response.success) {
        Swal.fire({
          icon: "success",
          title: response.message,
          text: response.message,
          confirmButtonText: "Aceptar",
        });
        setShowModal(false);
        const eventList = await getAllEvents();
        setEvents(eventList);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.message,
          confirmButtonText: "Aceptar",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Opps, Algo salio mal",
        confirmButtonText: "Aceptar",
      });
    }
  };


  return (
    <div className="page-wrapper">
      <div className="page-content">
        <h6 className="mb-0 text-uppercase">Todos los foros</h6>
        <hr />

        </div>
    </div>
  );
}
