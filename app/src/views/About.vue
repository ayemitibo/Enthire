<template>
  <div class="cart-table">
    <table>
      <thead>
        <tr>
          <th>Image</th>
          <th>Delete</th>
          <th>
            <i class="ti-close"></i>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(image,index) in images" :key="index">
          <td class="cart-pic first-row" style="width : 19%">
            <img :src="image.image_url" alt style="padding : 20px" />
          </td>
          <td class="close-td first-row">
            <i class="delete" @click="deleteImage(image)">X</i>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data () {
    return {
      images: []
    }
  },
  methods: {
    async deleteImage (image) {
      try {
        let apiRequest = await axios.get(`delete-image/${image.id}`)
        if (apiRequest.data.message) {
          await this.getAll()
        }
      } catch (error) {

      }
    },
    async getAll () {
      try {
        let apiRequest = await axios.get('all-images')
        this.images = apiRequest.data.data
      } catch (error) {

      }
    }
  },
  async mounted () {
    try {
      await this.getAll()
    } catch (error) {

    }
  }
}
</script>
<style scoped>
.delete {
  font-size: 30px;
  font-weight: 700;
  font-style: initial;
  cursor: pointer;
}
</style>