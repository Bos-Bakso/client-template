<template>
  <div class="content">
    <div class="md-layout">
      <!-- 2 -->
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-70"
      >
        <md-card>
          <md-card-header data-background-color="orange">
            <h4 class="title">Maps</h4>
            <p class="category">Realtime sales agents position</p>
          </md-card-header>
          <md-card-content>
            <!-- Maps placed here -->
            <Maps style="height: 550px;" ref="maps" />
          </md-card-content>
        </md-card>
      </div>

      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-30"
      >
        <md-card>
          <md-card-header data-background-color="blue">
            <h4 class="title">Sales Agents</h4>
            <p class="category">List of All Sales Agents</p>
          </md-card-header>
          <md-card-content>
            <!-- List Abang goes here -->
            <list-abang table-header-color="blue" @detail="detail"></list-abang>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import {
  StatsCard,
  NavTabsCard,
  NavTabsTable,
  OrderedTable
} from "@/components";

import Maps from "@/components/Maps";
import { TriggerRank } from "@/api/firebase";

import ListAbang from "../components/Tables/ListAbang";

export default {
  components: {
    StatsCard,
    NavTabsCard,
    NavTabsTable,
    OrderedTable,
    Maps,
    ListAbang
  },
  data: function() {
    return {
      showForm: false,
      searchtext: "",
      username: "",
      password: "",
      image: "",
      facebook: "",
      loading: false
    };
  },
  methods: {
    detail(loc) {
      this.$refs.maps.innerClick(loc);
    },
    addAbang() {
      this.showForm = true;
    },
    cancelAdd() {
      this.showForm = false;
    },
    handleimage() {
      this.image = this.$refs.image.files[0];
    },
    newAbang() {
      this.loading = true;
      let formData = new FormData();

      formData.append("username", this.username);
      formData.append("password", this.password);
      formData.append("facebook", this.facebook);
      formData.append("image", this.image);
      formData.append("role", "baso");

      this.$store.dispatch("addAbang", formData).then(_ => {
        this.loading = false;
        this.username = "";
        this.password = "";
        this.facebook = "";
        this.fetchTukangs();
        this.showForm = false;
        this.$toasted.show("New Abang Added", {
          theme: "outline",
          position: "top-right",
          duration: 4000,
          type: "success"
        });
      });
    },
    fetchTukangs() {
      this.$store.dispatch("fetchTukangs");
    }
  },
  created() {
    this.fetchTukangs();
  }
};
</script>
