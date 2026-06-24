import eventRepository from '../repository/eventRepository';

export function seedEvents() {
  eventRepository.seed({
    id: 'EVENT_1',

    pid: '10001',

    divisionId: 'DIV_1',
    divisionName: 'Beverages',

    promoProductGroupId: 'PPG_1',
    promoProductGroupName: 'Soft Drinks',

    storeGroupTypeId: 'SGT_1',
    storeGroupTypeName: 'Regional',

    storeGroupId: 'SG_1',
    storeGroupName: 'South Zone',

    vehicleType: 'Weekly Insert',

    year: 2026,

    startVehicleWeek: 'Week 01',

    vehicleStart: '2026-01-01',

    vehicleEnd: '2026-01-07',

    eventName: 'Soft Drinks - Week 01',

    createdAt: new Date().toISOString(),

    updatedAt: new Date().toISOString(),
  });
}