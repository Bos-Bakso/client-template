<template>
  <div class="content">
    <div class="md-layout">
      <!-- 2 -->
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
      >
        <md-card>
          <md-card-header data-background-color="blue">
             <div
              style="display: flex; justify-content: space-between; width: 100%"
            >
              <div style="display: flex; flex-direction: column">
                <h4 v-if="showForm === false" class="title">Service Agents</h4>
                <h4 v-else class="title">Add New Agent</h4>

                <p v-if="showForm === false" class="category">
                  List of All Service Agents
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
            <div v-if="showForm">

              
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
            <list-tukang-service v-else
              table-header-color="blue"
            ></list-tukang-service>
          </md-card-content>
        </md-card>
      </div>

      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
      >
        <md-card>
          <md-card-header data-background-color="red">
            <h4 class="title">Unsolved Services</h4>
            <p class="category">List of All Unsolved Services</p>
          </md-card-header>
          <md-card-content>
            <!-- List Abang goes here -->
            <div>
              <md-table v-model="unsolvedService" :table-header-color="'red'">
                <md-table-row slot="md-table-row" slot-scope="{ item }">
 <md-table-cell md-label="">
 <img
                      :src="icon[item.problem]"
                      alt
                      style="object-fit: cover; width: 30px; height:30px;
  border-radius: 50%;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);"
                    />
</md-table-cell>
                  <md-table-cell md-label="">
                   
                    <div style="text-align:left">
                    {{ item.problem }}
                    </br>
                    <small>{{ new Date(item.createdAt).toDateString() }}</small>
                    </div>
                  </md-table-cell>

                  <md-table-cell md-label="">
 <img
                      :src="item.tukangBasoId.image"
                      alt
                      style="object-fit: cover; width: 30px; height:30px;
  
  border-radius: 50%;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);"
                    />
</md-table-cell>

 <md-table-cell md-label="">
          <a :href="'https://m.me/' + item.facebook" target="_blank">
            <div>
              <img src="@/assets/msg.png" style="width:20px" alt="" /></div></a
        ></md-table-cell>
                </md-table-row>
              </md-table>
            </div>
          </md-card-content>
        </md-card>
      </div>

      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
      >
         <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">Solved Services</h4>
            <p class="category">List of All Solved Services</p>
          </md-card-header>
          <md-card-content>
            <!-- List Abang goes here -->
            <div>
              <md-table v-model="solvedService" :table-header-color="'green'">
                <md-table-row slot="md-table-row" slot-scope="{ item }">
 <md-table-cell md-label="">
 <img
                      :src="icon[item.problem]"
                      alt
                      style="object-fit: cover; width: 30px; height:30px;
  border-radius: 50%;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);"
                    />
</md-table-cell>
                  <md-table-cell md-label="">
                   
                    <div style="text-align:left">
                    {{ item.problem }}
                    </br>
                    <small>{{ new Date(item.createdAt).toDateString() }}</small>
                    </div>
                  </md-table-cell>

                  <md-table-cell md-label="">
 <img
                      :src="item.tukangBasoId.image"
                      alt
                      style="object-fit: cover; width: 30px; height:30px;
  
  border-radius: 50%;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);"
                    />
</md-table-cell>

                </md-table-row>
              </md-table>
            </div>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import { TriggerNotif } from "@/api/firebase";
import { mapState } from "vuex";

import ListTukangService from "@/components/Tables/ListTukangService";

export default {
  components: {
    ListTukangService
  },
  data() {
    return {
      isLoading: false,
      loadingForm: false,
      showForm: false,
      username: "",
      password: "",
      facebook: "",
      loading: false,
      //   abangService : this.$store.state.abangService
      icon: {
        "Police Issue": require(`../../assets/service/police.png`),
        "Tire Issue": require(`../../assets/service/ban.png`),
        "Less Ingredient": require(`../../assets/service/sauce.png`),
        "Low Battery": require(`../../assets/service/battery.png`),
        Medice: require(`../../assets/service/medice.png`),
        "Edit Profile": require(`../../assets/service/user.png`),
        Service: require(`../../assets/service/teknik.png`),
        "Gas Issue": require(`../../assets/service/gas.png`)
      }
    };
  },
  created() {
    this.fetchAbangService();
    this.fetchService();
  },
  methods: {
    fetchService() {
      this.$store.dispatch("fetchService");
    },
    fetchAbangService() {
      this.$store.dispatch("fetchAbangService");
    },
    goAddAbang() {
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
      formData.append("facebook", this.facebook);
      formData.append("password", this.password);
      formData.append("image", this.image);
      formData.append("role", "service");

      this.$store
        .dispatch("addAbangService", formData)
        .then(data => {
          console.log("helloo");
          this.loading = false;
          this.fetchAbangService();
          this.username = "";
          this.password = "";
          this.facebook = "";
          this.showForm = false;
          this.$toasted.show("new service agent succesfully created", {
            theme: "bubble",
            position: "bottom-right",
            duration: 4000,
            type: "success"
          });
        })
        .catch(err => {
          this.loading = false;
          this.$toasted.show("Invalid input, create service agent failed", {
            theme: "bubble",
            position: "bottom-right",
            duration: 4000,
            type: "error"
          });
        });
    }
  },
  created() {
    TriggerNotif.onSnapshot(querySnapshot => {
      this.fetchService();
      this.fetchAbangService();
    });
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
    this.isLoading = true;
    this.fetchService();
    this.fetchAbangService();
  },
  computed: {
    ...mapState(["service", "abangService"]),
    solvedService: function() {
      return this.service.filter(list => list.solve);
    },
    unsolvedService: function() {
      return this.service.filter(list => !list.solve);
    }
  }
};
</script>
