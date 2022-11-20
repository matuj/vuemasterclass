const state = () => {
  return {
    isLoggedIn: false,
    jobs: [],
    // for jobFiltersSidebarOrganizations
    selectedOrganizations: [],
    selectedJobTypes: [],
  };
};

export default state;
