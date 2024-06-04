<template>
  <video src="" ref="videoRef"></video>
  <el-button @click="openLive" type="primary">开始录制</el-button>
</template>

<script setup>
import { ref, computed, onMounted, reactive, watch } from 'vue'
const videoRef = ref(null);
console.log('live', videoRef)
const openLive = () => {
  const constraints = { audio: true, video: { width: 1280, height: 720 } };
  navigator.mediaDevices.getDisplayMedia(constraints).then(function(stream) {
    console.log(stream, 'what');
    videoRef.value.srcObject = stream;
    videoRef.value.play()
    // 成功获取到屏幕流
  })
    .catch(function(error) {
      // 处理错误
    });
}
</script>

<style scoped lang="scss">
video {
  width: 100%;
  height: 700px;
}
</style>