<template>
  <header class="text-gray-600 body-font">
    <div
      class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center"
    >
      <a
        class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          class="w-10 h-10 text-white p-2 bg-blue-700 rounded-full"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
          ></path>
        </svg>
        <span class="ml-3 text-xl">WebPolls</span>
      </a>
      <nav
        class="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center"
      >
        <NuxtLink class="mr-5 hover:text-gray-900" to="/">Home</NuxtLink>

      </nav>
      <button
      @click="addPoll"
        class=" p-2  border b-blue-200 rounded bg-blue-500 text-white flex items-center justify-center"
      >
        Add Poll
      </button>
    </div>
  </header>
</template>


<script setup>
const router = useRouter();
const addPoll = () => {
  router.push("/form");
};
</script>
