<script setup lang="ts">
import { globalActiveKey } from '~/composables'

onMounted(() => {
  loadTfModels()
})
</script>

<!-- <template>
  <div>
    <a-typography :style="{ marginTop: '-40px' }">
      <a-typography-title>
        CNVS Real Time
      </a-typography-title>
      <ASpin :loading="tfjsLoading" class="w-960px mx-auto" :tip="tfjsSpinTip">
        <a-tabs v-model:active-key="globalActiveKey" lazy-load>
          <a-tab-pane key="1" title="WebRTC">
            <TabsWebRTC />
          </a-tab-pane>
          <a-tab-pane key="2" title="Video">
            <TabsVideo />
          </a-tab-pane>
          <a-tab-pane key="3" title="Picture">
            <TabsPicture />
          </a-tab-pane> 
          <a-tab-pane key="4" title="WebCam">
            <TabsWebCam />
          </a-tab-pane>
        </a-tabs>
      </ASpin>
    </a-typography>
  </div>
</template> -->

<template>
  <div>
    <a-typography class="text-center">
      <!-- <a-typography-title>
        CNVS Real Time
      </a-typography-title> -->
        <TabsWebCam />
        <ASpin :loading="tfjsLoading" class="mx-auto text-6xl" :tip="tfjsSpinTip" style="display: block; margin-top: 40vh; transform: translateY(-50%);">
          <a-tabs v-model:active-key="globalActiveKey" lazy-load>
          </a-tabs>
        </ASpin>
    </a-typography>
  </div>
</template>

