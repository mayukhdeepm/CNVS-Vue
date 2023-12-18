<script lang="ts" setup>
// import {numberTextsForCurrentFrame} from "~/utils/renderBox";
const canvasRef = ref()
const videoRef = ref<HTMLVideoElement>()
const currentCamera = ref<string>()
//   const clickCount = ref(0);
// const valuesArray = ref<string[]>([]);
const { videoInputs: cameras } = useDevicesList({
  requestPermissions: true,
  onUpdated() {
    if (!cameras.value.find(i => i.deviceId === currentCamera.value))
      currentCamera.value = cameras.value[0]?.deviceId
  },
})

// const { stream, enabled } = useUserMedia({
//   constraints: { video: { deviceId: currentCamera.value } },
// })
const { stream, enabled } = useUserMedia({
  constraints: {
    video: {
      deviceId: currentCamera.value,
      facingMode: 'environment', // 'environment' is used for the back camera
      // frameRate: { ideal: 2, max: 2 }
    }
  },
});
watchEffect(() => {
  if (videoRef.value)
    videoRef.value.srcObject = stream.value!
})
watch(() => globalActiveKey.value, () => {
  videoRef.value?.pause()
})
function onVideoPlayDetect() {
  //
  detectVideo(videoRef.value!, canvasRef.value)
}

  function captureAndDownloadImage() {
  if (videoRef.value && canvasRef.value) {
    const canvas = canvasRef.value;
    const context = canvas.getContext('2d');
    if (context && videoRef.value.readyState === 4) {
      // Draw the current frame of the video on the canvas
      context.drawImage(videoRef.value, 0, 0, canvas.width, canvas.height);
      // Convert the canvas content to data URL (image format)
      const imageUrl = canvas.toDataURL('image/png');
      // Create a temporary link element
      const downloadLink = document.createElement('a');
      downloadLink.href = imageUrl;
      // Set the download attribute with a default file name
      downloadLink.download = 'captured-image.png';
      // Append the link to the document and trigger the download
      document.body.appendChild(downloadLink);
      downloadLink.click();
      // Remove the temporary link element
      document.body.removeChild(downloadLink);
    }
  }
}

</script>



<template>
  <div class="flex flex-col justify-start">
    <ASpace class="mb-5 md:mb-10" style="position:relative; left: 41%;">
      <AButton @click="enabled = !enabled">
        {{ enabled ? 'Stop' : 'Start' }}
      </AButton>
    </ASpace>
    <div>
    </div>
    <div v-show="enabled" class="relative h-full w-full">
      <video ref="videoRef" class="h-full w-full md:h-full w-full bg-coontain" autoplay playsinline @play="onVideoPlayDetect"></video>
      <img src="https://www.freeiconspng.com/thumbs/grid-png/transparent-grid-overlay-png-23.png"
        alt=""
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        :width="inputShape[1]"
        :height="inputShape[2]"
      />
      <canvas ref="canvasRef" class="absolute -top-4 w-full h-full pointer-events-none" :width="inputShape[1]" :height="inputShape[2]"></canvas>
      <AButton @click="captureAndDownloadImage" style="position: relative; bottom: 10%;">
        Capture & Download Image
      </AButton>
    </div>
  </div>
</template>



