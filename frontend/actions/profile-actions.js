export const GET_PROFILE_DATA = 'GET_PROFILE_DATA';

export const getProfileData = payload => ({
  type: GET_PROFILE_DATA,
  data: payload,
});
