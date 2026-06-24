import {
  divisions,
  promoProductGroups,
  storeGroupTypes,
  storeGroups,
  vehicleWeeks,
} from '../seed/lookupData';

class LookupRepository {

  getDivisions() {
    return divisions;
  }

  getPromoProductGroups(
    divisionId: string
  ) {
    return promoProductGroups.filter(
      (item) =>
        item.divisionId === divisionId
    );
  }

  getStoreGroupTypes(
    promoProductGroupId: string
  ) {
    return storeGroupTypes.filter(
      (item) =>
        item.promoProductGroupId ===
        promoProductGroupId
    );
  }

  getStoreGroups(
    storeGroupTypeId: string
  ) {
    return storeGroups.filter(
      (item) =>
        item.storeGroupTypeId ===
        storeGroupTypeId
    );
  }

  getVehicleWeeks(
    vehicleType: string
  ) {
    return vehicleWeeks.filter(
      (item) =>
        item.vehicleType === vehicleType
    );
  }
}

export default new LookupRepository();