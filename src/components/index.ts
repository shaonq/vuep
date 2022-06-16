import Gantt from './componentGantt/Main.vue'
import FullCalendar from './componentCalendar/Index.vue'
import Quill from './componentQuill/Index.vue'
import Charts from './componentChart.vue'

export default {
  install(app: any) {
    app.component('Gantt', Gantt)
    app.component('UFullCalendar', FullCalendar)
    app.component('UQuill', Quill)
    app.component('UChart', Charts)
  },
}
