import Vue from 'vue'
import { VueEditor } from "vue2-editor";


Vue.use(VueEditor)

if (process.browser) {
  const VueEditor = require('vue2-editor')
  Vue.use(VueEditor)
}