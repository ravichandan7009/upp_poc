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

import { useNavigate }
    from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import type {
    RootState,
} from '../app/store';

import {
    setEvent,
} from '../features/event/eventSlice';

import { resetEvent } from '../features/event/eventSlice';

const Section = ({
        title,
        children,
    }: {
        title: string;
        children: React.ReactNode;
    }) => (
        <div className="border-b border-gray-200 pb-6 mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
                {title}
            </label>

            {children}
        </div>
    );


const EventForm = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const event = useSelector((state: RootState) => state.event);

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

    useEffect(() => {
        dispatch(resetEvent());
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
            loading: storeGroupTypesLoading,
            error: storeGroupTypesError,
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

    }, [
        event.divisionId,
        loadPromoGroups,
    ]);

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

    const handleFetch =
        async () => {

            await fetchEvent({
                variables: {
                    pid: event.pid,
                },
            });

        };


    const handleSubmit =
        async () => {

            try {

                const response =
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
        };

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-5xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg">

                    <div className="px-8 py-5 border-b">
                        <h1 className="text-3xl font-bold text-gray-800">
                            Event Details
                        </h1>
                    </div>

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
                                    className="
          border
          p-2
          mr-2
        "
                                />


                                {/* Existing Fetch Button */}
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

                            </div>

                        </Section>
                        <Section title="Division">

                            {/* Existing Division Dropdown */}
                           

                            <select
                                className="
                                        w-full
                                        px-3
                                        py-2
                                        border
                                        border-gray-300
                                        rounded-md
                                        focus:outline-none
                                        focus:ring-2
                                        focus:ring-blue-500
"
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
                                className="
                                w-full
                                px-3
                                py-2
                                border
                                border-gray-300
                                rounded-md
                                focus:outline-none
                                focus:ring-2
                                focus:ring-blue-500
"
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

                        <Section title="Store Configuration">
                          <div className="grid grid-cols-2 gap-6">
                            <div className="grid grid-cols-2 gap-6">

                                <div>
                                    <select
                                        className="
                                                w-full
                                                px-3
                                                py-2
                                                border
                                                border-gray-300
                                                rounded-md
                                                focus:outline-none
                                                focus:ring-2
                                                focus:ring-blue-500
                                                "
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
                                    <h2 className="mt-6 mb-2">
                                        Store Group
                                    </h2>

                                    <select
                                        className="w-full
                                        px-3
                                        py-2
                                        border
                                        border-gray-300
                                        rounded-md
                                        focus:outline-none
                                        focus:ring-2
                                        focus:ring-blue-500
                                        "
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
                            </div>
                        </Section>
                        <Section title="Vehicle Details">
                            <label className="block text-sm font-medium mb-2">
                                Start Vehicle Week
                                </label>

                            <div className="grid grid-cols-3 gap-6">

                                <div>
    

                                    <select
                                        className="
                                            w-full
                                            px-3
                                            py-2
                                            border
                                            border-gray-300
                                            rounded-md
                                            focus:outline-none
                                            focus:ring-2
                                            focus:ring-blue-500
                                            "
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

                                                    eventName:
                                                        `${selectedPromoGroupName} - ${week}`,
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
                                        className="
                                        w-full
                                        px-3
                                        py-2
                                        bg-gray-100
                                        border
                                        rounded-md
                                        "
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                    Vehicle End
                                    </label>

                                    <input
                                        value={event.vehicleEnd}
                                        readOnly
                                        className="
                                        w-full
                                        px-3
                                        py-2
                                        bg-gray-100
                                        border
                                        rounded-md
                                        "
                                    />
                                </div>

                            </div>

                        </Section>

                        <Section title="Event Name">


                            <input
                                value={event.eventName}
                                readOnly
                                className="
                                    w-full
                                    px-3
                                    py-2
                                    bg-gray-100
                                    border
                                    rounded-md
                                    font-medium
                                    "
                                    />

                        </Section>

                        <div className="flex justify-end">

                            {/* Existing Submit Button */}
                            <div className="mt-8">

                                <button
                                    onClick={handleSubmit}
                                    className="
                                    bg-blue-600
                                    hover:bg-blue-700
                                    text-white
                                    px-6
                                    py-3
                                    rounded-md
                                    font-medium
                                    transition
    "
                                >
                                    Submit
                                </button>

                            </div>


                        </div>






                    </div>

                </div>
            </div>
        </div>

    );
};

export default EventForm;