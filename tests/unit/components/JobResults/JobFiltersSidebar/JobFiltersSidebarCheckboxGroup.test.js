import { useStore } from "vuex";
jest.mock("vuex");

import { useRouter } from "vue-router";
jest.mock("vue-router");

import { mount } from "@vue/test-utils";

import JobFiltersSidebarCheckboxGroup from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue";

describe("JobFiltersSidebarCheckboxGroup", () => {
  const createConfig = (props) => ({
    global: {
      stubs: {
        FontAwesomeIcon: true,
      },
    },
    props: {
      header: "test header",
      uniqueValues: new Set(["val1", "val2"]),
      mutation: "testmutation",
      ...props,
    },
  });

  it("renders unique list of job types for filtering jobs", async () => {
    const props = { uniqueValues: new Set(["val1", "val2"]) };
    const wrapper = mount(JobFiltersSidebarCheckboxGroup, createConfig(props));
    await wrapper.find("[data-test='clickable-area']").trigger("click");
    const jobTypesLabels = wrapper.findAll("[data-test='value']");
    const jobTypes = jobTypesLabels.map((node) => node.text());
    expect(jobTypes).toEqual(["val1", "val2"]);
  });

  describe("when user clicks checkbox", () => {
    it("communicates that user has selected checkbox for value", async () => {
      const commit = jest.fn();
      useStore.mockReturnValue({ commit });
      useRouter.mockReturnValue({ push: jest.fn() });
      const props = {
        mutation: "MUTATION",
        uniqueValues: new Set(["fulltime"]),
      };
      const wrapper = mount(
        JobFiltersSidebarCheckboxGroup,
        createConfig(props)
      );
      await wrapper.find("[data-test='clickable-area']").trigger("click");

      const fulltimeInput = wrapper.find("[data-test='fulltime']");
      await fulltimeInput.setChecked();

      expect(commit).toHaveBeenCalledWith("MUTATION", ["fulltime"]);
    });

    it("navigates user to top level job results page", async () => {
      const props = {
        uniqueValues: new Set(["fulltime"]),
      };

      useStore.mockReturnValue({ commit: jest.fn() });

      const push = jest.fn();
      useRouter.mockReturnValue({ push });

      const wrapper = mount(
        JobFiltersSidebarCheckboxGroup,
        createConfig(props)
      );
      await wrapper.find("[data-test='clickable-area']").trigger("click");

      const fulltimeInput = wrapper.find("[data-test='fulltime']");
      await fulltimeInput.setChecked();

      expect(push).toHaveBeenCalledWith({ name: "JobResults" });
    });
  });
});
