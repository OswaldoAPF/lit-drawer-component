<template>
  <div class="group__nav">
    <button @click="selectOptions(0)">Group 1</button>
    <button @click="selectOptions(1)">Group 2</button>
  </div>

  <drawer-component
    ref="drawer"
    :group="selectedOptions"
    :current-path="currentPath"
    @option-selected="handleOptionSelected"
    @drawer-closed="isOpen = false"
  >
    <img slot="logo-img" src="../logo.svg" alt="logo" class="logo__img" />
    <img slot="logo-text" src="../selia.svg" alt="selia" class="logo__text" />
    <p slot="json-name">{{ packageJson.name }}</p>
    <p slot="json-version">v{{ packageJson.version }}</p>
  </drawer-component>

  <section>
    <h1 v-if="currentSection">Bienvendido a <span>{{ currentSection }}</span></h1>
  </section>
</template>

<script>
import './components/lit/drawer';
import { options } from './data/options';
import packageJson from '../package.json';

export default {
  data() {
    return {
      options,
      isOpen: false,
      currentPath: '',
      currentSection: '',
      selectedOptions: options[0],
      packageJson,
    };
  },
  methods: {
    selectOptions(index) {
      this.selectedOptions = this.options[index];
    },
    handleOptionSelected(event) {
      const { key } = event.detail;
      this.isOpen = this.$refs.drawer.open;
      this.$router.push(`${key}?drawer=${this.isOpen ? 'open' : 'closed'}`);
    },
  },
  watch: {
    '$route'(to) {
      this.currentPath = to.path;
      this.currentSection = window.location.pathname.split('/').pop().replace(/^\w/, (c) => c.toUpperCase());
    },
  },
};
</script>

<style>
.group__nav {
  display: flex;
  justify-content: center;
  gap: 1rem;
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  transition: all 0.3s ease-in-out;
  padding: 0 20px;
  width: 100%;
  box-sizing: border-box;
}

.group__nav button {
  background-color: transparent;
  border: 2px solid #ccc;
  border-radius: 4px;
  color: #333;
  font-size: 1rem;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.group__nav button:hover {
  background-color: var(--primary-color);
  color: white;
}

.group__nav button:focus {
  outline: none;
  box-shadow: 0 0 5px var(--primary-color);
}

section {
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
}

h1 {
  font-size: 3rem;
  color: var(--font-color);
}

h1 span {
  background: var(--hover-background-color);
  background: linear-gradient(0deg, var(--hover-background-color) 7%, var(--primary-color) 31%, var(--hover-primary-color) 63%);
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
}
</style>