import { mount } from "@vue/test-utils";
import Accordion from "@/components/Shared/Accordion.vue";

describe("Accordion", () => {
  const createConfig = (config = {}) => ({
    global: {
      stubs: {
        FontAwesomeIcon: true,
      },
    },
    props: {
      header: "Test Header",
    },
    slots: {
      default: "<h3>Nested child</h3>",
    },
    ...config,
  });

  it("renders accordion", async () => {
    const slots = {
      default: "<h3>Nested child</h3>",
    };
    const config = { slots };
    const wrapper = mount(Accordion, createConfig(config));
    expect(wrapper.text()).not.toMatch("Nested child");
    const clickableArea = wrapper.find("[data-test='clickable-area']");
    await clickableArea.trigger("click");
    expect(wrapper.text()).toMatch("Nested child");
  });

  describe("when we do not provide custom child content", () => {
    it("renders default content", async () => {
      const wrapper = mount(Accordion, createConfig({ slots: {} }));
      const clickableArea = wrapper.find("[data-test='clickable-area']");
      await clickableArea.trigger("click");
      expect(wrapper.text()).toMatch("Whoops, someone forgot to poppulate me!");
    });
  });
});
