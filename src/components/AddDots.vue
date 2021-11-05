<template>
  <div class="dots-data">
    <h2>Входные данные:</h2>
    <form @click.prevent>
      <div class="dot" v-for="dot in dotsInput" :key="dot">
        <h3>Точка № {{ dot.dotNumber }}</h3>
        <div class="wrapper">
          <label :for="dot.labelX">{{ dot.labelX }}</label>
          <input
            type="text"
            :id="dot.labelX"
            :placeholder="dot.placeholderX"
            v-model="dot.valueX"
          />
          <label class="pad-l16px" :for="dot.labelY">{{ dot.labelY }}</label>
          <input
            type="text"
            :id="dot.labelY"
            :placeholder="dot.placeholderY"
            v-model="dot.valueY"
          />
        </div>
      </div>
      <button class="btn" @click="addDot">Добавить точку</button>
      <button class="btn" @click="process">Oбработать</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dotsInput: [
        {
          dotNumber: 1,
          labelX: "Х:",
          placeholderX: "Введите x...",
          valueX: null,
          labelY: "Y:",
          placeholderY: "Введите у...",
          valueY: null,
        },
      ],
    };
  },
  methods: {
    addDot() {
      this.dotsInput.push({
        dotNumber: this.dotsInput.length + 1,
        labelX: "Х:",
        placeholderX: "Введите x...",
        valueX: this.value,
        labelY: "Y:",
        placeholderY: "Введите у...",
        valueY: this.value,
      });
    },
    process() {
      let arrNewDots = this.dotsInput
        .filter((item) => {
          return item.valueX != undefined && item.valueY != undefined;
        })
        .map((item) => {
          return item.valueX + ";" + item.valueY;
        });
      this.$emit("process", arrNewDots);
      this.dotsInput.splice(1);
      console.log(this.dotsInput);
    },
  },
};
</script>

<style lang="scss">
h3 {
  margin-bottom: 8px;
}
form {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.dot {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  width: 100%;
  margin-bottom: 24px;
  padding: 16px;
}
.wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
label {
  margin-right: 16px;
}
input {
  padding: 8px 16px;
  width: 100%;
  border: 1px solid #adaeaf;
  outline: none;
  border: none;
}
.pad-l16px {
  padding-left: 16px;
}
</style>
