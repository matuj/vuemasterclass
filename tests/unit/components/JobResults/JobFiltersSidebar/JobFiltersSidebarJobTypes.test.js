import { mount } from "@vue/test-utils";

import JobFiltersSidebarJobTypes from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarJobTypes.vue";
import { UNIQUE_JOB_TYPES } from "@/store/constants";

describe("JobFiltersSidebarJobTypes", () => {
  const createConfig = ($store, $router) => ({
    global: {
      mocks: {
        $store,
        $router,
      },
      stubs: {
        FontAwesomeIcon: true,
      },
    },
  });

  it("renders unique list of job types for filtering jobs", async () => {
    const $store = {
      getters: {
        [UNIQUE_JOB_TYPES]: new Set(["fulltime", "parttime"]),
      },
    };
    const $router = {
      push: jest.fn(),
    };
    const wrapper = mount(
      JobFiltersSidebarJobTypes,
      createConfig($store, $router)
    );
    await wrapper.find("[data-test='clickable-area']").trigger("click");
    const jobTypesLabels = wrapper.findAll("[data-test='job-type']");
    const jobTypes = jobTypesLabels.map((node) => node.text());
    expect(jobTypes).toEqual(["fulltime", "parttime"]);
  });

  describe("when user clicks checkbox", () => {
    it("communicates that user has selected checkbox for organization", async () => {
      const commit = jest.fn();
      const $store = {
        getters: {
          [UNIQUE_JOB_TYPES]: new Set(["fulltime", "parttime"]),
        },
        commit,
      };
      const $router = {
        push: jest.fn(),
      };
      const wrapper = mount(
        JobFiltersSidebarJobTypes,
        createConfig($store, $router)
      );
      await wrapper.find("[data-test='clickable-area']").trigger("click");

      const fulltimeInput = wrapper.find("[data-test='fulltime']");
      await fulltimeInput.setChecked();

      expect(commit).toHaveBeenCalledWith("ADD_SELECTED_JOB_TYPES", [
        "fulltime",
      ]);
    });

    it("navigates user to top level job results page", async () => {
      const push = jest.fn();
      const $store = {
        getters: {
          [UNIQUE_JOB_TYPES]: new Set(["fulltime", "parttime"]),
        },
        commit: jest.fn(),
      };
      const $router = { push };
      const wrapper = mount(
        JobFiltersSidebarJobTypes,
        createConfig($store, $router)
      );
      await wrapper.find("[data-test='clickable-area']").trigger("click");

      const fulltimeInput = wrapper.find("[data-test='fulltime']");
      await fulltimeInput.setChecked();

      expect(push).toHaveBeenCalledWith({ name: "JobResults" });
    });
  });
});
