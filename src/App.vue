<script setup>
import {RouterView} from 'vue-router'
</script>

<template>
  <div id="headerImg" class="flex flex-col items-center relative h-screen">

    <div class="absolute inset-0 z-0">
      <div class="relative flex flex-col items-center">
        <img src="/hero-image-wr.jpg" alt="header" class="absolute w-full">
        <img src="/Logo.svg" alt="logo" class="absolute mt-[2rem] md:mt-[5rem] lg:mt-[9rem]">
      </div>
    </div>

    <div id="contenedor" class="border border-color2 mt-[4rem] md:mt-[12rem]  xl:mt-[17rem] mx-[1rem] md:mx-[2rem] xl:mx-[5rem] w-max-[85rem] rounded-xl bg-color1 absolute z-10 text-white">
      <RouterView :key="$route.fullPath" />
    </div>
  </div>
  <div class="mt-[53rem] md:mt-[50rem] lg:mt-[55rem]"></div>

</template>


<style></style>
