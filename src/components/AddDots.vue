<template>
  <div class="dots-data">
    <h2>Входные данные:</h2>
    <form @click.prevent>
      <div class="dot" v-for="dot in dotsInput" :key="dot.dotNumber">
        <h3>Точка № {{ dot.dotNumber }}</h3>
        <div class="wrapper">
          <label :for="dot.labelX">{{ dot.labelX }}</label>
          <input
            type="text"
            :id="dot.labelX"
            :placeholder="dot.placeholderX"
            v-model="dot.valueX"
            @keypress="isNumber($event)"
          />
          <label class="pad-l16px" :for="dot.labelY">{{ dot.labelY }}</label>
          <input
            type="text"
            :id="dot.labelY"
            :placeholder="dot.placeholderY"
            v-model="dot.valueY"
            @keypress="isNumber($event)"
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
      if (
        this.dotsInput[this.dotsInput.length - 1].valueX != null &&
        this.dotsInput[this.dotsInput.length - 1].valueY != null
      ) {
        this.dotsInput.push({
          dotNumber: this.dotsInput.length + 1,
          labelX: "Х:",
          placeholderX: "Введите x...",
          valueX: this.value,
          labelY: "Y:",
          placeholderY: "Введите у...",
          valueY: this.value,
        });
      }
    },
    process() {
      let arrNewDots = this.dotsInput
        .filter((item) => {
          return (
            item.valueX != undefined &&
            item.valueY != undefined &&
            item.valueX == parseInt(item.valueX) &&
            item.valueY == parseInt(item.valueY)
          );
        })
        .map((item, index) => {
          let dot = {};
          dot.pointNumber = index + 1;
          dot.coordinateX = parseInt(item.valueX);
          dot.coordinateY = parseInt(item.valueY);
          return dot;
        });
      this.$emit("process", arrNewDots);
    },
    isNumber(event) {
      event = event ? event : window.event;
      var charCode = event.which ? event.which : event.keyCode;
      if (charCode < 48 || charCode > 57) {
        event.preventDefault();
      } else {
        return true;
      }
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
