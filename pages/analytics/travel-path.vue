<template>
  <div class="flex flex-wrap">
    <SidebarNav />

    <div class="w-full lg:w-4/5 px-5 pt-2 bg-gray-200">
      <div class="pl-2">
        <p class="text-2xl font-bold">
          COVID-19 Travel Path
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import SidebarNav from "@/components/Analytics/SidebarNav"

export default {
  components: { SidebarNav }
}
</script>
