import {
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';

export interface EventState {
  id?: string;

  pid: string;

  divisionId: string;

  promoProductGroupId: string;

  storeGroupTypeId: string;

  storeGroupId: string;

  vehicleType: string;

  year: number;

  startVehicleWeek: string;

  vehicleStart: string;

  vehicleEnd: string;

  eventName: string;

  isExistingEvent: boolean;

  editMode: boolean;
}

const initialState: EventState = {
  pid: '',

  divisionId: '',

  promoProductGroupId: '',

  storeGroupTypeId: '',

  storeGroupId: '',

  vehicleType: 'Weekly Insert',

  year: 2026,

  startVehicleWeek: '',

  vehicleStart: '',

  vehicleEnd: '',

  eventName: '',

  isExistingEvent: false,

  editMode: false,
};

const eventSlice = createSlice({
  name: 'event',

  initialState,

  reducers: {
    setEvent(
      state,
      action: PayloadAction<
        Partial<EventState>
      >
    ) {
      return {
        ...state,
        ...action.payload,
      };
    },

    resetEvent() {
      return initialState;
    },
  },
});

export const {
  setEvent,
  resetEvent,
} = eventSlice.actions;

export default eventSlice.reducer;