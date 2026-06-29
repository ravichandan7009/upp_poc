import type { EventState } from '../../features/event/eventSlice';
export interface ValidationErrors {
  divisionId?: string;
  promoProductGroupId?: string;
  storeGroupTypeId?: string;
  storeGroupId?: string;
  startVehicleWeek?: string;
}

export const validateEventForm = (
  formData: EventState
): ValidationErrors => {

  const errors: ValidationErrors = {};

  if (!formData.divisionId) {
    errors.divisionId =
      'Division is required';
  }

  if (!formData.promoProductGroupId) {
    errors.promoProductGroupId =
      'Promo Product Group is required';
  }

  if (!formData.storeGroupTypeId) {
    errors.storeGroupTypeId =
      'Store Group Type is required';
  }

  if (!formData.storeGroupId) {
    errors.storeGroupId =
      'Store Group is required';
  }

  if (!formData.startVehicleWeek) {
    errors.startVehicleWeek =
      'Vehicle Week is required';
  }

  return errors;
};