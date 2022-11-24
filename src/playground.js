const { computed, reactive, toRefs } = require("vue");

const person = reactive({
  firstname: "James",
  lastname: "Matu",
});
const { firstname, lastname } = toRefs(person);

const title = computed(() => `${firstname.value} ${lastname.value} the Great.`);

console.log(title.value);

lastname.value = "Kimaru";
console.log(title.value);
