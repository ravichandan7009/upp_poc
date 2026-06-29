import eventService
  from '../services/eventService';

import lookupService
  from '../services/lookupService';

export const resolvers = {

  Query: {

    getEventByPid(
      _: unknown,
      args: { pid: string }
    ) {
      return eventService.getEventByPid(
        args.pid
      );
    },

    getDivisions() {
      return lookupService.getDivisions();
    },

    getPromoProductGroups(
      _: unknown,
      args: {
        divisionId: string;
      }
    ) {
      return lookupService
        .getPromoProductGroups(
          args.divisionId
        );
    },

    getStoreGroupTypes(
      _: unknown,
      args: {
        promoProductGroupId: string;
      }
    ) {
      return lookupService
        .getStoreGroupTypes(
          args.promoProductGroupId
        );
    },

    getStoreGroups(
      _: unknown,
      args: {
        storeGroupTypeId: string;
      }
    ) {
      return lookupService
        .getStoreGroups(
          args.storeGroupTypeId
        );
    },

    getVehicleWeeks(
      _: unknown,
      args: {
        vehicleType: string;
      }
    ) {
      return lookupService
        .getVehicleWeeks(
          args.vehicleType
        );
    },
  },

  Mutation: {

    createEvent(
      _: unknown,
      args: {
        input: any;
      }
    ) {
      return eventService.createEvent(
        args.input
      );
    },

  updateEvent: (
  _: any,
  { input }: any
) => {

  return eventService.updateEvent(
    input
  );

},
  },
};