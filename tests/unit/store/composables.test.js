import { useStore } from "vuex";
jest.mock("vuex");

import { useFetchJobsDispatch } from "@/store/composables";

import {
  useFilteredJobs,
  useUniqueJobTypes,
  useUniqueOrganizations,
} from "@/store/composables";

describe("composables", () => {
  describe("useFilteredJobs", () => {
    it("retrieves filtered jobs from store", () => {
      useStore.mockReturnValue({
        getters: {
          FILTERED_JOBS: [{ id: 1 }],
        },
      });
      const result = useFilteredJobs();
      expect(result.value).toEqual([{ id: 1 }]);
    });
  });

  describe("useUniqueJobTypes", () => {
    it("retrieves unique job types from store", () => {
      useStore.mockReturnValue({
        getters: {
          UNIQUE_JOB_TYPES: new Set(["fulltime"]),
        },
      });
      const result = useUniqueJobTypes();
      expect(result.value).toEqual(new Set(["fulltime"]));
    });
  });

  describe("useUniqueOrganizations", () => {
    it("retrieves unique organizations from store", () => {
      useStore.mockReturnValue({
        getters: {
          UNIQUE_ORGANIZATIONS: new Set(["apple"]),
        },
      });
      const result = useUniqueOrganizations();
      expect(result.value).toEqual(new Set(["apple"]));
    });
  });

  describe("useFetchJobsDispatch", () => {
    it("sends call to fetch jobs from API", () => {
      const dispatch = jest.fn();
      useStore.mockReturnValue({
        dispatch,
      });
      useFetchJobsDispatch();
      expect(dispatch).toHaveBeenLastCalledWith("FETCH_JOBS");
    });
  });
});
