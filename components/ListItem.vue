<template>
  <div class="bg-emerald-50 m-4 shadow-md rounded-md p-4">
    <div class="columns">
      <div class="flex flex-nowrap column">
        <h2 class="w-full text-lg font-bold mb-2">
          <slot />
        </h2>
        <div class="flex items-center">
          <svg
            class="w-5 h-5 mr-1 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 10V3m6 0v7m-3-4v4m-6 7h12M5 21v-3a2 2 0 012-2h10a2 2 0 012 2v3"
            ></path>
          </svg>
          <span class="text-gray-500"><slot name="totais" /></span>
        </div>
      </div>
    </div>
    <div>
      <slot name="options" />
    </div>
    <div class="flex justify-end space-x-2">
      <slot name="actions" />
    </div>
  </div>
</template>
