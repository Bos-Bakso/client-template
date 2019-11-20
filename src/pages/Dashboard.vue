<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
      >
        <stats-card data-background-color="green">
          <template slot="header">
            <md-icon>store</md-icon>
          </template>

          <template slot="content">
            <p class="category">Revenue</p>
            <h3 class="title">IDR {{ nFormatter }}</h3>
          </template>
        </stats-card>
      </div>
      <div
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
      >
        <stats-card data-background-color="red">
          <template slot="header">
            <md-icon>info_outline</md-icon>
          </template>

          <template slot="content">
            <p class="category">Unsolved Service</p>
            <h3 class="title">75</h3>
          </template>
        </stats-card>
      </div>

      <div
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
      >
        <stats-card data-background-color="blue">
          <template slot="header">
            <i class="fa fa-users"></i>
          </template>

          <template slot="content">
            <p class="category">Sales Agents</p>
            <h3 class="title">45</h3>
          </template>
        </stats-card>
      </div>
      <div
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
      >
        <stats-card data-background-color="orange">
          <template slot="header">
            <md-icon>build</md-icon>
          </template>

          <template slot="content">
            <p class="category">Service Agents</p>
            <h3 class="title">
              45
            </h3>
          </template>
        </stats-card>
      </div>
      <!--4  -->
      <!-- 2 -->
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50"
      >
        <md-card>
          <md-card-header data-background-color="blue">
            <h4 class="title">Sales Stats</h4>
            <p class="category">Sales daily ranking</p>
          </md-card-header>
          <md-card-content>
            <ordered-table table-header-color="blue"></ordered-table>
          </md-card-content>
        </md-card>
      </div>

      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50"
      >
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">Chart Stats</h4>
            <p class="category">Monthly Sales</p>
          </md-card-header>
          <md-card-content>
            <Chart />
            <!-- Chart inside here -->
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

import { TriggerRank } from "@/api/firebase";

import Chart from "../components/Chart";

export default {
  components: {
    StatsCard,
    NavTabsCard,
    NavTabsTable,
    OrderedTable,
    Chart
  },
  data: function() {
    return {
      totalAbang: 0,
      totalIncome: 0,
      listabangs: [],
      lisTransactions: [],
      topRankAbang: []
    };
  },
  methods: {
    listAbang: function(abangs, transactions) {
      const arr = [];
      const obj = {
        abang: null
      };

      abangs.forEach(abang => {
        const totalTransactions = transactions.filter(
          el => el.tukangBaksoId == abang._id
        );

        abang.totalBakso = totalTransactions.length;
        this.topRankAbang.push(abang);
      });
      this.sortAbang(this.topRankAbang);
    },
    sortAbang(arr) {
      const sorted = [];

      arr.sort((a, b) => b.totalBakso - a.totalBakso);
      this.$store.commit("SET_ABANG_BAKSO", arr);
    }
  },
  created() {
    window.scrollTo(0, 0);
    this.$store
      .dispatch("getTotalAbang")
      .then(data => {
        this.listabangs = data;
        this.totalAbang = data.length;
        return this.$store.dispatch("getTransactions");
      })
      .then(data => {
        this.lisTransactions = data.penjualanBakso;
        this.totalIncome = data.penjualanBakso.length * 15000;
        this.listAbang(this.listabangs, this.lisTransactions);
      });

    TriggerRank.onSnapshot(querySnapshot => {
      console.log(querySnapshot);
      this.$store.dispatch("fetchRank");
    });
  },
  computed: {
    nFormatter: function() {
      var si = [
        { value: 1, symbol: "" },
        { value: 1e3, symbol: "K" },
        { value: 1e6, symbol: "M" },
        { value: 1e9, symbol: "G" },
        { value: 1e12, symbol: "T" },
        { value: 1e15, symbol: "P" },
        { value: 1e18, symbol: "E" }
      ];
      var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
      var i;
      for (i = si.length - 1; i > 0; i--) {
        if (this.totalIncome >= si[i].value) {
          break;
        }
      }
      return (
        (this.totalIncome / si[i].value).toFixed(1).replace(rx, "$1") +
        si[i].symbol
      );
    }
  }
};
</script>
