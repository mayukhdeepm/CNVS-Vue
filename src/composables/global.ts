import type { GraphModel, io } from '@tensorflow/tfjs'
// import { isWebGPUSupported } from '~/utils/gpu';
// import '@tensorflow/tfjs-backend-webgpu';
import '@tensorflow/tfjs-backend-webgl';

export * as tf from '@tensorflow/tfjs'

export const model: {
  net: GraphModel<string | io.IOHandler> | null
} = {
  net: null,
}
export const inputShape = ref<number[]>([1, 0, 0, 3])
// model configs
export const modelName = 'detectioncoin'

export const tfjsLoading = ref(true)
export const tfjsProgress = ref(0)
export const tfjsSpinTip = computed(() => {
  return `Powering On... ${(tfjsProgress.value * 100).toFixed(2)}%`
})

export const globalActiveKey = ref('1')
