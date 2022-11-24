import {
  LOGIN_USER,
  RECEIVE_JOBS,
  ADD_SELECTED_ORGANIZATIONS,
  ADD_SELECTED_JOB_TYPES,
} from "@/store/constants";

const mutations = {
  [LOGIN_USER](state) {
    state.isLoggedIn = true;
  },
  [RECEIVE_JOBS](state, jobs) {
    state.jobs = jobs;
  },
  [ADD_SELECTED_ORGANIZATIONS](state, selectedOrganizations) {
    state.selectedOrganizations = selectedOrganizations;
  },
  [ADD_SELECTED_JOB_TYPES](state, jobTypes) {
    state.selectedJobTypes = jobTypes;
  },
};

export default mutations;
