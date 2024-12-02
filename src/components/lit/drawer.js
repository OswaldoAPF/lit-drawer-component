import { LitElement, html, css} from 'lit';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';


class DrawerComponent extends LitElement {
  static properties = {
    open: { type: Boolean, reflect: true },
    group: { type: Object },
    currentPath: { type: String },
  };

  static styles = css`
    *{
      box-sizing: border-box;
      padding: 0;
      margin: 0;
    }

    :host {
      --background-color: inherit;
      --primary-color: inherit;
      --hover-background-color: inherit;
      --hover-primary-color: inherit;
      --font-color: inherit;
      --transition-02: inherit;
      --transition-03: inherit;
      --transition-04: inherit;
      --transition-05: inherit;

      position: fixed;
      top: 0;
      left: 0;
      height: 100vh;
      width: 88px;
      display: flex;
      justify-content: center;
      white-space: nowrap;
      background: var(--background-color);
      transition: var(--transition-05);
      user-select: none;
      z-index: 10;
    }

    :host([open]) {
      width: 260px;
    }

    a, button, ul {
      all: unset;
    }

    .drawer {
      flex: 1;
      min-height: 100%;
      height: 100%;
      width: 100%;
      display: flex;
      padding: 8px;
      flex-direction: column;
      overflow: hidden;
    }

    :host .header {
      width: 100%;
      height: 57px;
      display: flex;
      justify-content: start;
      border-bottom: solid 1px #DDE1E9;
    }

    .container__logo__img {
      min-width: 70px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .container__logo__text{
      display: flex;
      align-items: center;
    }

    .logo__img {
      height: 28px;
    }

    .main{
      display: flex;
      flex-direction: column;
      overflow: none;
      overflow-y: auto;
      padding-bottom: 10px;
    }

    :host .main::-webkit-scrollbar {
      width: 0px;
      height:0px;
    }

    .main__list {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 100%;
    }

    .main__list:first-child {
      margin-bottom: 10px;
    }
    
    .main__list .item__list{
      height: 48px;
      margin-top: 10px;
      list-style: none;
      display: flex;
      align-items: center;
      width: 100%;
      cursor: pointer;
    }

    .main__list .icon{
      min-width: 70px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .main__list .icon,
    .main__list .label {
      color: var(--font-color);
      transition: var(--transition-03);
      font-weight: 600;
    }

    .main__list .item__list .link__item {
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      border-radius: 8px;
      text-decoration: none;
      transition: var(--transition-04);
      cursor: pointer;
    }

    .main__list .item__list .link__item:hover {
      background: var(--hover-background-color);
    }

    .main__list .link__item:hover .icon,
    .main__list .link__item:hover .label {
      color: var(--hover-primary-color);
    }

    .item__list.active .link__item {
      background: var(--hover-background-color);
      border-radius: 8px;
    }

    .item__list.active .link__item .icon, .item__list.active .link__item .label  {
      color: var(--primary-color);
    }
    
    :host .label, :host .container__logo__text {
      display: none;
      opacity: 0;
      transition-property: display opacity;
      transition-duration: 0.8s;
      transition-behavior: allow-discrete;
    }

    :host([open]) .label, 
    :host([open]) .container__logo__text, 
    :host([open]) .footer div {
      display: flex;
      opacity: 1;
      transition-duration: 0.8s;
      @starting-style{
        opacity: 0;
      }
    }

    .dropdown {
      border-top: solid 1px #DDE1E9;
      border-bottom: solid 1px #DDE1E9;
    }

    .header__dropdown {
      height: 48px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-inline: 25px;
      cursor: pointer;
    }

    :host .name__dropdown {
      display: none;
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--font-color);
    }

    :host([open]) .name__dropdown {
      display: block;
    }

    .header__dropdown .icon__dropdown {
      height: 24px;
      z-index: 5;
      transition: var(--transition-03);
    }

    .dropdown-content .label{
      font-weight: 500;
      font-size: 0.9rem;
    }
    .dropdown-content .icon svg{
      width: 22px;
    }

    .dropdown[open] .icon__dropdown {
      transform: rotate(180deg);
    }

    .dropdown-content {
      overflow: hidden;
      max-height: 0;
      padding-bottom: 5px;
      opacity: 0;
      display: none;
      transition-property: display opacity;
      transition-duration: 0.6s;
      transition-behavior: allow-discrete;
    }

    .dropdown[open] .dropdown-content {
      max-height: 500px;
      display: block;
      opacity: 1;
      @starting-style{
        opacity: 0;
        max-height: 0;
      }
    }

    .footer {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 30px;
      color: black;
      margin-top: auto;
      padding-top: 10px;
    }

    .footer div {
      display: none;
      gap: 5px;
      font-size: 0.8rem;
      color: var(--font-color);
    }

    .open__drawer {
      width: 100%;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #EFF1F5;
      border-radius: 8px;
      cursor: pointer;
      transition: var(--transition-03)
    }

    .open__drawer:hover {
      background: #e3e4e9;
    }

    :host .open__drawer img {
      transform: rotate(-90deg);
      transition: var(--transition-03)
    }

    :host([open]) .open__drawer img {
      transform: rotate(90deg);
      transition: var(--transition-03)
    }

  `;

constructor() {
  super();
  this.group = { options: [], dropdowns: [] };
  this.open = false;
  this.currentPath = window.location.pathname;

  const params = new URLSearchParams(window.location.search);
  const drawerState = params.get('drawer');
  if (drawerState === 'open') {
    this.open = true;
  }
}

checkActiveOptions() {
  if (!this.currentPath || !this.group) return;

  let needsUpdate = false;
  const updateOptionState = (option) => {
    const isActive = this.currentPath.includes(option.key);
    if (option.active !== isActive) {
      option.active = isActive;
      needsUpdate = true;
    }
  };

  this.group.options.forEach(updateOptionState);
  this.group.dropdowns.forEach(dropdown => dropdown.options.forEach(updateOptionState));

  if (needsUpdate) {
    this.requestUpdate();
  }
}

toggleDrawer(event) {
  event.stopPropagation();
  this.open = !this.open;

  if (!this.open) {
    this.group.dropdowns.forEach(dropdown => {
      dropdown.open = false;
    });
  }

  this.updateDrawerState();
}

updateDrawerState() {
  const state = this.open ? 'open' : 'closed';
  const params = new URLSearchParams(window.location.search);
  params.set('drawer', state);
  window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
}

handleOptionClick(option, event) {
  event.stopPropagation();
  this.open = true;
  this.currentPath = option.key;

  this.checkActiveOptions();

  this.dispatchEvent(
    new CustomEvent('option-selected', {
      detail: { key: option.key, label: option.label },
      bubbles: true,
      composed: true,
    })
  );
}

toggleDropdown(index, event) {
  event.stopPropagation();
  this.open = true;
  this.group.dropdowns.forEach((dropdown, i) => {
    dropdown.open = i === index ? !dropdown.open : false;
  });

  this.updateDrawerState()
  this.requestUpdate();
}

connectedCallback() {
  super.connectedCallback();
  document.addEventListener('click', this.handleOutsideClick.bind(this));
}

disconnectedCallback() {
  super.disconnectedCallback();
  document.removeEventListener('click', this.handleOutsideClick.bind(this));
}

handleOutsideClick(event) {
  const drawer = this.shadowRoot.querySelector('.drawer');

  if (drawer && !drawer.contains(event.target) && this.open) {
    this.open = false;
    this.group.dropdowns.forEach(dropdown => {
      dropdown.open = false;
    });
    this.dispatchEvent(new CustomEvent('drawer-closed', { bubbles: true, composed: true }));
    this.updateDrawerState();
  }
}

updated(changedProperties) {
  super.updated(changedProperties);

  if (changedProperties.has('currentPath') || changedProperties.has('group')) {
    this.checkActiveOptions();
  }
}

  render() {
    if (!this.group || !this.group.options) {
      return html`<div>No hay opciones disponibles</div>`;
    }

    return html`
      <div class="drawer">
        <header class="header">
          <div class="container__logo__img">
            <slot name="logo-img"></slot>
          </div>
          <div class="container__logo__text">
            <slot name="logo-text"></slot>
          </div>
          
        </header>
        <div class="main">
          <ul class="main__list">
            ${this.group.options.map(
              option => html`
              <li class="item__list ${option.active ? 'active' : ''}">
                <a class="link__item" @click="${(event) => this.handleOptionClick(option, event)}">
                  <div class="icon">${this.renderSVG(option.icon)}</div>
                  <div class="label">${option.label}</div>
                </a>
              </li>
              `
            )}
          </ul>
          <ul class="main__list">
            ${this.group.dropdowns.map((dropdown, index) => html`
              <li class="dropdown" ?open="${dropdown.open}">
                <div class="header__dropdown" @click="${(event) => this.toggleDropdown(index, event)}">
                  <span class="name__dropdown">${dropdown.name}</span>
                  <img class="icon__dropdown" src="../../dropdown.svg"/>
                </div>
                <ul class="dropdown-content">
                  ${dropdown.options.map(option => html`
                  <li class="item__list ${option.active ? 'active' : ''}">
                    <a class="link__item" @click="${(event) => this.handleOptionClick(option, event)}">
                      <div class="icon">${this.renderSVG(option.icon)}</div>
                      <div class="label">${option.label}</div>
                    </a>
                  </li>
                  `)}
                </ul>
              </li>
            `)}
          </ul>
        </div>
        <div class="footer">
          <div>
            <slot name="json-name"></slot>
            <slot name="json-version"></slot>
          </div>
          <button class="open__drawer" @click="${this.toggleDrawer}">
            <img class="" src="../../dropdown.svg"/>
          </button>
        </div>
      </div>

    `;

    
  }
  renderSVG(icon) {
    return unsafeSVG(icon);
  }
}

if (!customElements.get('drawer-component')) {
  customElements.define('drawer-component', DrawerComponent);
}