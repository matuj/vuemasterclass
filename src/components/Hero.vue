<template>
  <main>
    <section class="flex flex-col h-screen pt-10 pb-20">
      <div class="grid grid-cols-12">
        <div class="col-start-1 col-span-1 border border-brand-gray-1">
          1 column
        </div>
        <div class="col-start-2 col-span-5 border border-brand-gray-1">
          <Headline />
        </div>
        <div class="col-start-7 col-span-5 border border-brand-gray-1">
          5 Columns
        </div>
        <div class="col-start-12 col-span-1 border border-brand-gray-1">
          1 Columns
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import Headline from "@/components/Headline.vue";

export default {
  name: "Hero",
  components: {
    Headline,
  },
  beforeCreate() {
    console.log("Before create");
  },
};
</script>
