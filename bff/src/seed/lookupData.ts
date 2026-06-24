export const divisions = [
  { id: 'DIV_1', name: 'Beverages' },
  { id: 'DIV_2', name: 'Frozen Foods' }
];

export const promoProductGroups = [
  {
    id: 'PPG_1',
    divisionId: 'DIV_1',
    name: 'Soft Drinks'
  },
  {
    id: 'PPG_2',
    divisionId: 'DIV_1',
    name: 'Energy Drinks'
  }
];

export const storeGroupTypes = [
  {
    id: 'SGT_1',
    promoProductGroupId: 'PPG_1',
    name: 'Regional'
  }
];

export const storeGroups = [
  {
    id: 'SG_1',
    storeGroupTypeId: 'SGT_1',
    name: 'South Zone'
  }
];

export const vehicleWeeks = [
  {
    id: 'VW_1',
    vehicleType: 'Weekly Insert',
    week: 'Week 01',
    vehicleStart: '2026-01-01',
    vehicleEnd: '2026-01-07'
  },
  {
    id: 'VW_2',
    vehicleType: 'Weekly Insert',
    week: 'Week 02',
    vehicleStart: '2026-01-08',
    vehicleEnd: '2026-01-14'
  }
];