import Gantt from './componentGantt/Main.vue'
import FullCalendar from './componentCalendar/Index.vue'
import Quill from './componentQuill/Index.vue'
import Charts from './componentChart.vue'

export default {
  install(app: any) {
    app.component('Gantt', Gantt)
    app.component('u-full-calendar', FullCalendar)
    app.component('u-quill', Quill)
    app.component('u-chart', Charts)
  },
}
