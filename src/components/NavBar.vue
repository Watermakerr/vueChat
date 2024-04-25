<template>
  <div
    class="xs:w-full md:w-11 md:h-full md:py-7 xs:py-5 px-5 flex xs:flex-row md:flex-col items-center transition-all duration-500 xs:order-1 md:-order-none">
    <div class="mb-7 h-7 xs:hidden md:block">
      <a href="#mainContent" title="Skip to main content" class="outline-none absolute right-[625rem]"><svg
          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          aria-hidden="true" data-slot="icon" class="w-7 h-6 text-indigo-300">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z">
          </path>
        </svg></a><button aria-label="avian logo" class="outline-none">
        <img src="" class="w-8 h-7 opacity-40" alt="white bird logo" />
      </button>
    </div>
    <div class="grow">
      <nav>
        <ul class="xs:flex md:block xs:justify-between xs:items-center">
          <li>
            <NavLink icon="BellIcon" title="Notifications" :notifications="notifications" />
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup>
import {
  BellIcon,
  ChatBubbleOvalLeftIcon,
  Cog6ToothIcon,
  MoonIcon,
  PhoneIcon,
  SunIcon,
  UserIcon
} from '@heroicons/vue/24/solid'
import NavLink from './NavLink.vue'
</script>

<style lang="scss" scoped></style>
