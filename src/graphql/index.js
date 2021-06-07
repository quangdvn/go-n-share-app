import gql from 'graphql-tag';

export const HELLO = gql`
  query {
    hello
  }
`;

export const LOG_IN = gql`
  query($password: String!, $username: String!) {
    logIn(type: DRIVER, password: $password, username: $username) {
      error
      token
    }
  }
`;

export const DRIVER_INFO = gql`
  query {
    driverInfo {
      id
      hasAssignedTrip
      workingStatus
      isVerify
      schedule
      age
      fullname
      phone
      role
      username
      location {
        name
        subname
      }
      trips {
        id
        tripStatus
        departureDate
        departureTime
        arriveDate
        arriveTime
      }
      transits {
        id
        tripId
        departureShift
        departureDate
        transitStatus
      }
    }
  }
`;

export const TRANSIT_DETAIL = gql`
  query($transitId: Int!) {
    getTransitDetail(transitId: $transitId) {
      error
      data {
        id
        departureDate
        departureShift
        departureId
        departureName
        departureSubName
        departureAddress
        departureTerminal
        departureLatitude
        departureLongitude
        arriveId
        arriveName
        arriveSubName
        arriveAddress
        arriveTerminal
        arriveLatitude
        arriveLongitude
        transitStatus
        cabId
        driverId
        tripId
        numberPlate
        seatNumber
        cabName
        details {
          id
          bookingName
          bookingPhone
          bookingStatus
          notes
          address
          latitude
          longitude
          transitId
          isVerify
          isCancel
          transitStatus
        }
      }
    }
  }
`;

export const TRIP_DETAIL = gql`
  query($tripId: Int!) {
    getTripDetail(tripId: $tripId) {
      error
      data {
        id
        departureDate
        departureTime
        departureLocation
        fixedDepartureId
        fixedDepartureName
        fixedDepartureSubName
        fixedDepartureAddress
        fixedDepartureTerminal
        fixedDepartureLatitude
        fixedDepartureLongitude
        arriveDate
        arriveTime
        arriveLocation
        fixedArriveId
        fixedArriveName
        fixedArriveSubName
        fixedArriveAddress
        fixedArriveTerminal
        fixedArriveLatitude
        fixedArriveLongitude
        tripStatus
        coachId
        driverId
        bookedSeat
        numberPlate
        seatNumber
        coachName
        bookings {
          id
          bookingName
          bookingMail
          bookingPhone
          totalPrice
          notes
          paymentMethod
          bookingStatus
        }
      }
    }
  }
`;
