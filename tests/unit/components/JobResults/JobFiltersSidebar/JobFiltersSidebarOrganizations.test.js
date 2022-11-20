import { mount } from "@vue/test-utils";

import JobFiltersSidebarOrganizations from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarOrganizations.vue";
import { UNIQUE_ORGANIZATIONS } from "@/store/constants";

describe("JobFiltersSidebarOrganizations", () => {
  const createConfig = ($store) => ({
    global: {
      mocks: {
        $store,
      },
      stubs: {
        FontAwesomeIcon: true,
      },
    },
  });

  it("renders unique list of organizations for filtering jobs", async () => {
    const $store = {
      getters: {
        [UNIQUE_ORGANIZATIONS]: new Set(["google", "amazon"]),
      },
    };
    const wrapper = mount(JobFiltersSidebarOrganizations, createConfig($store));
    await wrapper.find("[data-test='clickable-area']").trigger("click");
    const organizationsLabels = wrapper.findAll("[data-test='organization']");
    const organizations = organizationsLabels.map((node) => node.text());
    expect(organizations).toEqual(["google", "amazon"]);
  });

  it("communicates that user has selected checkbox for organization", async () => {
    const commit = jest.fn();
    const $store = {
      getters: {
        [UNIQUE_ORGANIZATIONS]: new Set(["google", "amazon"]),
      },
      commit,
    };
    const wrapper = mount(JobFiltersSidebarOrganizations, createConfig($store));
    await wrapper.find("[data-test='clickable-area']").trigger("click");

    const googleInput = wrapper.find("[data-test='google']");
    await googleInput.setChecked();

    expect(commit).toHaveBeenCalledWith("ADD_SELECTED_ORGANIZATIONS", [
      "google",
    ]);
  });
});
