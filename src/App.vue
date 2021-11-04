<template>
  <div class="container">
    <div>
      <h2>Выходные данные:</h2>
      <div v-for="(dot, index) in dots" :key="index">
        <p>
          {{ dot.pointNumber }} - {{ dot.coordinateX }};{{ dot.coordinateY }}
        </p>
      </div>
      <button v-if="isSetInput" @click="isSetInput = false">
        Задать входные данные
      </button>
      <add-dots v-else />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import AddDots from "./components/AddDots.vue";
export default {
  name: "App",
  components: {
    AddDots,
  },
  data() {
    return {
      dots: [],
      isSetInput: true,
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
          this.sort(response.data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => console.log("Метод завершен"));
    },
    sort(arr) {
      this.dots = arr.map((name, index) => {
        let dot = {},
          arrDot = name.split(";");
        dot.pointNumber = index + 1;
        dot.coordinateX = parseInt(arrDot[0]);
        dot.coordinateY = parseInt(arrDot[1]);
        return dot;
      });

      this.dots.sort((a, b) => {
        if (a.coordinateX > b.coordinateX) return 1;
        if (a.coordinateX < b.coordinateX) return -1;
        if (a.coordinateY > b.coordinateY) return -1;
        if (a.coordinateY < b.coordinateY) return 1;
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
