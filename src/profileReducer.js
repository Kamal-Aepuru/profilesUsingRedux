import { ADD_PROFILE, CALCULATE_AVERAGE_AGE, REMOVE_PROFILE } from "./actions";

const initialState = {
  profileList: [],
  average: 0,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PROFILE:
      return { ...state, profileList: [...state.profileList, action.payload] };
    case REMOVE_PROFILE: {
      const profileToBeRemovedIndex = state.profileList.findIndex(
        (profile) => profile.id === action.payload
      );
      const updatedProfileList = [...state.profileList];
      if (profileToBeRemovedIndex >=0) {
        updatedProfileList.splice(profileToBeRemovedIndex, 1);
      }
      return { ...state, profileList: updatedProfileList };
    }
    case CALCULATE_AVERAGE_AGE: {
      if (!state.profileList || state.profileList.length === 0) {
        return { ...state, average: 0 };
      }
      const averageAge = parseFloat(
        state.profileList.reduce((acc, curr) => acc + curr.age, 0) /
          state.profileList.length
      ).toFixed(2);

      return { ...state, average: averageAge };
    }

    default:
      return state;
  }
};

export default profileReducer;
