import lookupRepository
  from '../repository/lookupRepository';

class LookupService {

  getDivisions() {
    return lookupRepository.getDivisions();
  }

  getPromoProductGroups(
    divisionId: string
  ) {
    return lookupRepository.getPromoProductGroups(
      divisionId
    );
  }

  getStoreGroupTypes(
    promoProductGroupId: string
  ) {
    return lookupRepository.getStoreGroupTypes(
      promoProductGroupId
    );
  }

  getStoreGroups(
    storeGroupTypeId: string
  ) {
    return lookupRepository.getStoreGroups(
      storeGroupTypeId
    );
  }

  getVehicleWeeks(
    vehicleType: string
  ) {
    return lookupRepository.getVehicleWeeks(
      vehicleType
    );
  }
}

export default new LookupService();