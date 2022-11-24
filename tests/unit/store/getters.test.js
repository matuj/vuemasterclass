import getters from "@/store/getters";

describe("getters", () => {
  describe("UNIQUE_ORGANIZATIONS", () => {
    it("finds unique organizations from a list of jobs", () => {
      const state = {
        jobs: [
          { organization: "google" },
          { organization: "amazon" },
          { organization: "google" },
        ],
      };
      const result = getters.UNIQUE_ORGANIZATIONS(state);
      expect(result).toEqual(new Set(["google", "amazon"]));
    });
  });

  describe("UNIQUE_JOB_TYPES", () => {
    it("finds unique job type from a list of jobs", () => {
      const state = {
        jobs: [
          { jobType: "fulltime" },
          { jobType: "parttime" },
          { jobType: "fulltime" },
          { jobType: "parttime" },
        ],
      };
      const result = getters.UNIQUE_JOB_TYPES(state);
      expect(result).toEqual(new Set(["fulltime", "parttime"]));
    });
  });

  describe("INCLUDE_JOB_BY_ORGANIZATION", () => {
    describe("when the user has not selected any organization", () => {
      it("includes job", () => {
        const state = {
          selectedOrganizations: [],
        };
        const job = { organization: "google" };
        const includeJob = getters.INCLUDE_JOB_BY_ORGANIZATION(state)(job);
        expect(includeJob).toBe(true);
      });
      it("identifies if job is associated with given organization", () => {
        const state = {
          selectedOrganizations: ["google", "Microsoft"],
        };
        const job = { organization: "google" };
        const includeJob = getters.INCLUDE_JOB_BY_ORGANIZATION(state)(job);
        expect(includeJob).toBe(true);
      });
    });
  });

  describe("INCLUDE_JOB_BY_JOB_TYPE", () => {
    describe("when the user has not selected any job type", () => {
      it("includes job", () => {
        const state = {
          selectedJobTypes: [],
        };
        const job = { jobType: "fulltime" };
        const includeJob = getters.INCLUDE_JOB_BY_JOB_TYPE(state)(job);
        expect(includeJob).toBe(true);
      });
      it("identifies if job is associated with given job type", () => {
        const state = {
          selectedJobTypes: ["fulltime", "parttime"],
        };
        const job = { jobType: "fulltime" };
        const includeJob = getters.INCLUDE_JOB_BY_JOB_TYPE(state)(job);
        expect(includeJob).toBe(true);
      });
    });
  });

  describe("FILTERED_JOBS", () => {
    it("filters jobs by organization and job types", () => {
      const INCLUDE_JOB_BY_ORGANIZATION = jest.fn().mockReturnValue(true);
      const INCLUDE_JOB_BY_JOB_TYPE = jest.fn().mockReturnValue(true);
      const mockGetters = {
        INCLUDE_JOB_BY_ORGANIZATION,
        INCLUDE_JOB_BY_JOB_TYPE,
      };

      const job = { id: 1, title: "best job ever" };

      const state = {
        jobs: [job],
      };

      const result = getters.FILTERED_JOBS(state, mockGetters);

      expect(result).toEqual([job]);
      expect(INCLUDE_JOB_BY_ORGANIZATION).toHaveBeenCalledWith(job);
      expect(INCLUDE_JOB_BY_JOB_TYPE).toHaveBeenCalledWith(job);
    });
  });
});
