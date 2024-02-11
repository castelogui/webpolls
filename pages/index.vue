<template>
  <div class="w-full px-2">
    <ListItem v-for="poll in polls" :key="poll.id">
      {{ poll.title }}
      <template #options>
        <div class="flex flex-wrap items-center mb-3">
          <div
            v-for="option in poll.options"
            :key="option.id"
            class="mb-2 mt-2"
          >
            <span
              class="w-20 rounded-s-lg bg-slate-200 text-sky-900 p-2 ml-5"
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
    </ListItem>
  </div>
</template>

<script setup>
const router = useRouter();
const { deletePoll, fetchPollList } = usePolls();
let polls = await fetchPollList();

const editPoll = (id) => {
  router.push({ path: "/form", query: { id } });
};
const removePoll = async (id) => {
  await deletePoll(id);
};
const sharedPoll = (id) => {
  router.push({ path: "/vote", query: { id } });
};
</script>
