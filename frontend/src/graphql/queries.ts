import { gql } from '@apollo/client';

export const GET_DIVISIONS = gql`
  query {
    getDivisions {
      id
      name
    }
  }
`;

export const GET_EVENT_BY_PID = gql`
  query GetEventByPid(
    $pid: String!
  ) {
    getEventByPid(
      pid: $pid
    ) {
      id

      pid

      divisionId

      promoProductGroupId

      storeGroupTypeId

      storeGroupId

      vehicleType

      year

      startVehicleWeek

      vehicleStart

      vehicleEnd

      eventName
    }
  }
`;

export const GET_PROMO_GROUPS = gql`
  query(
    $divisionId:String!
  ){
    getPromoProductGroups(
      divisionId:$divisionId
    ){
      id
      name
    }
  }
`;

export const GET_STORE_GROUP_TYPES = gql`
  query(
    $promoProductGroupId:String!
  ){
    getStoreGroupTypes(
      promoProductGroupId:
      $promoProductGroupId
    ){
      id
      name
    }
  }
`;

export const GET_STORE_GROUPS = gql`
  query(
    $storeGroupTypeId:String!
  ){
    getStoreGroups(
      storeGroupTypeId:
      $storeGroupTypeId
    ){
      id
      name
    }
  }
`;

export const GET_VEHICLE_WEEKS = gql`
  query(
    $vehicleType:String!
  ){
    getVehicleWeeks(
      vehicleType:
      $vehicleType
    ){
      id
      week
      vehicleStart
      vehicleEnd
    }
  }
`;

