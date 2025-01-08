import { ADD_PROFILE, CALCULATE_AVERAGE_AGE, REMOVE_PROFILE } from "./actions";

const initialState = {
  profileList: [],
  average: 0,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PROFILE:
      return {
        ...state,
        profileList: [...state.profileList, action.payload],
      };

    case REMOVE_PROFILE: {
      return {
        ...state,
        profileList: state.profileList.filter(
          (profile) => profile.id !== action.payload
        ),
      };
    }

    case CALCULATE_AVERAGE_AGE: {
      if (state.profileList.length === 0) {
        return { ...state, average: 0 };
      }
      const totalAge = state.profileList.reduce(
        (acc, curr) => acc + curr.age,
        0
      );
      const averageAge = Number(
        (totalAge / state.profileList.length).toFixed(2)
      );

      return { ...state, average: averageAge };
    }

    default:
      return state;
  }
};

export default profileReducer;
