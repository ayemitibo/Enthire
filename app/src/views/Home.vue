<template>
  <div>
    <vue-dropzone
      ref="myVueDropzone"
      id="dropzone"
      :options="dropzoneOptions"
      v-on:vdropzone-sending="sendingEvent"
    ></vue-dropzone>
  </div>
</template>
<script>
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import axios from 'axios'
export default {
  name: 'app',
  components: {
    vueDropzone: vue2Dropzone
  },
  data () {
    return {
      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        thumbnailWidth: 150,
        maxFilesize: 0.5,
        headers: { "My-Awesome-Header": "header value" }
      }
    }
  },
  methods: {
    async sendingEvent (file, xhr, formData) {
      try {
        formData.append('image', file);
        let apiRequest = await axios.post("upload-image", formData)
        let response = await apiRequest
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
