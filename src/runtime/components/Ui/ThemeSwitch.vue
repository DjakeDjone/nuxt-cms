<script setup lang="ts">
import { ref, onMounted, watch } from "vue";

defineOptions({
  name: "UiThemeSwitch",
});

const theme = ref("light");
const checked = ref(false);

onMounted(() => {
  const storedTheme = localStorage.getItem("theme");
  if (storedTheme) {
    theme.value = storedTheme;
    checked.value = storedTheme === "dark";
  } else {
    theme.value = "light";
    checked.value = false;
  }
  document.documentElement.setAttribute("data-theme", theme.value);
});

watch(checked, (val) => {
  theme.value = val ? "dark" : "light";
  localStorage.setItem("theme", theme.value);
  document.documentElement.setAttribute("data-theme", theme.value);
});
</script>

<template>
  <div class="theme-switch-wrapper">
    <input id="toggle_checkbox" v-model="checked" type="checkbox" />
    <label for="toggle_checkbox">
      <div id="star">
        <div id="star-1" class="star">★</div>
        <div id="star-2" class="star">★</div>
      </div>
      <div id="moon" />
    </label>
  </div>
</template>

<style scoped>
.theme-switch-wrapper {
  position: relative;
  height: v-bind(size + "px");
  width: v-bind(size * 2.07 + "px");
}

* {
  user-select: none;
}

#toggle_checkbox {
  display: none;
}

label {
  display: block;
  position: absolute;
  top: 50%;
  right: 0;
  left: 0;
  width: v-bind(size * 2.07 + "px");
  height: v-bind(size + "px");
  margin: 0 auto;
  background-color: #77b5fe;
  border-radius: v-bind(size + "px");
  transform: translateY(-50%);
  cursor: pointer;
  transition: 0.3s ease background-color;
  overflow: hidden;
}

#star {
  position: absolute;
  top: v-bind(size * 0.23 + "px");
  left: v-bind(size * 0.23 + "px");
  width: v-bind(size * 0.53 + "px");
  height: v-bind(size * 0.53 + "px");
  background-color: #fafd0f;
  transform: scale(1);
  border-radius: 50%;
  transition: 0.3s ease top, 0.3s ease left, 0.3s ease transform,
    0.3s ease background-color;
  z-index: 1;
}

#star-1 {
  position: relative;
}

#star-2 {
  position: absolute;
  transform: rotateZ(36deg);
}

.star {
  top: 0;
  left: v-bind(size * -0.125 + "px");
  font-size: v-bind(size * 0.96 + "px");
  line-height: v-bind(size * 0.5 + "px");
  color: #fafd0f;
  transition: 0.3s ease color;
}

#moon {
  position: absolute;
  bottom: v-bind(size * -0.93 + "px");
  right: v-bind(size * 0.14 + "px");
  width: v-bind(size * 0.71 + "px");
  height: v-bind(size * 0.71 + "px");
  background-color: #fff;
  border-radius: 50%;
  transition: 0.3s ease bottom;
}

#moon:before {
  content: "";
  position: absolute;
  top: v-bind(size * -0.21 + "px");
  left: v-bind(size * -0.3 + "px");
  width: v-bind(size * 0.71 + "px");
  height: v-bind(size * 0.71 + "px");
  background-color: #03a9f4;
  border-radius: 50%;
  transition: 0.3s ease background-color;
}

#toggle_checkbox:checked + label {
  background-color: #000;
}

#toggle_checkbox:checked + label #star {
  top: v-bind(size * 0.05 + "px");
  left: v-bind(size * 1.14 + "px");
  transform: scale(0.3);
  background-color: yellow;
}

#toggle_checkbox:checked + label .star {
  color: yellow;
}

#toggle_checkbox:checked + label #moon {
  bottom: v-bind(size * 0.14 + "px");
}

#toggle_checkbox:checked + label #moon:before {
  background-color: #000;
}
</style>
