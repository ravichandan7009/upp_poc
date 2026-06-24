export interface Event {
  id: string;

  pid: string;

  divisionId: string;
  divisionName: string;

  promoProductGroupId: string;
  promoProductGroupName: string;

  storeGroupTypeId: string;
  storeGroupTypeName: string;

  storeGroupId: string;
  storeGroupName: string;

  vehicleType: string;

  year: number;

  startVehicleWeek: string;

  vehicleStart: string;
  vehicleEnd: string;

  eventName: string;

  createdAt: string;
  updatedAt: string;
}