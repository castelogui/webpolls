<template>
  <div class="w-full px-2">
    <ListItem>
      {{ poll.title }}
      <template #options>
        <div class="flex flex-wrap items-center mb-3">
          <div
            v-for="option in poll.options"
            :key="option.id"
            class="mb-2 mt-2"
          >
            <span
              class="w-20 rounded-s-lg bg-slate-200 text-sky-900 p-2 ml-5 hover:text-gray-50 hover: hover:bg-slate-600 active:bg-violet-700 hover:cursor-pointer"
              @click="votePollOption(option.id)"
              >{{ option.title }}</span
            >
            <span
              class="w-20 text-center bg-slate-400 rounded-e-lg text-stone-50 p-2 font-semibold"
              >{{ option.score }}</span
            >
          </div>
        </div>
      </template>
      <!---
        <template #actions>
          <div class="flex flex-wrap">
            <button
            class="p-1 bg-sky-400 text-white rounded m-1"
            @click="removePoll(poll.id)"
            >
            Compartilhar
          </button>
          <button class="p-1 bg-emerald-300 rounded m-1" @click="editPoll(poll.id)">
            Editar
          </button>
          <button
          class="p-1 bg-red-400 text-white rounded m-1"
          @click="removePoll(poll.id)"
          >
          Excluir
          </button>
         </div>
        </template>
        -->
    </ListItem>
  </div>
</template>

<script setup>
const router = useRouter();
const route = useRoute();
const { getPoll, votePoll } = usePolls();
let poll = reactive({
  id: "",
  title: "",
  options: [],
});
onMounted(async () => {
  poll.id = route.query.id;
  if (poll.id) {
    const pollGet = await getPoll(poll.id);

    poll.id = pollGet.id;
    poll.title = pollGet.title;
    pollGet.options.map((option) => {
      poll.options.push(option);
    });
  }
});

const votePollOption = async (id) => {
  const pollOptionId = id;
  const pollId = poll.id;
  await votePoll(pollId, pollOptionId );
  router.push("/");
};

</script>
