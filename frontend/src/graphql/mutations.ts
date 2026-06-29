import { gql } from '@apollo/client';

export const CREATE_EVENT = gql`
  mutation CreateEvent(
    $input: CreateEventInput!
  ) {
    createEvent(
      input: $input
    ) {
      id
      pid
      eventName
      vehicleStart
      vehicleEnd
    }
  }
`;

export const UPDATE_EVENT = gql`
 mutation UpdateEvent(
  $input: UpdateEventInput!
) {

  updateEvent(
    input: $input
  ) {

    id
    pid
    eventName

  }

}
`;


