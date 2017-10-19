import styles from 'raw-loader!sass-loader!./styles.scss';

/**
 * ez-alert
 *
 * Alert web component with configurable options
 *
 * @markup
 * <ez-alert></ez-alert>
 *
 * @use
 * - Requires reference to DOM element: document.querySelector('ez-alert')
 * - Methods:
 *    - el.success(Object)
 *    - el.error(Object)
 *    - el.warn(Object)
 *    - el.info(Object)
 *
 * @options:
 * - title - Any String
 * - message - Any String
 * - duration - 5000 Default, in milliseconds
 * - type - info, warn, success, error
 * - actions - Array of Objects
 *    - type - String, default "close"
 *    - callback - Any Function
 *
 * Expected Data:
 * {
 * 	title: 'Error Somewhere',
 * 	message: 'This is just terrible!',
 * 	duration: 8000,
 * 	type: 'warn',
 * 	actions: [{
 * 	  type: 'next',
 * 	  callback: (e, args) => { console.log('test! args:',args) }
 * 	}]
 * }
 */
(function() {

  /**
   * Cloning contents from a <template> element is more performant
   */
  const template = document.createElement('template');
  template.innerHTML = `
    <style>${styles}</style>
  `;

  function getContent(options) {
    let indicator = (options.icon) ? `
      <div class="indicator">
        <i class="icon">${options.icon}</i>
      </div>
    ` : ``

    let content = (options.title || options.message) ? `
      <div class="content">
        ${(options.title) ? '<h3>' + options.title + '</h3>' : ''}
        ${(options.message) ? '<p>' + options.message + '</p>' : ''}
      </div>
    ` : ``

    // TODO: Add actions
    // <div class="actions">
    //   <div class="action" onclick="action.callback()">
    //     <i class="icon">&times;</i>
    //   </div>
    // </div>

    return `
      ${indicator}
      ${content}
    `
  }

  class EzAlert extends HTMLElement {

    constructor() {
      super()
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))

      // helpful stuffs
      this.fire = this._fire.bind(this)
      this.reset = this._reset.bind(this)
      this._removeInstances = this._removeInstances.bind(this)
      this.setOptions = this._setOptions.bind(this)
      this.options = {}
      this.instances = []

      // helpful methods
      this.success = this._success.bind(this)
      this.warn = this._warn.bind(this)
      this.error = this._error.bind(this)
      this.info = this._info.bind(this)

      return this
    }

    connectedCallback() {
      if (!this.hasAttribute('role')) this.setAttribute('role', 'alert')
    }

    disconnectedCallback() {
      // Placeholder
    }

    _removeInstances() {
      const _this = this
      if (this.instances && this.instances.length > 0) {
        this.instances.forEach((i, idx) => {
          i.style.opacity = 0
          _this.instances.splice(idx, 1)
          setTimeout(() => {
            _this.shadowRoot.removeChild(i)
          }, 220)
        })
      }
    }

    _reset() {
      this._removeInstances()
    }

    _fire() {
      var _this = this

      // first, cleanup old instances
      this._removeInstances()

      // Start new instance
      const id = `${(+new Date())}`
      let instContainer = document.createElement('div')
      let inst = getContent(_this.options)
      instContainer.id = id
      instContainer.setAttribute(_this.options.type, true)
      instContainer.classList = 'instance'
      instContainer.innerHTML = inst
      this.shadowRoot.appendChild(instContainer)
      let newInst = this.shadowRoot.getElementById(`${id}`)

      // Add for later cleanup
      _this.instances.push(newInst)

      setTimeout(() => {
        newInst.style.marginTop = '0px'
        newInst.style.opacity = 1
      }, 20)
    }

    _setOptions(options = {}) {
      this.options = options
    }

    _success(options = {}) {
      const _this = this
      options = Object.assign(_this.options, options, { type: 'success' })
      this.setOptions(options)
      this.fire()
    }

    _error(options = {}) {
      const _this = this
      options = Object.assign(_this.options, options, { type: 'error' })
      this.setOptions(options)
      this.fire()
    }

    _warn(options = {}) {
      const _this = this
      options = Object.assign(_this.options, options, { type: 'warn' })
      this.setOptions(options)
      this.fire()
    }

    _info(options = {}) {
      const _this = this
      options = Object.assign(_this.options, options, { type: 'info' })
      this.setOptions(options)
      this.fire()
    }
  }

  // Dont allow multiple definitions
  let exists = (window.customElements.get('ez-alert'))
  if (!exists) window.customElements.define('ez-alert', EzAlert)
})();
