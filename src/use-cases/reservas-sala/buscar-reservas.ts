import { ReservaSala } from "@prisma/client";
import { ReservasSalaRepository } from "@/repositories/reservas-sala-repository";

interface BuscarReservasUseCaseRequest {
  salaId?: string;
  horarioId?: string;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
}

interface BuscarReservasUseCaseResponse {
  reservas: ReservaSala[];
  total: number;
}

export class BuscarReservasUseCase {
  constructor(private reservasRepository: ReservasSalaRepository) {}

  async execute({
    salaId,
    horarioId,
    dateFrom,
    dateTo,
    page = 1,
  }: BuscarReservasUseCaseRequest): Promise<BuscarReservasUseCaseResponse> {
    
    let parsedDateFrom: Date | undefined;
    if (dateFrom) {
      parsedDateFrom = new Date(`${dateFrom}T00:00:00.000Z`);
    }

    let parsedDateTo: Date | undefined;
    if (dateTo) {
      parsedDateTo = new Date(`${dateTo}T00:00:00.000Z`);
    }

    const requestParams: any = { page };
    if (salaId !== undefined) requestParams.salaId = salaId;
    if (horarioId !== undefined) requestParams.horarioId = horarioId;
    if (parsedDateFrom !== undefined) requestParams.dateFrom = parsedDateFrom;
    if (parsedDateTo !== undefined) requestParams.dateTo = parsedDateTo;

    const result = await this.reservasRepository.findManyWithFilters(requestParams);

    return result;
  }
}
