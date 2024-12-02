<template>
  <drawer-component
    :group="selectedOptions"
    :current-path="currentPath"
    @option-selected="handleOptionSelected"
    :oepn="isOpen"
  ></drawer-component>

  <div class="group__nav">
    <button @click="selectOptions(0)">Group 1</button>
    <button @click="selectOptions(1)">Group 2</button>
  </div>
</template>

<script>
import './components/lit/drawer';
import { options } from './data/options';

export default {
  data() {
    return {
      options,
      isOpen: false,
      currentPath: '',
      selectedOptions: options[0],
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

    // Actualizar la ruta
    this.$router.push(`${key}?drawer=open`);

    // Cambiar el estado de `isOpen` a true
    this.isOpen = true;

    // Sincronizar con el componente Lit (opcional)
    const drawer = this.$el.querySelector('drawer-component');
    if (drawer) {
      drawer.open = true;
    }
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
  width: 100%;
  display: flex;
  justify-content: center;
}

.group__nav button {
  all: unset;
  cursor: pointer;
}
</style>