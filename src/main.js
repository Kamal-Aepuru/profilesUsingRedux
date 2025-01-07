import profileReducer from "./profileReducer";
import { createStore } from "redux";
import { addProfile, removeProfile, calculateAverageAge } from "./actions";

const store = createStore(profileReducer);
store.subscribe(() => {
  store.getState();
});

const addProfileButton = document.querySelector("#addProfile");
const removeProfileButton = document.querySelector("#removeProfileButton");
const removeProfileId = document.querySelector("#removeProfileId")
const profileId = document.querySelector("#profileId");
const profileName = document.querySelector("#profileName");
const profileAge = document.querySelector("#profileAge");
const allProfiles = document.querySelector("#profileList");
const averageAgeArea = document.querySelector("#averageAgeArea");

const updateProfileList = () => {
  const state = store.getState();
  console.log(state);
  allProfiles.innerHTML = state.profileList
    .map(
      (profile) =>
        `<li key=${profile.id}>${profile.id}. ${profile.name} (${profile.age}years old)</li>`
    )
    .join("");
  averageAgeArea.innerHTML = `Average Age: ${state.average}`;
};

addProfileButton.addEventListener("click", () => {
  const newProfile = {
    id: Number(profileId.value),
    name: profileName.value,
    age: Number(profileAge.value),
  };
  if (newProfile) {
    store.dispatch(addProfile(newProfile));
    store.dispatch(calculateAverageAge());
  }
  updateProfileList();
});

removeProfileButton.addEventListener("click",()=>{
    const profileId = Number(removeProfileId.value)
    store.dispatch(removeProfile(profileId))
    store.dispatch(calculateAverageAge());
    updateProfileList();
})