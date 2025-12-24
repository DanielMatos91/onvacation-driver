export type TripStatus = 'scheduled' | 'waiting' | 'in_progress' | 'completed' | 'cancelled';

export type Trip = {
  id: string;
  passenger: string;
  contact: string;
  pickup: string;
  dropoff: string;
  pickupTime: string;
  vehicle: string;
  distanceKm: number;
  value: number;
  status: TripStatus;
  notes?: string;
  flight?: string;
};

export const trips: Trip[] = [
  {
    id: 'OV-4821',
    passenger: 'Ana Souza',
    contact: '+55 11 98877-6622',
    pickup: 'Hotel Solare',
    dropoff: 'Aeroporto de Recife',
    pickupTime: '14:30',
    vehicle: 'Corolla Cross • QWE2D45',
    distanceKm: 12.3,
    value: 86.4,
    status: 'scheduled',
    notes: 'Passageira com bagagem volumosa. Avisar ao chegar.',
    flight: 'AZ 321',
  },
  {
    id: 'OV-5719',
    passenger: 'Carlos Almeida',
    contact: '+55 21 98765-1122',
    pickup: 'Porto de Galinhas',
    dropoff: 'Resort OnVacation',
    pickupTime: '16:10',
    vehicle: 'Corolla Cross • QWE2D45',
    distanceKm: 24.9,
    value: 126.8,
    status: 'waiting',
    notes: 'Família com criança pequena, levar cadeirinha.',
  },
  {
    id: 'OV-6030',
    passenger: 'Mariana Costa',
    contact: '+55 31 99900-3456',
    pickup: 'Aeroporto de Recife',
    dropoff: 'Resort OnVacation',
    pickupTime: '17:20',
    vehicle: 'Corolla Cross • QWE2D45',
    distanceKm: 49.2,
    value: 182.5,
    status: 'in_progress',
    notes: 'Cliente VIP, prefere comunicação por mensagem.',
    flight: 'G3 1456',
  },
  {
    id: 'OV-6124',
    passenger: 'Pedro Nogueira',
    contact: '+55 71 99880-2211',
    pickup: 'Hotel Atlântico',
    dropoff: 'Aeroporto de Recife',
    pickupTime: '18:40',
    vehicle: 'Corolla Cross • QWE2D45',
    distanceKm: 10.5,
    value: 72.3,
    status: 'scheduled',
  },
  {
    id: 'OV-5902',
    passenger: 'Juliana Ramos',
    contact: '+55 11 99988-2200',
    pickup: 'Resort OnVacation',
    dropoff: 'Aeroporto de Recife',
    pickupTime: '12:00',
    vehicle: 'Corolla Cross • QWE2D45',
    distanceKm: 53.4,
    value: 194.7,
    status: 'completed',
    notes: 'Corrida encerrada às 13:05.',
  },
];

export const statusLabels: Record<TripStatus, string> = {
  scheduled: 'Agendado',
  waiting: 'Aguardando',
  in_progress: 'Em curso',
  completed: 'Finalizado',
  cancelled: 'Cancelado',
};

export const statusColors: Record<TripStatus, string> = {
  scheduled: '#5c6bc0',
  waiting: '#f9a825',
  in_progress: '#00897b',
  completed: '#43a047',
  cancelled: '#e53935',
};

export function getTripById(id?: string | string[]) {
  if (!id) return undefined;
  const parsed = Array.isArray(id) ? id[0] : id;
  return trips.find((trip) => trip.id === parsed);
}
