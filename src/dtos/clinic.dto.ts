export interface CreateClinicDTO {
  name: string;
  nit: string;
  address: string;
  responsibleName: string;
  responsiblePhone: string;
}

export interface UpdateClinicDTO {
  name?: string;
  nit?: string;
  address?: string;
  responsibleName?: string;
  responsiblePhone?: string;
}
