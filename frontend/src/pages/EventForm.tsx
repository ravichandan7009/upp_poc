import {
    useEffect,
    useState,
} from 'react';

import {
    useLazyQuery,
    useQuery,
} from '@apollo/client/react';

import {
    GET_EVENT_BY_PID,
    GET_DIVISIONS,
    GET_PROMO_GROUPS,
    GET_VEHICLE_WEEKS,
    GET_STORE_GROUPS,
    GET_STORE_GROUP_TYPES,
} from '../graphql/queries';

import {
  useMutation,
} from '@apollo/client/react';

import {
  CREATE_EVENT,
} from '../graphql/mutations';

const EventForm = () => {

    const [pid, setPid] = useState('');
    const [selectedDivision, setSelectedDivision] = useState('');
    const [selectedPromoGroup, setSelectedPromoGroup] = useState('');
    const [selectedStoreGroupType, setSelectedStoreGroupType] = useState('');
    const [selectedStoreGroup, setSelectedStoreGroup] = useState('');
    const [selectedVehicleWeek, setSelectedVehicleWeek] = useState('');
    const [vehicleStart, setVehicleStart] = useState('');
    const [vehicleEnd, setVehicleEnd] = useState('')
    const [eventName, setEventName] = useState('');

    const [
  createEvent,
] = useMutation(
  CREATE_EVENT
);

    useEffect(() => {

  loadVehicleWeeks({
    variables: {
      vehicleType:
        'Weekly Insert',
    },
  });

}, []);

    const {
        data: divisions,
        loading: divisionsLoading,
        error: divisionsError,
    } = useQuery(
        GET_DIVISIONS
    );

    const [
        loadPromoGroups,
        {
            data: promoGroupsData,
        },
    ] = useLazyQuery(
        GET_PROMO_GROUPS
    );

    const [
        fetchEvent,
        { data },
    ] = useLazyQuery(
        GET_EVENT_BY_PID
    );

    const [
  loadStoreGroupTypes,
  {
    data: storeGroupTypesData,
  },
] = useLazyQuery(
  GET_STORE_GROUP_TYPES
);

const [
  loadStoreGroups,
  {
    data: storeGroupsData,
  },
] = useLazyQuery(
  GET_STORE_GROUPS
);

const [
  loadVehicleWeeks,
  {
    data: vehicleWeeksData,
  },
] = useLazyQuery(
  GET_VEHICLE_WEEKS
);

    const handleFetch =
        async () => {

            await fetchEvent({
                variables: {
                    pid,
                },
            });

        };


        const handleSubmit =
  async () => {

    try {
        if(
 !pid ||
 !selectedDivision ||
 !selectedPromoGroup ||
 !selectedStoreGroupType ||
 !selectedStoreGroup ||
 !selectedVehicleWeek
){
 alert(
  'All fields are required'
 );
 return;
}

      const response =
        await createEvent({
          variables: {
            input: {

              pid,

              divisionId:
                selectedDivision,

              promoProductGroupId:
                selectedPromoGroup,

              storeGroupTypeId:
                selectedStoreGroupType,

              storeGroupId:
                selectedStoreGroup,

              vehicleType:
                'Weekly Insert',

              year: 2026,

              startVehicleWeek:
                selectedVehicleWeek,
            },
          },
        });

      console.log(
        response.data
      );

      alert(
        'Event Created Successfully'
      );

    } catch(error) {

      console.error(error);

      alert(
        'Failed to Create Event'
      );
    }
};


    return (
        <div className="p-6">

            <h1 className="text-2xl font-bold mb-6">
                Event Details
            </h1>

            <input
                value={pid}
                onChange={(e) =>
                    setPid(
                        e.target.value
                    )
                }
                placeholder="Enter PID"
                className="
          border
          p-2
          mr-2
        "
            />

            <button
                onClick={handleFetch}
                className="
          bg-blue-600
          text-white
          px-4
          py-2
        "
            >
                Fetch Event Details
            </button>

            {data?.getEventByPid && (
                <pre className="mt-6">
                    {JSON.stringify(
                        data.getEventByPid,
                        null,
                        2
                    )}
                </pre>
            )}
            <h2 className="mt-8 mb-2">
                Division
            </h2>

            <select
                className="border p-2 w-64"
                value={selectedDivision}
                onChange={(e) => {

                    const divisionId =
                        e.target.value;

                    setSelectedDivision(
                        divisionId
                    );

                    setSelectedPromoGroup('');

                    loadPromoGroups({
                        variables: {
                            divisionId,
                        },
                    });
                }}
            >
                <option value="">
                    Select Division
                </option>

                {
                    divisions?.getDivisions?.map(
                        (division: any) => (
                            <option
                                key={division.id}
                                value={division.id}
                            >
                                {division.name}
                            </option>
                        )
                    )
                }
            </select>

            <h2 className="mt-6 mb-2">
  Promo Product Group
</h2>

<select
  className="border p-2 w-64"
  value={selectedPromoGroup}
  onChange={(e) => {

  const promoGroupId =
    e.target.value;

  setSelectedPromoGroup(
    promoGroupId
  );

  setSelectedStoreGroupType('');

  setSelectedStoreGroup('');

  loadStoreGroupTypes({
    variables: {
      promoProductGroupId:
        promoGroupId,
    },
  });
}}
>
  <option value="">
    Select Promo Product Group
  </option>

  {
    promoGroupsData
      ?.getPromoProductGroups
      ?.map(
        (group: any) => (
          <option
            key={group.id}
            value={group.id}
          >
            {group.name}
          </option>
        )
      )
  }

</select>

<pre>
{
 JSON.stringify(
  promoGroupsData,
  null,
  2
 )
}
</pre>

<h2 className="mt-6 mb-2">
  Store Group Type
</h2>

<select
  className="border p-2 w-64"
  value={selectedStoreGroupType}
  onChange={(e) => {

    const value =
      e.target.value;

    setSelectedStoreGroupType(
      value
    );

    setSelectedStoreGroup('');

    loadStoreGroups({
      variables: {
        storeGroupTypeId: value,
      },
    });
  }}
>
  <option value="">
    Select Store Group Type
  </option>

  {
    storeGroupTypesData
      ?.getStoreGroupTypes
      ?.map(
        (item:any) => (
          <option
            key={item.id}
            value={item.id}
          >
            {item.name}
          </option>
        )
      )
  }
</select>

<h2 className="mt-6 mb-2">
  Store Group
</h2>

<select
  className="border p-2 w-64"
  value={selectedStoreGroup}
  onChange={(e) =>
    setSelectedStoreGroup(
      e.target.value
    )
  }
>
  <option value="">
    Select Store Group
  </option>

  {
    storeGroupsData
      ?.getStoreGroups
      ?.map(
        (item:any) => (
          <option
            key={item.id}
            value={item.id}
          >
            {item.name}
          </option>
        )
      )
  }
</select>
<h2 className="mt-6 mb-2">
  Start Vehicle Week
</h2>

<select
  className="border p-2 w-64"
  value={selectedVehicleWeek}
  onChange={(e) => {

    const week =
      e.target.value;

    setSelectedVehicleWeek(
      week
    );

    const selectedWeek =
      vehicleWeeksData
        ?.getVehicleWeeks
        ?.find(
          (item:any) =>
            item.week === week
        );

    setVehicleStart(
      selectedWeek
        ?.vehicleStart || ''
    );

    setVehicleEnd(
      selectedWeek
        ?.vehicleEnd || ''
    );
    const selectedPromoGroupName =
  promoGroupsData
    ?.getPromoProductGroups
    ?.find(
      (item:any) =>
        item.id === selectedPromoGroup
    )
    ?.name || '';

setEventName(
  `${selectedPromoGroupName} - ${week}`
);
  }}
>
  <option value="">
    Select Vehicle Week
  </option>

  {
    vehicleWeeksData
      ?.getVehicleWeeks
      ?.map(
        (item:any) => (
          <option
            key={item.id}
            value={item.week}
          >
            {item.week}
          </option>
        )
      )
  }
</select>
<h2 className="mt-6 mb-2">
  Vehicle Start
</h2>

<input
  value={vehicleStart}
  readOnly
  className="border p-2"
/>

<h2 className="mt-6 mb-2">
  Vehicle End
</h2>

<input
  value={vehicleEnd}
  readOnly
  className="border p-2"
/>

<h2 className="mt-6 mb-2">
  Event Name
</h2>

<input
  value={eventName}
  readOnly
  className="border p-2 w-full"
/>
<div className="mt-8">

  <button
    onClick={handleSubmit}
    className="
      bg-green-600
      text-white
      px-6
      py-2
      rounded
    "
  >
    Submit
  </button>

</div>



        </div>
    );
};

export default EventForm;