<template>
  <div class="group__nav">
    <button v-for="(group, index) in options" :key="index" @click="selectGroup(group.key)">
      {{ group.name }}
    </button>
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

  <router-view />
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
      selectedOptions: null,
      packageJson,
    };
  },
  computed: {
    currentGroup() {
      return this.$route.params.group || 'group-1';
    },
  },
  methods: {
    updateRouteWithDrawer(newRoute) {
      this.isOpen = this.$refs.drawer.open;
      this.$router.push({
        path: newRoute,
        query: {
          ...this.$route.query,
          drawer: this.isOpen ? 'open' : 'closed',
        },
      });
    },

    selectGroup(groupKey) {
      if (this.$route.params.group === groupKey) return;

      const selectedOption = this.$route.params.option;
      const newRoute = `/${groupKey}/${selectedOption || ''}`;

      this.updateRouteWithDrawer(newRoute);
    },

    handleOptionSelected(event) {
      const { key } = event.detail;
      const newRoute = `/${this.currentGroup}/${key}`;
      this.updateRouteWithDrawer(newRoute);
    },

    selectOptions(index) {
      this.selectedOptions = this.options[index];
    },
    selectGroupKey() {
      const groupKey = this.currentGroup;
      this.selectedOptions = this.options.find(group => group.key === groupKey) || this.options[0];
    }

  },
  watch: {
    '$route'() {
      this.selectGroupKey()
    },
  },
  mounted() {
    this.selectGroupKey()
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
</style>