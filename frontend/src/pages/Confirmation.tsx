import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import type { RootState } from '../app/store';
import { setEvent, resetEvent } from '../features/event/eventSlice';

const Confirmation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const event = useSelector( (state: RootState) => state.event);

  const handleEdit = () => {

    dispatch(
        setEvent({
            editMode: true,
            isExistingEvent: true,
        })
    );

    navigate('/');
};

const handleCreateNew = () => {

    dispatch(resetEvent());

    navigate('/');

};

  return (
    <div className="max-w-4xl mx-auto p-6">

      <h1 className="text-3xl font-bold text-green-600 mb-6">
        Event Saved Successfully
      </h1>

      <div className="grid grid-cols-2 gap-4 border rounded p-6">

        <div className="font-semibold">PID</div>
        <div>{event.pid}</div>

        <div className="font-semibold">
          Division
        </div>
        <div>{event.divisionId}</div>

        <div className="font-semibold">
          Promo Product Group
        </div>
        <div>{event.promoProductGroupId}</div>

        <div className="font-semibold">
          Store Group Type
        </div>
        <div>{event.storeGroupTypeId}</div>

        <div className="font-semibold">
          Store Group
        </div>
        <div>{event.storeGroupId}</div>

        <div className="font-semibold">
          Vehicle Week
        </div>
        <div>{event.startVehicleWeek}</div>

        <div className="font-semibold">
          Vehicle Start
        </div>
        <div>{event.vehicleStart}</div>

        <div className="font-semibold">
          Vehicle End
        </div>
        <div>{event.vehicleEnd}</div>

        <div className="font-semibold">
          Event Name
        </div>
        <div>{event.eventName}</div>

      </div>
<div className="mt-8 flex gap-4">

    <button
        onClick={handleEdit}
        className="
            bg-blue-600
            text-white
            px-6
            py-2
            rounded
        "
    >
        Edit Event Details
    </button>

    <button
        onClick={handleCreateNew}
        className="
            bg-green-600
            text-white
            px-6
            py-2
            rounded
        "
    >
        Create New Event
    </button>

</div>

    </div>
  );
};

export default Confirmation;