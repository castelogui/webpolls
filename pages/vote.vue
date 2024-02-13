<template>
  <div class="w-full px-2">
    <ListItem v-if="poll?.id">
      {{ poll?.title }}
      <template #totais>{{
        poll.options.reduce((total, option) => total + option.score, 0)
      }}</template>
      <template #options>
        <div class="flex flex-wrap items-center mb-3">
          <div
            v-for="option in poll.options"
            :key="option.id"
            class="mb-2 mt-2 options"
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

      <template #actions>
        <div class="flex flex-wrap">
          <button
            class="p-1 bg-sky-400 text-white rounded m-1"
            @click="sharedPoll(poll.id)"
          >
            Compartilhar
          </button>
        </div>
      </template>
    </ListItem>
    <ListItem v-else-if="statusPoll.status">Carregando...</ListItem>
    <ListItem v-if="!statusPoll.status" class="bg-red-200"
      >Esta enquete não existe ou foi excluida</ListItem
    >
    <!-- Modal -->
    <div
      v-if="showModal.status"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white p-8 rounded-lg">
        <p>Compartilhar link:</p>
        <input
          id="linkPollShared"
          type="text"
          :value="linkShared.link"
          class="w-full border border-gray-300 rounded-md p-2 mt-2"
        />
        <button
          @click="copyLink()"
          class="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mr-3"
        >
          Abrir
        </button>
        <button
          @click="showModal.status = false"
          class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mt-4"
        >
          Fechar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const { getPoll, votePoll, pollsState } = usePolls();
const poll = pollsState();
let statusPoll = reactive({
  status: Boolean,
});
let showModal = reactive({ status: false });
let linkShared = reactive({ value: "", link: "" });

const id = route.query.id;

onMounted(() => {
  definePoll(id);
});

const definePoll = async (id) => {
  const pollGet = await getPoll(id);
  if (pollGet) {
    statusPoll.status = true;
  } else {
    statusPoll.status = false;
  }
};
const votePollOption = async (id) => {
  const pollOptionId = id;
  const pollId = poll.value.id;
  await votePoll(pollId, pollOptionId);
  definePoll(pollId);
};
const sharedPoll = (pollid) => {
  linkShared.value = pollid;
  linkShared.link = `localhost:3000/vote?id=${pollid}`;
  showModal.status = true;
};
const copyLink = () => {
  showModal.value = false;
  window.open(`/vote?id=${linkShared.value}`, "_blank");
};
</script>

<style>
.options {
  user-select: none;
}
</style>
