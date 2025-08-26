import { BookingStatus, PaymentStatus } from "src/common/enums";

  export function getStatus(status: PaymentStatus): BookingStatus {
    let bookingStatus: BookingStatus;
    switch (status) {
      case PaymentStatus.APPROVED:
        bookingStatus = BookingStatus.APPROVED;
        break;
      case PaymentStatus.REJECT:
        bookingStatus = BookingStatus.REJECTED;
        break;
      default:
        bookingStatus = BookingStatus.PENDING;
    }
    return bookingStatus;
  }

export function formatTimeSlot(slot: {
    startHr: number;
    startMin: number;
    endHr: number;
    endMin: number;
  }): string {
    const toLocal = (hr: number, min: number) => {
      const date = new Date();
      date.setHours(hr, min, 0, 0);

      return date.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    };

    const start = toLocal(slot.startHr, slot.startMin);
    const end = toLocal(slot.endHr, slot.endMin);

    return `${start} - ${end}`;
  }
