<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="container">
      <div class="row my-5">
        <div class="col-md-6">
          <div class="card mb-3">
            <h5 class="card-title mt-3 mb-0 pl-3 text-left">Select your country</h5>
            <div class="card-body">
              <select class="custom-select" v-model="country" @change="onCountrySelect($event)">
                <option
                  :value="country.name"
                  v-for="country in countries"
                  :key="country.id"
                >{{country.name}}</option>
              </select>
            </div>
          </div>
          <div class="card mb-3">
            <h5 class="card-title mt-3 mb-0 pl-3 text-left">Select your state</h5>
            <div class="card-body">
              <select class="custom-select" v-model="state" @change="onStateSelect($event)">
                <option :value="state.name" v-for="state in states" :key="state.id">{{state.name}}</option>
              </select>
            </div>
            <div
              v-if="stateError"
              :class="{ empty: stateError }"
              class="alert alert-warning"
              role="alert"
            >No States for selected Country!</div>
          </div>
          <div class="card mb-3">
            <h5 class="card-title mt-3 mb-0 pl-3 text-left">Select your city</h5>
            <div class="card-body">
              <select class="custom-select" v-model="city">
                <option :value="city.name" v-for="city in cities" :key="city.id">{{city.name}}</option>
              </select>
            </div>
            <div
              v-if="cityError"
              :class="{ empty: cityError }"
              class="alert alert-warning"
              role="alert"
            >No Cities for selected State!</div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card mx-auto" style="width: 22rem;">
            <div class="card-header text-white" style=" background: #42b983">Details</div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item" v-if="country">
                <span class="float-left">Country:</span>
                {{country}}
              </li>
              <li class="list-group-item" v-if="state">
                <span class="float-left">State:</span>
                {{state}}
              </li>
              <li class="list-group-item" v-if="city">
                <span class="float-left">City :</span>
                {{city}}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Country",
  data() {
    return {
      country: "",
      state: "",
      city: "",
      countries: [],
      states: [],
      cities: [],
      stateError: false,
      cityError: false,
      formDetails: {
        country: "",
        state: "",
        city: "",
      },
    };
  },
  props: {
    msg: String,
  },
  created() {
    this.$http
      .get(
        "https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries%2Bstates%2Bcities.json"
      )
      .then((response) => response.json())
      .then((data) => (this.countries = data.slice(0, 251)));
  },
  methods: {
    onCountrySelect(event) {
      this.state = "";
      this.city = "";
      const country = event.target.value;
      const index = this.countries.findIndex((x) => x.name === country);
      const state = this.countries[index]["states"];
      if (state.length === 0) {
        this.stateError = !this.stateError;
        this.states = null;
        this.cities = "";
      } else {
        this.states = state;
        this.stateError = false;
      }
    },
    onStateSelect(event) {
      this.city = "";
      const state = event.target.value;
      const index = this.states.findIndex((x) => x.name === state);
      const city = this.states[index]["cities"];
      if (city.length === 0) {
        this.cityError = !this.cityError;
      } else {
        this.cities = city;
        this.cityError = false;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
  font-size: 1.3rem;
}
span {
  color: #42b983;
}
</style>
