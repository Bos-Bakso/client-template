<template>
  <div>
    <md-table v-model="abangs" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label=""
          ><img
            :src="item.image"
            alt
            style="object-fit: cover; width: 25px;
  height: 25px;
  border-radius: 50%;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14); margin-right:10px;"
          />
          {{ item.username }}</md-table-cell
        >
        <md-table-cell md-label=""
          ><div class="detail" @click="detail(item.latitude, item.longitude)">
            <img src="@/assets/maps.png" style="width:20px" alt="" /></div
        ></md-table-cell>
        <md-table-cell md-label="">
          <a :href="'https://m.me/' + item.facebook" target="_blank">
            <div>
              <img src="@/assets/msg.png" style="width:20px" alt="" /></div></a
        ></md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import { latLng } from "leaflet";

export default {
  name: "ordered-table",
  props: ["tableHeaderColor"],
  computed: {
    abangs() {
      return this.$store.state.tukangs;
    }
  },
  methods: {
    detail(lat, lng) {
      let loc = latLng(lat, lng);
      this.$emit("detail", loc);
    }
  }
};
</script>
<style>
.detail {
  cursor: pointer;
}
</style>
