const filtersName = [
  {
    label: `everything`,
  },
  {
    label: `future`,
  },
  {
    label: `past`,
  }
];


const dataTrips = {
  points: [],
  destinations: [],
  offers: []
};

const message = {
  loadData: `Loading route...`,
  loadFail: `Something went wrong while loading your route info. Check your connection or try again later`,
  saving: `Saving...`,
  deleting: `Deleting...`,
  save: `Save`,
  delete: `Delete`
};

export {filtersName, dataTrips, message};
