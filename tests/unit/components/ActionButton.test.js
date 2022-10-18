import { mount } from "@vue/test-utils";
import ActionButton from "@/components/ActionButton.vue";

describe("ActionButton", () => {
  it("Renders text", () => {
    const wrapper = mount(ActionButton, {
      props: {
        text: "I'm clickable",
        type: "primary",
      },
    });
    expect(wrapper.text()).toMatch("I'm clickable");
  });
  it("Applies style to button", () => {
    const wrapper = mount(ActionButton, {
      props: {
        text: "I'm clickable",
        type: "primary",
      },
    });
    const button = wrapper.find("button");
    expect(button.classes("primary")).toBe(true);
  });
});
