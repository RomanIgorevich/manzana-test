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
      <div v-for="dot in dotsInput" :key="dot">
        <p>{{dot.dotNumber}}-{{ dot.valueX }};{{dot.valueY}}</p>
      </div>
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
          valueX: "",
          labelY: "Координата Y:",
          placeholderY: "Введите у...",
          valueY: "",
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
  },
};
</script>
