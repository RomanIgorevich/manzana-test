<template>
  <div class="container">
    <div>
      <h2>Выходные данные:</h2>
      <div v-for="(dot, index) in dots" :key="index">
        <p>{{ index + 1 }} - {{ dot }}</p>
      </div>
      <button @click="sort">Sort</button>
      <div v-for="(dot, index) in dotsSort" :key="index">
        <p>
          {{ dot.pointNumber }} - {{ dot.coordinateX }};{{ dot.coordinateY }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "App",
  data() {
    return {
      dots: [],
      dotsSort: [],
    };
  },
  mounted() {
    this.readInputData();
  },
  methods: {
    readInputData() {
      axios
        .get("http://localhost:3000/dots")
        .then((response) => {
          this.dots = response.data;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => console.log("Метод завершен"));
    },
    sort() {
      for (let i in this.dots) {
        let dot1 = {
          pointNumber: null,
          coordinateX: null,
          coordinateY: null,
        };

        let o = this.dots[i].split(";");

        dot1.pointNumber = parseInt(i) + 1;
        dot1.coordinateX = parseInt(o[0]);
        dot1.coordinateY = parseInt(o[1]);
        this.dotsSort.push(dot1);
      }
      this.dotsSort.sort((a, b) => {
        if (a.coordinateX > b.coordinateX) {
          return 1;
        }
        if (a.coordinateX < b.coordinateX) {
          return -1;
        }
        if (a.coordinateY > b.coordinateY) {
          return -1;
        }
        if (a.coordinateY < b.coordinateY) {
          return 1;
        }
        return 0;
      });
    },
  },
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  background: #fff;
  margin: 0;
  padding: 0;
}
body {
  font-family: "PT Serif", serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: #5e5e5e;
}
.container {
  max-width: 1170px;
  margin: 0 auto;
  padding: 0 15px;
}
</style>
