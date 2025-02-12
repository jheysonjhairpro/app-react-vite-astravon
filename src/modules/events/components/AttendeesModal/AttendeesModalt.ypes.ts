import { Participant } from "../../../../types/Participant";

export interface AttendeesModalProps {
  show: boolean;
  onClose: () => void;
  attendees: Participant[];
}