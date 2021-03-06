/* eslint-disable no-console */
import { SubmissionError } from 'redux-form';
import swal from 'sweetalert';
import { API_BASE_URL, GOOGLE_MAP_KEY, CLOUDINARY_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';
import { refreshAuthToken } from './auth';
export const SET_GENRES = 'SET_GENRES';
export const setGenres = genres => ({
  type: SET_GENRES,
  genres
});

export const SET_MOVIES = 'SET_MOVIES';
export const setMovies = movies => ({
  type: SET_MOVIES,
  movies
});

export const FILTER_USER = 'FILTER_USER';
export const filterUser = user => ({
  type: FILTER_USER,
  user
});

export const RESET_USER = 'RESET_USER';
export const resetUser = () => ({
  type: RESET_USER
});

export const FETCH_MATCHES_REQUEST = 'FETCH_MATCHES_REQUEST';
export const fetchMatchesRequest = () => ({
  type: FETCH_MATCHES_REQUEST
});

export const FETCH_MATCHES_SUCCESS = 'FETCH_MATCHES_SUCCESS';
export const fetchMatchesSuccess = matches => ({
  type: FETCH_MATCHES_SUCCESS,
  matches
});

export const FETCH_MATCHES_FAILURE = 'FETCH_MATCHES_FAILURE';
export const fetchMatchesFailure = error => ({
  type: FETCH_MATCHES_FAILURE,
  error
});

export const fetchMatches = () => (dispatch, getState) => {
  dispatch(fetchMatchesRequest());
  const authToken = getState().auth.authToken;

  return fetch(`${API_BASE_URL}/main/`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => res.json())
    .then(res => {
      dispatch(fetchMatchesSuccess(res));
    })
    .catch(err => dispatch(fetchMatchesFailure(err)));
};

// export const fetchMatchesNearMe = () => (dispatch, getState) => {
//   dispatch(fetchMatchesRequest());
//   const authToken = getState().auth.authToken;
//   const lng = getState().user.location.coordinates.longitude;
//   const lat = getState().user.location.coordinates.latitude;

//   return fetch(`${API_BASE_URL}/main/location?lng=${lng}&lat=${lat}`, {
//     method: 'GET',
//     headers: {
//       Authorization: `Bearer ${authToken}`
//     }
//   })
//     .then(res => res.json())
//     .then(res => {
//       console.log('response from api near call:', res);
//       dispatch(fetchMatchesSuccess(res));
//     })
//     .catch(err => dispatch(fetchMatchesFailure(err)));
// };

export const FETCH_CURRENT_USER_REQUEST = 'FETCH_CURRENT_USER_REQUEST';
export const fetchCurrentuserRequest = () => ({
  type: FETCH_CURRENT_USER_REQUEST
});

export const FETCH_CURRENT_USER_SUCCESS = 'FETCH_CURRENT_USER_SUCCESS';
export const fetchCurrentuserSuccess = user => ({
  type: FETCH_CURRENT_USER_SUCCESS,
  user
});

export const FETCH_CURRENT_USER_FAILURE = 'FETCH_CURRENT_USER_FAILURE';
export const fetchCurrentuserFailure = error => ({
  type: FETCH_CURRENT_USER_FAILURE,
  error
});

export const fetchCurrentuser = () => (dispatch, getState) => {
  dispatch(fetchCurrentuserRequest());
  let userId;
  const currentUser = getState().auth.currentUser;
  if (currentUser) {
    userId = currentUser.id;
  }

  return fetch(`${API_BASE_URL}/users/${userId}`, {
    method: 'GET'
  })
    .then(res => res.json())
    .then(res => {
      dispatch(fetchCurrentuserSuccess(res));
      dispatch(setGenres(res.genres));
      dispatch(setMovies(res.movies));
    })
    .catch(err => dispatch(fetchCurrentuserFailure(err)));
};

export const registerUser = user => () => {
  return fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .catch(err => {
      const { reason, message, location } = err;
      if (reason === 'ValidationError') {
        // Convert ValidationErrors into SubmissionErrors for Redux Form
        return Promise.reject(
          new SubmissionError({
            [location]: message
          })
        );
      }
    });
};

export const updateUser = data => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  const currentUser = getState().auth.currentUser;
  let userId;
  if (currentUser) {
    userId = currentUser.id;
  }

  return fetch(`${API_BASE_URL}/main/${userId}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(res => {
      dispatch(setGenres(res.genres));
      dispatch(setMovies(res.movies));
    })
    .catch(err => {
      console.error(err);
    });
};

export const popCornMatch = data => (dispatch, getState) => {
  const authToken = getState().auth.authToken;

  return fetch(`${API_BASE_URL}/main/popcorn`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify(data)
  })
    .catch(err => {
      console.error(err);
    });
};

export const FETCH_POPCORN_REQUEST = 'FETCH_POPCORN_REQUEST';
export const fetchPopcornRequest = () => ({
  type: FETCH_POPCORN_REQUEST
});

export const FETCH_POPCORN_SUCCESS = 'FETCH_POPCORN_SUCCESS';
export const fetchPopcornSuccess = popcorn => ({
  type: FETCH_POPCORN_SUCCESS,
  popcorn
});

export const FETCH_POPCORN_FAILURE = 'FETCH_POPCORN_FAILURE';
export const fetchPopcornFailure = error => ({
  type: FETCH_POPCORN_FAILURE,
  error
});

export const fetchPopcorn = () => (dispatch, getState) => {
  dispatch(fetchPopcornRequest());
  const authToken = getState().auth.authToken;
  const currentUser = getState().auth.currentUser;
  let userId;
  if (currentUser) {
    userId = currentUser.id;
  }

  return fetch(`${API_BASE_URL}/main/popcorn/${userId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => res.json())
    .then(res => {
      dispatch(fetchPopcornSuccess(res));
    })
    .catch(err => dispatch(fetchPopcornFailure(err)));
};

export const FETCH_MATCHED_REQUEST = 'FETCH_MATCHED_REQUEST';
export const fetchMatchedRequest = () => ({
  type: FETCH_MATCHED_REQUEST
});

export const FETCH_MATCHED_SUCCESS = 'FETCH_MATCHED_SUCCESS';
export const fetchMatchedSuccess = matched => ({
  type: FETCH_MATCHED_SUCCESS,
  matched
});

export const FETCH_MATCHED_FAILURE = 'FETCH_MATCHED_FAILURE';
export const fetchMatchedFailure = error => ({
  type: FETCH_MATCHED_FAILURE,
  error
});

export const fetchMatched = () => (dispatch, getState) => {
  dispatch(fetchMatchedRequest());
  const authToken = getState().auth.authToken;
  const currentUser = getState().auth.currentUser;
  let userId;
  if (currentUser) {
    userId = currentUser.id;
  }

  return fetch(`${API_BASE_URL}/main/matches/${userId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => res.json())
    .then(res => {
      dispatch(fetchMatchedSuccess(res));
    })
    .catch(err => dispatch(fetchMatchedFailure(err)));
};

export const CHAIR_USER_REQUEST = 'CHAIR_USER_REQUEST';
export const chairUserRequest = () => ({
  type: CHAIR_USER_REQUEST
});

export const CHAIR_USER_SUCCESS = 'CHAIR_USER_SUCCESS';
export const chairUserSuccess = matched => ({
  type: CHAIR_USER_SUCCESS,
  matched
});

export const CHAIR_USER_FAILURE = 'CHAIR_USER_FAILURE';
export const chairUserFailure = error => ({
  type: CHAIR_USER_FAILURE,
  error
});

export const chairUser = ignoredUserId => (dispatch, getState) => {
  dispatch(chairUserRequest());
  const authToken = getState().auth.authToken;
  const currentUser = getState().auth.currentUser;
  let userId;
  if (currentUser) {
    userId = currentUser.id;
  }

  return fetch(`${API_BASE_URL}/main/ignore/${userId}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify({ userId: ignoredUserId })
  })
    .then(res => {
      dispatch(chairUserSuccess(res));
    })
    .catch(err => dispatch(chairUserFailure(err)));
};

export const FETCH_MESSAGE_REQUEST = 'FETCH_MESSAGE_REQUEST';
export const fetchMessageRequest = () => ({
  type: FETCH_MESSAGE_REQUEST
});

export const FETCH_MESSAGE_SUCCESS = 'FETCH_MESSAGE_SUCCESS';
export const fetchMessageSuccess = messages => ({
  type: FETCH_MESSAGE_SUCCESS
});

export const FETCH_MESSAGE_FAILURE = 'FETCH_MESSAGE_FAILURE';
export const fetchMessageFailure = error => ({
  type: FETCH_MESSAGE_FAILURE,
  error
});

export const PUT_MESSAGE_REQUEST = 'PUT_MESSAGE_REQUEST';
export const putMessageRequest = () => ({
  type: PUT_MESSAGE_REQUEST
});

export const PUT_MESSAGE_SUCCESS = 'PUT_MESSAGE_SUCCESS';
export const putMessageSuccess = () => ({
  type: PUT_MESSAGE_SUCCESS
});

export const PUT_MESSAGE_FAILURE = 'PUT_MESSAGE_FAILURE';
export const putMessageFailure = error => ({
  type: PUT_MESSAGE_FAILURE,
  error
});

export const putMessages = (chatroomId, messages) => (dispatch, getState) => {
  dispatch(putMessageRequest());
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/messages/${chatroomId}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify({ messages })
  })
    .then(res => {
      dispatch(putMessageSuccess(res));
    })
    .catch(err => dispatch(putMessageFailure(err)));
};

//GEOLOCATION =========================================================================

export const GEOLOCATE_USER_REQUEST = 'GEOLOCATE_USER_REQUEST';
export const geolocateUserRequest = () => ({
  type: GEOLOCATE_USER_REQUEST
});

export const GEOLOCATE_USER_SUCCESS = 'GEOLOCATE_USER_SUCCESS';
export const geolocateUserSuccess = location => ({
  type: GEOLOCATE_USER_SUCCESS,
  location
});

export const GEOLOCATE_USER_FAILURE = 'GEOLOCATE_USER_FAILURE';
export const geolocateUserFailure = error => ({
  type: GEOLOCATE_USER_FAILURE,
  error
});

//BACKEND LOCATION UPDATE FUNCTION
export const updateUserLocation = () => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  const currentUser = getState().auth.currentUser;
  const location = getState().user.location;

  let userId;
  if (currentUser) {
    userId = currentUser.id;
  }

  fetch(`${API_BASE_URL}/main/location/${userId}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify(location)
  })
    .catch(err => console.log(err.message));
};

export const geolocateUser = () => (dispatch, getState) => {
  dispatch(geolocateUserRequest());
  // const authToken = getState().auth.authToken;
  // const currentUser = getState().auth.currentUser;
  // let userId;
  // if (currentUser) {
  //   userId = currentUser.id;
  // }

  function findCity(areas) {
    const correctLoc = areas.filter(
      area =>
        area.types.includes('locality') && area.types.includes('political')
    );
    return correctLoc[0].formatted_address;
  }

  function getLocationName(lat, lng) {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAP_KEY}`
    )
      .then(response => response.json())
      .then(data => {
        const cityName = findCity(data.results);
        dispatch(
          geolocateUserSuccess({
            city: cityName,
            coordinates: { latitude: lat, longitude: lng }
          })
        );
      })
      .then(() => dispatch(updateUserLocation()))
      .catch(err => dispatch(geolocateUserFailure(err)));
  }

  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      function success(position) {
        getLocationName(position.coords.latitude, position.coords.longitude);
      },
      function error(error_message) {
        console.error(
          'An error has occured while retrieving location',
          error_message
        );
      }
    );
  }
};

//NICK ADDED

export const USER_PIC_REQUEST = 'USER_PIC_REQUEST';
export const userPicRequest = () => ({
  type: USER_PIC_REQUEST
});

export const USER_PIC_SUCCESS = 'USER_PIC_SUCCESS';
export const userPicSuccess = (location, coords) => ({
  type: USER_PIC_SUCCESS
});

export const USER_PIC_FAILURE = 'USER_PIC_FAILURE';
export const userPicFailure = error => ({
  type: USER_PIC_SUCCESS,
  error
});

export const postUserProfilePicture = (userId, imgUrl) => (
  dispatch,
  getState
) => {
  const authToken = getState().auth.authToken;

  dispatch(userPicRequest());

  fetch(`${API_BASE_URL}/main/profilePicture/${userId}`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify({
      profilePic: imgUrl
    })
  })
    .then(res => {
      dispatch(userPicSuccess());
      dispatch(refreshAuthToken());
      return res.json();
    })
    .catch(err => {
      dispatch(userPicFailure(err));
      swal('Oops!', 'Seems like we couldn\'t post the picture!');
    });
};

export const postCloudinaryProfilePicture = (file, userId) => dispatch => {
  dispatch(userPicRequest());
  fetch(`${CLOUDINARY_BASE_URL}`, {
    method: 'POST',
    body: file
  })
    .then(res => res.json())
    .then(res => {
      dispatch(userPicSuccess());
      let profilePic = res.secure_url;
      swal('Congrats!', 'New profile picture submitted!');
      return dispatch(postUserProfilePicture(userId, profilePic));
    })
    .catch(err => {
      dispatch(userPicFailure(err));
      swal('Oops!', 'Seems like we couldn\'t post the picture!');
    });
};

export const NEVER_MIND_USER_REQUEST = 'NEVER_MIND_USER_REQUEST';
export const neverMindUserRequest = () => ({
  type: NEVER_MIND_USER_REQUEST
});

export const NEVER_MIND_USER_SUCCESS = 'NEVER_MIND_USER_SUCCESS';
export const neverMindUserSuccess = () => ({
  type: NEVER_MIND_USER_SUCCESS
});

export const NEVER_MIND_USER_FAILURE = 'NEVER_MIND_USER_FAILURE';
export const neverMindUserFailure = error => ({
  type: NEVER_MIND_USER_FAILURE,
  error
});

export const neverMindUser = neverMindUserId => (dispatch, getState) => {
  dispatch(neverMindUserRequest());
  const authToken = getState().auth.authToken;
  const currentUser = getState().auth.currentUser;
  let userId;
  if (currentUser) {
    userId = currentUser.id;
  }

  return fetch(`${API_BASE_URL}/main/ignore/nevermind/${userId}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify({ userId: neverMindUserId })
  })
    .then(res => {
      dispatch(neverMindUserSuccess(res));
    })
    .catch(err => dispatch(neverMindUserFailure(err)));
};

export const FETCH_NOTIFICATION_REQUEST = 'FETCH_NOTIFICATION_REQUEST';
export const fetchNotificationRequest = () => ({
  type: FETCH_NOTIFICATION_REQUEST
});

export const FETCH_NOTIFICATION_SUCCESS = 'FETCH_NOTIFICATION_SUCCESS';
export const fetchNotificationSuccess = notificationInfo => ({
  type: FETCH_NOTIFICATION_SUCCESS,
  notifications: notificationInfo.notifications,
  notificationCheck: notificationInfo.notificationCheck
});

export const FETCH_NOTIFICATION_FAILURE = 'FETCH_NOTIFICATION_FAILURE';
export const fetchNotificationFailure = error => ({
  type: FETCH_NOTIFICATION_FAILURE,
  error
});

export const fetchNotification = () => (dispatch, getState) => {
  dispatch(fetchNotificationRequest());
  const authToken = getState().auth.authToken;
  const currentUser = getState().auth.currentUser;
  let userId;
  if (currentUser) {
    userId = currentUser.id;
  }

  return fetch(`${API_BASE_URL}/main/notifications/${userId}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => res.json())
    .then(res => {
      dispatch(fetchNotificationSuccess(res));
    })
    .catch(err => dispatch(fetchNotificationFailure(err)));
};

export const PUT_NOTIFICATION_TIME_REQUEST = 'PUT_NOTIFICATION_TIME_REQUEST';
export const putNotificationTimeRequest = () => ({
  type: PUT_NOTIFICATION_TIME_REQUEST
});

export const PUT_NOTIFICATION_TIME_SUCCESS = 'PUT_NOTIFICATION_TIME_SUCCESS';
export const putNotificationTimeSuccess = date => ({
  type: PUT_NOTIFICATION_TIME_SUCCESS,
  date
});

export const PUT_NOTIFICATION_TIME_FAILURE = 'PUT_NOTIFICATION_TIME_FAILURE';
export const putNotificationTimeFailure = error => ({
  type: PUT_NOTIFICATION_TIME_FAILURE,
  error
});

export const putNotificationTime = () => (dispatch, getState) => {
  dispatch(putNotificationTimeRequest());
  const authToken = getState().auth.authToken;
  const currentUser = getState().auth.currentUser;
  let userId;
  if (currentUser) {
    userId = currentUser.id;
  }

  return fetch(`${API_BASE_URL}/main/notifications/time/${userId}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => res.json())
    .then(res => {
      dispatch(putNotificationTimeSuccess(res));
    })
    .catch(err => dispatch(putNotificationTimeFailure(err)));
};
