<template>
  <drawer-component
    ref="drawer"
    :group="selectedOptions"
    :current-path="currentPath"
    @option-selected="handleOptionSelected"
    @drawer-closed="isOpen = false"
  >
    <img slot="logo-img" src="../public/logo.svg" alt="logo" class="logo__img" />
    <img slot="logo-text" src="../public/selia.svg" alt="selia" class="logo__text" />
    <p slot="json-name">{{ packageJson.name }}</p>
    <p slot="json-version">v{{ packageJson.version }}</p>
  </drawer-component>

  <div class="group__nav">
    <button @click="selectOptions(0)">Group 1</button>
    <button @click="selectOptions(1)">Group 2</button>
  </div>
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
      selectedOptions: options[0],
      packageJson,
    };
  },
  methods: {
    updateQueryString(params) {
      this.$router.push({
        path: this.$route.path,
        query: { ...this.$route.query, ...params },
      });
    },
    selectOptions(index) {
      this.selectedOptions = this.options[index];
      this.updateActiveOptions();
    },
    handleOptionSelected(event) {
      const { key } = event.detail;
      this.isOpen = this.$refs.drawer.open;
      this.$router.push(`${key}?drawer=${this.isOpen ? 'open' : 'closed'}`);
    },
    updateActiveOptions() {
      if (!this.selectedOptions || !this.currentPath) return;

      const updateOptionStatus = option => {
        option.active = this.currentPath.includes(option.key);
      };

      this.selectedOptions.options.forEach(updateOptionStatus);
      this.selectedOptions.dropdowns.forEach(dropdown => {
        dropdown.options.forEach(updateOptionStatus);
      });
    },
    handleOptionSelected(event) {
    const { key } = event.detail;
    this.$router.push(`${key}?drawer=open`);
    this.isOpen = true;
  },
  },
  watch: {
    '$route'(to) {
      this.currentPath = to.path;
      this.updateActiveOptions();
    },
  },
  mounted() {
    this.currentPath = this.$route.path || '/';
    this.updateActiveOptions();
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
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}
</style>