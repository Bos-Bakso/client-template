<template>
  <div class="wrapper">
    <div class="rectangle-1">
      <h4
        style="font-size: 3rem; color: white; margin-top: -50px; margin-bottom: 70px;"
      >
        Welcome To.
      </h4>
      <div class="logoContainer" style="display: flex; align-items: center">
        <img src="../../assets/bowl.png" alt id="logoImg" />
        <h4 style="font-size: 5rem; color: white; margin-left: 20px">
          BosBaso
        </h4>
      </div>
    </div>

    <!-- form login -->
    <div class="formContainer">
      <form @submit.prevent="login" class="myForm">
        <label for="" style="font-size: 30px;">Login to continue.</label>
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

        <md-button
          v-if="loading === false"
          @click.prevent="login"
          type="submit"
          class="md-warning"
          style="background-color: rgba(255, 176, 21, 0.84); border: none"
          >Login</md-button
        >
        <md-button v-else type="submit" @click.prevent class="md-warning">
          <i class="fas fa-spinner fa-pulse" style="font-size: 1.5rem;"></i>
        </md-button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      username: "",
      password: "",
      loading: false,
      Login: true
      // socket: io.connect('http://34.87.107.88')
    };
  },
  methods: {
    login() {
      this.loading = true;
      this.$store
        .dispatch("login", { username: this.username, password: this.password })
        .then(user => {
          this.$store.commit("SET_BOS_IMAGE", user.image);
          this.loading = false;
          this.$router.push("/admin/dashboard");
        });
    }
  },
  created() {
    this.username = "";
    this.password = "";
  },
  destroyed() {
    this.username = "";
    this.password = "";
  }
};
</script>

<style scoped>
* {
  font-size: 200rem;
}
/* button{
        padding: 0.6rem 1rem;
        font-size: 1rem;
        border-radius: 5px;
        outline: none;
        color: white;
        background-color: #3c85e6;
    }
    button:hover {
        background-color: #2c73d1;
    } */
.link {
  color: black;
  text-decoration: none;
}
.link:hover {
  text-decoration-line: underline;
}
img {
  width: 70%;
  height: 50%;
  object-fit: contain;
}
.right,
.left {
  display: flex;
  justify-content: center;
}
.label {
  font-size: 2rem;
}
.wrapper {
  display: flex;
  width: 100%;
  height: 100vh;
  /* grid-template-columns: 1fr 1fr; */
}
.right {
  margin-top: 40px;
  padding: 0 3rem;
}
form {
  display: flex;
  flex-direction: column;
  width: 40%;
  height: 100%;
  justify-content: center;
}
input,
button {
  margin-bottom: 2vh;
  /* padding: 1vh 0.5vw; */
  font-size: 1.5rem;
}
#logoImg {
  width: 100px;
  height: auto;
}
.rectangle-1 {
  height: 100vh;
  width: 50%;
  background: rgba(255, 176, 21, 0.84);
  mix-blend-mode: normal;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 0 50px 50px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.formContainer {
  width: 50%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
