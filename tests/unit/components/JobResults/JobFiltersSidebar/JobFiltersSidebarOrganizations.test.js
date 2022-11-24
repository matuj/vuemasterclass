import { mount } from "@vue/test-utils";

import JobFiltersSidebarOrganizations from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarOrganizations.vue";
import { UNIQUE_ORGANIZATIONS } from "@/store/constants";

describe("JobFiltersSidebarOrganizations", () => {
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

  it("renders unique list of organizations for filtering jobs", async () => {
    const $store = {
      getters: {
        [UNIQUE_ORGANIZATIONS]: new Set(["google", "amazon"]),
      },
    };
    const $router = {
      push: jest.fn,
    };
    const wrapper = mount(
      JobFiltersSidebarOrganizations,
      createConfig($store, $router)
    );
    await wrapper.find("[data-test='clickable-area']").trigger("click");
    const organizationsLabels = wrapper.findAll("[data-test='organization']");
    const organizations = organizationsLabels.map((node) => node.text());
    expect(organizations).toEqual(["google", "amazon"]);
  });

  describe("when user clicks checkbox", () => {
    it("communicates that user has selected checkbox for organization", async () => {
      const commit = jest.fn();
      const $store = {
        getters: {
          [UNIQUE_ORGANIZATIONS]: new Set(["google", "amazon"]),
        },
        commit,
      };
      const $router = {
        push: jest.fn(),
      };
      const wrapper = mount(
        JobFiltersSidebarOrganizations,
        createConfig($store, $router)
      );
      await wrapper.find("[data-test='clickable-area']").trigger("click");

      const googleInput = wrapper.find("[data-test='google']");
      await googleInput.setChecked();

      expect(commit).toHaveBeenCalledWith("ADD_SELECTED_ORGANIZATIONS", [
        "google",
      ]);
    });

    it("navigates user to top level job results page", async () => {
      const push = jest.fn();
      const commit = jest.fn();
      const $store = {
        getters: {
          [UNIQUE_ORGANIZATIONS]: new Set(["google", "amazon"]),
        },
        commit,
      };
      const $router = {
        push,
      };
      const wrapper = mount(
        JobFiltersSidebarOrganizations,
        createConfig($store, $router)
      );
      await wrapper.find("[data-test='clickable-area']").trigger("click");

      const googleInput = wrapper.find("[data-test='google']");
      await googleInput.setChecked();

      expect(push).toHaveBeenCalledWith({ name: "JobResults" });
    });
  });
});
