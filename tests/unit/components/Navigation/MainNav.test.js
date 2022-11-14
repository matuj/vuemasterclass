import { shallowMount, RouterLinkStub } from "@vue/test-utils";
import MainNav from "@/components/Navigation/MainNav.vue";

describe("MainNav", () => {
  const createConfig = ($store) => ({
    global: {
      mocks: {
        $store,
      },
      stubs: {
        "router-link": RouterLinkStub,
      },
    },
  });

  it("Displays company name", () => {
    const $store = { state: { isLoggedIn: false } };
    const wrapper = shallowMount(MainNav, createConfig($store));
    expect(wrapper.text()).toMatch("Dream Careers");
  });

  it("Displays menu items for navigation", () => {
    const $store = { state: { isLoggedIn: false } };
    const wrapper = shallowMount(MainNav, createConfig($store));
    const navMenuItems = wrapper.findAll("[data-test='main-nav-list-item']");
    const navMenuTexts = navMenuItems.map((navMenuItem) => navMenuItem.text());
    expect(navMenuTexts).toEqual([
      "Teams",
      "Locations",
      "Life at Dream",
      "How we hire",
      "Students",
      "Jobs",
    ]);
  });

  describe("When user is logged out", () => {
    it("Prompts user to sign in", () => {
      const $store = { state: { isLoggedIn: false } };
      const wrapper = shallowMount(MainNav, createConfig($store));
      const loginButton = wrapper.find("[data-test='login-button']");
      expect(loginButton.exists()).toBe(true);
    });
    it("issues call to vuex to login user", async () => {
      const commit = jest.fn();
      const $store = { state: { isLoggedIn: false }, commit };
      $store.commit = commit;
      const wrapper = shallowMount(MainNav, createConfig($store));
      const loginButton = wrapper.find("[data-test='login-button']");
      await loginButton.trigger("click");
      expect(commit).toHaveBeenCalledWith("LOGIN_USER");
    });
  });

  describe("When user is logged in", () => {
    it("Displays user profile picture", () => {
      const $store = { state: { isLoggedIn: true } };
      const wrapper = shallowMount(MainNav, createConfig($store));
      let profileImage = wrapper.find("[data-test='profile-image']");
      expect(profileImage.exists()).toBe(true);
    });
    it("Displays subnavigation menu with additional information", () => {
      const $store = { state: { isLoggedIn: true } };
      const wrapper = shallowMount(MainNav, createConfig($store));
      let subnav = wrapper.find("[data-test='subnav']");
      expect(subnav.exists()).toBe(true);
    });
  });
});
