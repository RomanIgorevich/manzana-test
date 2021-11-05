<template>
  <div>
    <h2>Входные данные:</h2>
    <form @click.prevent>
      <div v-for="dot in dotsInput" :key="dot">
        <div>
          <h3>Точка № {{ dot.dotNumber }}</h3>
          <label :for="dot.labelX">{{ dot.labelX }}</label>
          <input
            type="text"
            :id="dot.labelX"
            :placeholder="dot.placeholderX"
            v-model="dot.valueX"
          />
          <label :for="dot.labelY">{{ dot.labelY }}</label>
          <input
            type="text"
            :id="dot.labelY"
            :placeholder="dot.placeholderY"
            v-model="dot.valueY"
          />
        </div>
      </div>
      <button @click="addDot">Добавить точку</button>
      <button @click="process">Oбработать</button>
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
          labelX: "Координата Х:",
          placeholderX: "Введите x...",
          valueX: null,
          labelY: "Координата Y:",
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
        labelX: "Координата Х:",
        placeholderX: "Введите x...",
        valueX: this.value,
        labelY: "Координата Y:",
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
      this.dotsInput.splice(1)
      console.log(this.dotsInput)
    },
  },
};
</script>
