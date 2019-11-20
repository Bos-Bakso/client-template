<template>
  <div class="content">
    <div class="md-layout">
      <!-- 2 -->
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-70"
      >
        <md-card>
          <md-card-header data-background-color="green">
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
          <md-card-header data-background-color="blue" style="height: 100%;">
            <div
              style="display: flex; justify-content: space-between; width: 100%"
            >
              <div style="display: flex; flex-direction: column">
                <h4 v-if="showForm === false" class="title">Sales Agents</h4>
                <h4 v-else class="title">Add New Agent</h4>

                <p v-if="showForm === false" class="category">
                  List of All Sales Agents
                </p>
                <p v-else class="category">Fill out the form</p>
              </div>

              <div>
                <!-- <transition name="fade"> -->
                <div v-if="showForm">
                  <md-button class="md-warning" @click="cancelAdd"
                    >Cancel</md-button
                  >
                </div>
                <!-- </transition> -->
                <!-- <transition name="fade"> -->
                <div v-if="showForm === false">
                  <md-button class="md-warning" @click="goAddAbang"
                    >Add +</md-button
                  >
                </div>
                <!-- </transition> -->
              </div>
              <div></div>
            </div>
          </md-card-header>
          <md-card-content>
            <!-- List Abang goes here -->

            <list-abang
              v-if="showForm === false"
              table-header-color="blue"
              @detail="detail"
            ></list-abang>
            <div v-else>
              <form @submit.prevent="newAbang" class="myForm">
                <md-field>
                  <md-input
                    class="form-control"
                    v-model="username"
                    type="text"
                    placeholder="Username"
                  ></md-input>
                </md-field>
                <md-field>
                  <md-input
                    class="form-control"
                    v-model="password"
                    type="password"
                    placeholder="Password"
                  ></md-input>
                </md-field>

                <md-field>
                  <md-input
                    class="form-control"
                    v-model="facebook"
                    type="text"
                    placeholder="Facebook"
                  ></md-input>
                </md-field>
                <form
                  id="img-form"
                  action="/profile"
                  method="post"
                  enctype="multipart/form-data"
                >
                  <md-field>
                    <input
                      type="file"
                      ref="image"
                      accept="image/*"
                      v-on:change="handleimage"
                      required
                    />
                  </md-field>
                </form>
                <md-button
                  v-if="loading === false"
                  @click.prevent="newAbang"
                  type="submit"
                  class="md-info"
                  >Submit</md-button
                >
                <md-button v-else type="submit" @click.prevent class="md-info">
                  <i
                    class="fas fa-spinner fa-pulse"
                    style="font-size: 1.5rem;"
                  ></i>
                </md-button>
              </form>
            </div>
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
    goAddAbang() {
      this.showForm = true;
    },
    cancelAdd() {
      this.username = "";
      this.password = "";
      this.password = "";
      this.image = "";
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
