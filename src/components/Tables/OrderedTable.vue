<template>
  <div>
    <md-table v-model="abangs" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item, index }">
        <md-table-cell md-label="Rank">{{ index + 1 }}</md-table-cell>
        <md-table-cell md-label="Sales"
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
        <md-table-cell md-label="Bowls">{{ item.totalBakso }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: "ordered-table",
  props: ["tableHeaderColor"],
  computed: {
    abangs() {
      return this.$store.state.rankAbang;
    }
  }
};
</script>
