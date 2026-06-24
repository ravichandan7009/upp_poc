import crypto from 'crypto';

import eventRepository
  from '../repository/eventRepository';

import lookupRepository
  from '../repository/lookupRepository';

import { Event }
  from '../types/Event';

interface CreateEventInput {
  pid: string;

  divisionId: string;

  promoProductGroupId: string;

  storeGroupTypeId: string;

  storeGroupId: string;

  vehicleType: string;

  year: number;

  startVehicleWeek: string;
}

interface UpdateEventInput
  extends CreateEventInput {
  id: string;
}

class EventService {

  getEventByPid(
    pid: string
  ) {
    return eventRepository.findByPid(
      pid
    );
  }

  createEvent(
    input: CreateEventInput
  ): Event {

    const division =
      lookupRepository
        .getDivisions()
        .find(
          (item) =>
            item.id ===
            input.divisionId
        );

    if (!division) {
      throw new Error(
        'Division not found'
      );
    }

    const promoProductGroup =
      lookupRepository
        .getPromoProductGroups(
          input.divisionId
        )
        .find(
          (item) =>
            item.id ===
            input.promoProductGroupId
        );

    if (!promoProductGroup) {
      throw new Error(
        'Promo Product Group not found'
      );
    }

    const storeGroupType =
      lookupRepository
        .getStoreGroupTypes(
          input.promoProductGroupId
        )
        .find(
          (item) =>
            item.id ===
            input.storeGroupTypeId
        );

    if (!storeGroupType) {
      throw new Error(
        'Store Group Type not found'
      );
    }

    const storeGroup =
      lookupRepository
        .getStoreGroups(
          input.storeGroupTypeId
        )
        .find(
          (item) =>
            item.id ===
            input.storeGroupId
        );

    if (!storeGroup) {
      throw new Error(
        'Store Group not found'
      );
    }

    const vehicleWeek =
      lookupRepository
        .getVehicleWeeks(
          input.vehicleType
        )
        .find(
          (item) =>
            item.week ===
            input.startVehicleWeek
        );

    if (!vehicleWeek) {
      throw new Error(
        'Vehicle Week not found'
      );
    }

    const now =
      new Date().toISOString();

    const event: Event = {

      id: crypto.randomUUID(),

      pid: input.pid,

      divisionId:
        division.id,

      divisionName:
        division.name,

      promoProductGroupId:
        promoProductGroup.id,

      promoProductGroupName:
        promoProductGroup.name,

      storeGroupTypeId:
        storeGroupType.id,

      storeGroupTypeName:
        storeGroupType.name,

      storeGroupId:
        storeGroup.id,

      storeGroupName:
        storeGroup.name,

      vehicleType:
        input.vehicleType,

      year:
        input.year,

      startVehicleWeek:
        vehicleWeek.week,

      vehicleStart:
        vehicleWeek.vehicleStart,

      vehicleEnd:
        vehicleWeek.vehicleEnd,

      eventName:
        `${promoProductGroup.name} - ${vehicleWeek.week}`,

      createdAt: now,

      updatedAt: now,
    };

    return eventRepository.create(
      event
    );
  }

  updateEvent(
    input: UpdateEventInput
  ): Event {

    const existing =
      eventRepository.findById(
        input.id
      );

    if (!existing) {
      throw new Error(
        'Event not found'
      );
    }

    const division =
      lookupRepository
        .getDivisions()
        .find(
          (item) =>
            item.id ===
            input.divisionId
        );

    const promoProductGroup =
      lookupRepository
        .getPromoProductGroups(
          input.divisionId
        )
        .find(
          (item) =>
            item.id ===
            input.promoProductGroupId
        );

    const storeGroupType =
      lookupRepository
        .getStoreGroupTypes(
          input.promoProductGroupId
        )
        .find(
          (item) =>
            item.id ===
            input.storeGroupTypeId
        );

    const storeGroup =
      lookupRepository
        .getStoreGroups(
          input.storeGroupTypeId
        )
        .find(
          (item) =>
            item.id ===
            input.storeGroupId
        );

    const vehicleWeek =
      lookupRepository
        .getVehicleWeeks(
          input.vehicleType
        )
        .find(
          (item) =>
            item.week ===
            input.startVehicleWeek
        );

    if (
      !division ||
      !promoProductGroup ||
      !storeGroupType ||
      !storeGroup ||
      !vehicleWeek
    ) {
      throw new Error(
        'Lookup data invalid'
      );
    }

    const updatedEvent: Event = {

      ...existing,

      divisionId:
        division.id,

      divisionName:
        division.name,

      promoProductGroupId:
        promoProductGroup.id,

      promoProductGroupName:
        promoProductGroup.name,

      storeGroupTypeId:
        storeGroupType.id,

      storeGroupTypeName:
        storeGroupType.name,

      storeGroupId:
        storeGroup.id,

      storeGroupName:
        storeGroup.name,

      vehicleType:
        input.vehicleType,

      year:
        input.year,

      startVehicleWeek:
        vehicleWeek.week,

      vehicleStart:
        vehicleWeek.vehicleStart,

      vehicleEnd:
        vehicleWeek.vehicleEnd,

      eventName:
        `${promoProductGroup.name} - ${vehicleWeek.week}`,

      updatedAt:
        new Date().toISOString(),
    };

    return eventRepository.update(
      updatedEvent
    );
  }
}

export default new EventService();