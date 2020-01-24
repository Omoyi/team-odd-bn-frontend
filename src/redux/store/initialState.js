const state = {
  accommodation: {
    createAccommodation: {
      rooms: [],
      photos: [],
    },
  },
  auth: {
    signup: {
      spinnerStatus: false,
      signupInputData: {},
      signupData: {},
      signupError: {},
    },
    signin: {
      spinnerStatus: false,
      signinInputData: {},
      signinData: {},
      signinError: {},
    },
  },
  allUsers: {
    paginatedRequest: [],
    paginationStart: 0,
    paginationEnd: 5,
  },
  trips: {
    tripRequests: {
      getCity: [],
      onewayData: {},
      onewayError: {},
      onewayInput: {},
    },
    availRequests: {
      approveRequestMessage: {
      },
    },
    requests: {
      requestsData: [],
      singleRequestData: {},
      requestCommentsData: {},
      requestsError: {},
      paginatedRequest: [],
      paginationStart: 0,
      paginationEnd: 5,
    },
    getStats: {
      getStatsInput: {
        tripType: 1,
      },
      getStatsData: {},
      getStatsError: {},
      tripStatsCounter: {},
    },
  },
  viewProfile: {
    profile: {},
  },
};
export default state;
