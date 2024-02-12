<template>
  <div>
    <form action="">
      <UIInput label="Title" type="text" v-model="poll.title" />
      <div v-if="poll.id">
        <div v-for="option in options" :key="option.id">
          <UIInput label="Options" type="text" v-model="option.title" />
        </div>
      </div>
      <UIInput
        v-else-if="!poll.id"
        label="Options"
        type="text"
        v-model="option.title"
      />
      <UIButton @click="savePoll">Salvar Enquete</UIButton>
    </form>
  </div>
</template>

<script setup>
const { createPoll, getPoll, updatePoll } = usePolls();
const router = useRouter();
const route = useRoute();

const poll = reactive({
  id: "",
  title: "",
});
const options = reactive([]);
const option = reactive({
  title: "",
});

onMounted(async () => {
  poll.id = route.query.id;
  if (poll.id) {
    const pollGet = await getPoll(poll.id);

    poll.id = pollGet.id;
    poll.title = pollGet.title;
    pollGet.options.map((option) => {
      options.push(option);
    });
  }
});

const savePoll = async () => {
  if (poll.id) {
    const title = poll.title;
    const pollUpdate = { title, options };
    await updatePoll(poll.id, pollUpdate);
  } else {
    options.title = option.title;
    const title = poll.title;
    const pollCreate = await createPoll({ title, options });
    console.log(pollCreate);
  }

  router.push("/");
};
</script>
