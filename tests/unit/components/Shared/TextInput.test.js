import { mount } from "@vue/test-utils";
import TextInput from "@/components/Shared/TextInput.vue";

describe("TextInput", () => {
  it("Communicates that user has entered character", () => {
    const wrapper = mount(TextInput, {
      modelValue: "",
    });
    const input = wrapper.find("input");
    input.setValue("N");
    input.setValue("NY");
    input.setValue("NYC");
    const messages = wrapper.emitted()["update:modelValue"];
    expect(messages).toEqual([["N"], ["NY"], ["NYC"]]);
  });
});
