<template>
  <div class="container">
    <div class="dots-data" v-if="isSetInput">
      <h2>Выходные данные:</h2>
      <table class="table">
        <thead>
          <tr>
            <th>№ точки</th>
            <th>Координата X</th>
            <th>Координата Y</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(dot, index) in dots" :key="index">
            <td>{{ dot.pointNumber }}</td>
            <td>{{ dot.coordinateX }}</td>
            <td>{{ dot.coordinateY }}</td>
          </tr>
        </tbody>
      </table>
      <button @click="isSetInput = false" class="btn">
        Задать входные данные
      </button>
    </div>
    <add-dots v-else @process="process" />
    <div class="canvas">
      <h2>Рисунок с выходными данными:</h2>
      <canvas id="canvas" width="1654" height="1000" ref="canvas"></canvas>
      <div class="picture-scale">
        <label>Масштаб рисунка: 1:{{ currentScale }}</label>
        <input
          class="input-range"
          type="range"
          v-model="currentScale"
          :min="pictureScale.minScale"
          :max="pictureScale.maxScale"
        />
      </div>
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
      pictureScale: {
        minScale: 1,
        maxScale: 300,
      },
      currentScale: 150,
    };
  },
  mounted() {
    this.readInputData();
  },
  watch: {
    currentScale() {
      this.renderingOutput();
    },
  },

  methods: {
    readInputData() {
      axios
        .get("http://localhost:3000/dots")
        .then((response) => {
          this.transformation(response.data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => console.log("Метод завершен"));
    },
    transformation(arr) {
      this.dots = arr.map((name, index) => {
        let dot = {},
          arrDot = name.split(";");
        dot.pointNumber = index + 1;
        dot.coordinateX = parseInt(arrDot[0]);
        dot.coordinateY = parseInt(arrDot[1]);
        return dot;
      });
      this.sort();
    },
    sort() {
      this.dots.sort((a, b) => {
        if (a.coordinateX > b.coordinateX) return 1;
        if (a.coordinateX < b.coordinateX) return -1;
        if (a.coordinateY > b.coordinateY) return -1;
        if (a.coordinateY < b.coordinateY) return 1;
        return 0;
      });
      this.removeDuplicates();
    },
    removeDuplicates() {
      if (this.dots.length > 1) {
        this.dots = this.dots.filter((item, index, array) => {
          return (
            index ===
            array.findIndex((element) => {
              return (
                element.coordinateX === item.coordinateX &&
                element.coordinateY === item.coordinateY
              );
            })
          );
        });
      }
      this.renderingOutput();
    },
    renderingOutput() {
      let cvn = this.$refs.canvas;
      let ctx = cvn.getContext("2d");
      ctx.clearRect(0, 0, cvn.width, cvn.height);

      let scale = this.currentScale;

      ctx.beginPath();
      ctx.strokeStyle = "green";
      ctx.font = "30px Arial";
      ctx.textAlign = "left";
      ctx.textBaseline = "top";

      for (let i = 0; i < this.dots.length; i++) {
        ctx.lineTo(
          this.dots[i].coordinateX * scale,
          this.dots[i].coordinateY * scale
        );
        ctx.fillRect(
          this.dots[i].coordinateX * scale,
          this.dots[i].coordinateY * scale,
          3 * 3,
          3 * 3
        );
        ctx.fillText(
          `${this.dots[i].pointNumber}(${this.dots[i].coordinateX};${this.dots[i].coordinateY})`,
          this.dots[i].coordinateX * scale + 10,
          this.dots[i].coordinateY * scale + 10
        );
      }
      ctx.stroke();
      ctx.closePath();
    },
    process(arr) {
      this.dots = arr;
      this.sort();
      this.isSetInput = true;
    },
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Noto+Serif");
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: "Noto Serif", serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.5;
  background: #f7f7f7;
  color: #5e5e5e;
}
.container {
  max-width: 1248px;
  margin: 0 auto;
  padding: 32px 16px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.dots-data {
  width: 28%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.canvas {
  width: 68%;
  height: 600px;
  position: relative;
}
#canvas {
  width: 100%;
  height: 500px;
  background: #efefef;
  border: 1px solid #dddddd;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
.input-range {
  padding: 0;
}
h2 {
  text-align: center;
  margin-bottom: 24px;
}
.table {
  width: 100%;
  margin-bottom: 32px;
  border: 1px solid #dddddd;
  border-collapse: collapse;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
.table th {
  font-weight: bold;
  padding: 5px;
  background: #e6e6e6;
  border: 1px solid #dddddd;
}
.table td {
  border: 1px solid #dddddd;
  padding: 5px;
  text-align: center;
}
tr:nth-child(even) {
  background-color: #efefef;
}
.btn {
  font-family: "Noto Serif", serif;
  font-size: 16px;
  display: inline-block;
  padding: 0.8em 2em;
  line-height: 1;
  text-transform: uppercase;
  cursor: pointer;
  border-radius: 10px;
  margin: 16px 0;
  color: #ffffff;
  background-color: #807cff;
  border: 1px solid #ddd;
  &:hover {
    background-color: #504afd;
    box-shadow: 0 0 10px rgba(0, 38, 255, 0.5);
  }
}
.picture-scale {
  width: 300px;
  position: absolute;
  bottom: 40px;
  left: calc(calc(100% - 300px) / 2);
}
</style>
