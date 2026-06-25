import {useState,useEffect} from 'react';
import {useLazyQuery,useQuery} from '@apollo/client/react';
import {
            GET_EVENT_BY_PID,
            GET_DIVISIONS,
            GET_PROMO_GROUPS,
            GET_VEHICLE_WEEKS,
            GET_STORE_GROUPS,
            GET_STORE_GROUP_TYPES,
        } from '../graphql/queries';
import {CREATE_EVENT} from '../graphql/mutations';

import {useMutation} from '@apollo/client/react';



import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import type {RootState} from '../app/store';

import {setEvent,resetEvent} from '../features/event/eventSlice';

import {validateEventForm} from '../utils/validations/eventFormValidation'


const Section = ({title,children}: {title: string; children: React.ReactNode;}) => (
        <div className="border-b border-gray-200 pb-6 mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
                {title}
            </label>

            {children}
        </div>
    );


const EventForm = () => {

    const [showErrorModal, setShowErrorModal] = useState(false);
    const [isExpanded,setIsExpanded] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [validationErrors,setValidationErrors] = useState([])
    const [showNoRecordModal,setShowNoRecordModal] =useState(false);
   
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const event = useSelector((state: RootState) => state.event);

    const [createEvent] = useMutation(CREATE_EVENT);
    const {data: divisions} = useQuery(GET_DIVISIONS);

    const [loadPromoGroups,{data: promoGroupsData}] = useLazyQuery(GET_PROMO_GROUPS);
    const [fetchEvent] = useLazyQuery(GET_EVENT_BY_PID);
    const [loadStoreGroupTypes,{data: storeGroupTypesData}] = useLazyQuery(GET_STORE_GROUP_TYPES);
    const [loadStoreGroups,{data: storeGroupsData}] = useLazyQuery(GET_STORE_GROUPS);
    const [loadVehicleWeeks,{data: vehicleWeeksData}] = useLazyQuery(GET_VEHICLE_WEEKS);

    
    useEffect(() => { loadVehicleWeeks({variables: {vehicleType:'Weekly Insert'}}) }, []);
    useEffect(() => { dispatch(resetEvent())}, []);

    useEffect(() => {

        if (!event.divisionId) {
            return;
        }

        loadPromoGroups({
            variables: {
                divisionId:
                    event.divisionId,
            },
        });

    }, [event.divisionId, loadPromoGroups,]);

    useEffect(() => {

        if (!event.promoProductGroupId) {
            return;
        }

        loadStoreGroupTypes({
            variables: {
                promoProductGroupId:
                    event.promoProductGroupId,
            },
        });

    }, [event.promoProductGroupId]);

    useEffect(() => {

        if (!event.storeGroupTypeId) {
            return;
        }

        loadStoreGroups({
            variables: {
                storeGroupTypeId:
                    event.storeGroupTypeId,
            },
        });

    }, [event.storeGroupTypeId]);

    useEffect(() => {

        const selectedPromoGroupName =
            promoGroupsData
                ?.getPromoProductGroups
                ?.find(
                    (item: any) =>
                        item.id === event.promoProductGroupId
                )
                ?.name || '';

        if (
            !selectedPromoGroupName ||
            !event.startVehicleWeek
        ) {
            return;
        }

        dispatch(
            setEvent({
                eventName:
                    `${selectedPromoGroupName} - ${event.startVehicleWeek}`,
            })
        );

    }, [
        event.promoProductGroupId,
        event.startVehicleWeek,
        promoGroupsData,
    ]);

const handleFetch = async () => {

  const response =
    await fetchEvent({
      variables: {
        pid: event.pid,
      },
    });

  if (
    response.data?.getEventByPid
  ) {
    const fetchedEvent =
  response.data
    ?.getEventByPid;

    dispatch(
  setEvent({
    pid:
      fetchedEvent.pid,

    divisionId:
      fetchedEvent.divisionId,

    promoProductGroupId:
      fetchedEvent.promoProductGroupId,

    storeGroupTypeId:
      fetchedEvent.storeGroupTypeId,

    storeGroupId:
      fetchedEvent.storeGroupId,

    vehicleType:
      fetchedEvent.vehicleType,

    year:
      fetchedEvent.year,

    startVehicleWeek:
      fetchedEvent.startVehicleWeek,

    vehicleStart:
      fetchedEvent.vehicleStart,

    vehicleEnd:
      fetchedEvent.vehicleEnd,

    eventName:
      fetchedEvent.eventName,

    isExistingEvent:
      true,
  })
);

    setShowForm(true);

  } else {
    
    setShowForm(false)
    setShowNoRecordModal(true);

  }
};


    const handleSubmit =async ()=>{
        const errors = validateEventForm(event);

        if (
            Object.keys(errors)
                .length > 0
        ) {
            const validationErrorMessages = Object.values(errors);
            console.log('validationErrorMessages',validationErrorMessages);

            setValidationErrors(validationErrorMessages)

            setShowErrorModal(true)
            return;
        }
            try {
                    await createEvent({
                        variables: {
                            input: {

                                pid: event.pid,

                                divisionId:
                                    event.divisionId,

                                promoProductGroupId:
                                    event.promoProductGroupId,

                                storeGroupTypeId:
                                    event.storeGroupTypeId,

                                storeGroupId:
                                    event.storeGroupId,

                                vehicleType:
                                    event.vehicleType,

                                year: event.year,

                                startVehicleWeek:
                                    event.startVehicleWeek,
                            },
                        },
                    });


                dispatch(
                    setEvent({
                        pid: event.pid,

                        divisionId:
                            event.divisionId,

                        promoProductGroupId:
                            event.promoProductGroupId,

                        storeGroupTypeId:
                            event.storeGroupTypeId,

                        storeGroupId:
                            event.storeGroupId,

                        startVehicleWeek:
                            event.startVehicleWeek,

                        vehicleStart:
                            event.vehicleStart,

                        vehicleEnd:
                            event.vehicleEnd,

                        eventName:
                            event.eventName,
                    })
                );
                navigate('/confirmation');



            } catch (error) {

                console.error(error);

            }
        }
 
        
    
       

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-5xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg">

                   <div
  className="
    px-8
    py-5
    border-b
    cursor-pointer
    flex
    justify-between
    items-center
  "
  onClick={() =>
    setIsExpanded(
      !isExpanded
    )
  }
>

  <h1 className="text-3xl font-bold"
  >
    Event Details
  </h1>

  <span
    className="text-2xl font-bold"
  >
    {
      isExpanded
        ? '−'
        : '+'
    }
  </span>

</div>
{isExpanded && (
     <div className="p-8">

                        {/* Sections */}
                        <Section title="PID">

                            <div className="flex gap-4">

                                {/* Existing PID input */}
                                <input
                                    value={event.pid ?? ''}
                                    onChange={(e) =>
                                        dispatch(
                                            setEvent({
                                                pid: e.target.value,
                                            })
                                        )
                                    }
                                    placeholder="Enter PID"
                                    className="border p-2 mr-2"
                                />


                                {/* Existing Fetch Button */}
                                <button
                                    onClick={handleFetch}
                                    className=" bg-blue-600 text-white px-4 py-2"
                                >
                                    Fetch Event Details
                                </button>

                            </div>

                        </Section>


                        {
  showNoRecordModal && (

    <div
      className="
        fixed
        inset-0
        bg-black/50
        flex
        items-center
        justify-center
        z-50
      "
    >

      <div
        className="
          bg-white
          rounded-lg
          p-6
          w-[450px]
        "
      >

        <h2
          className="
            text-xl
            font-bold
            text-red-600
            mb-4
          "
        >
          No Record Found
        </h2>

        <p>
          No event found for PID:
          <strong>
            {' '}
            {event.pid}
          </strong>
        </p>

        <p className="mt-2">
          Would you like to create
          a new event?
        </p>

        <div
          className="
            flex
            justify-end
            gap-3
            mt-6
          "
        >

          <button
            onClick={() =>
              setShowNoRecordModal(
                false
              )
            }
            className="
              border
              px-4
              py-2
              rounded
            "
          >
            Cancel
          </button>

                                                <button
                                                    onClick={() => {

                                                        const newPid =
                                                            event.pid;

                                                        dispatch(
                                                            resetEvent()
                                                        );

                                                        dispatch(
                                                            setEvent({
                                                                pid: newPid,

                                                                isExistingEvent: false,

                                                                editMode: false,
                                                            })
                                                        );

                                                        setShowForm(true);

                                                        setShowNoRecordModal(false);

                                                    }}
                                                >
                                                    Create New Event
                                                </button>

        </div>

      </div>

    </div>

  )
}



                        {showForm && <>
                        <Section title="Division">                           
                            <select
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={event.divisionId}
                                onChange={(e) => {

                                    const divisionId =
                                        e.target.value;


                                    dispatch(
                                        setEvent({
                                            divisionId,
                                            promoProductGroupId: '',

                                            storeGroupTypeId: '',

                                            storeGroupId: '',
                                        })
                                    );


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

                            <div className="mt-2 text-sm text-gray-500">
                            Selected: {event.divisionId || '-'}
                            </div>
                        </Section>


                        <Section title="Promo Product Group">
                            <select
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={event.promoProductGroupId}
                                onChange={(e) => {

                                    dispatch(
                                        setEvent({
                                            promoProductGroupId:
                                                e.target.value,

                                            storeGroupTypeId: '',

                                            storeGroupId: '',
                                        })
                                    );

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

                            <div>
                                Selected Promo:
                                {event.promoProductGroupId}
                            </div>

                        </Section>

                        <Section>
                         
                            <div className="grid grid-cols-2 gap-6">

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                           Store Configuration
                                        </label>
                                    <select
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={event.storeGroupTypeId}
                                        onChange={(e) => {

                                            const storeGroupTypeId =
                                                e.target.value;

                                            dispatch(
                                                setEvent({
                                                    storeGroupTypeId,

                                                    storeGroupId: '',
                                                })
                                            );

                                        }}
                                    >
                                        <option value="">
                                            Select Store Group Type
                                        </option>

                                        {
                                            storeGroupTypesData
                                                ?.getStoreGroupTypes
                                                ?.map(
                                                    (item: any) => (
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
                                </div>

                                <div>
                                    {/* Existing Store Group */}
                                        <label className="block text-sm font-medium mb-2">
                                            Store Group
                                        </label>

                                    <select
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={event.storeGroupId}
                                        onChange={(e) => {
                                            dispatch(
                                                setEvent({
                                                    storeGroupId:
                                                        e.target.value,
                                                })

                                            )

                                        }

                                        }
                                    >
                                        <option value="">
                                            Select Store Group
                                        </option>

                                        {
                                            storeGroupsData
                                                ?.getStoreGroups
                                                ?.map(
                                                    (item: any) => (
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
                                </div>

                    
                            </div>
                        </Section>

                        <Section title="Vehicle Details">

                            <div className="grid grid-cols-3 gap-6">

                                <div>
    
                                    <label className="block text-sm font-medium mb-2">
                                        Start Vehicle Week
                                    </label>
                                    <select
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={event.startVehicleWeek}
                                        onChange={(e) => {

                                            const week =
                                                e.target.value;

                                            dispatch(
                                                setEvent({
                                                    startVehicleWeek: week,
                                                })
                                            );

                                            const selectedWeek =
                                                vehicleWeeksData
                                                    ?.getVehicleWeeks
                                                    ?.find(
                                                        (item: any) =>
                                                            item.week === week
                                                    );

                                            dispatch(
                                                setEvent({

                                                    startVehicleWeek: week,

                                                    vehicleStart:
                                                        selectedWeek?.vehicleStart || '',

                                                    vehicleEnd:
                                                        selectedWeek?.vehicleEnd || '',
                                                })
                                            );
                                            const selectedPromoGroupName =
                                                promoGroupsData
                                                    ?.getPromoProductGroups
                                                    ?.find(
                                                        (item: any) =>
                                                            item.id === event.promoProductGroupId
                                                    )
                                                    ?.name || '';

                                            dispatch(
                                                setEvent({

                                                    startVehicleWeek: week,

                                                    vehicleStart:
                                                        selectedWeek?.vehicleStart || '',

                                                    vehicleEnd:
                                                        selectedWeek?.vehicleEnd || '',
                                                })
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
                                                    (item: any) => (
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
                                </div>

                                <div>
                                   <label className="block text-sm font-medium mb-2">
                                    Vehicle Start
                                    </label>

                                    <input
                                        value={event.vehicleStart}
                                        readOnly
                                        className="w-full px-3 py-2 bg-gray-100 border rounded-md"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                    Vehicle End
                                    </label>

                                    <input
                                        value={event.vehicleEnd}
                                        readOnly
                                        className="w-full px-3 py-2 bg-gray-100 border rounded-md "
                                    />
                                </div>

                            </div>

                        </Section>

                        <Section title="Event Name">


                            <input
                                value={event.eventName}
                                readOnly
                                className="px-3 py-2 bg-gray-100 border rounded-md font-medium"
                                    />
                         </Section>

                        <div className="flex justify-end">
                            <div className="mt-8">

                                <button
                                    onClick={handleSubmit}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition"
                                >
                                    Submit
                                </button>

                            </div>


                        </div>
                        </>}
                  </div>
)}

                   
                </div>
            </div>
            {
                showErrorModal && (

                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg w-96" >

                            <h2 className="text-xl font-bold text-red-600 mb-4">
                                Mandatory Form Details
                            </h2>
                            <ul>{validationErrors.map(error => <li key={error}>{error}</li>)}</ul>

                            <button
                                onClick={() =>
                                    setShowErrorModal(false)
                                }
                                className="mt-6 bg-blue-600 text-white px-4 py-2 rounded">
                                OK
                            </button>

                        </div>

                    </div>
                )
            }
        </div>

    );
};

export default EventForm;