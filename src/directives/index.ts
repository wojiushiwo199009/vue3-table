import type { App, Directive } from 'vue'
import copy from './modules/copy'
import waterMarker from './modules/waterMarker'
import hide from './modules/hide'
import draggable from './modules/draggable'

const directivesList: { [key: string]: Directive } = {
  copy,
  hide,
  waterMarker,
  draggable
}

const directives = {
  install: function (app: App<Element>) {
    Object.keys(directivesList).forEach(key => {
      app.directive(key, directivesList[key])
    })
  }
}

export default directives
