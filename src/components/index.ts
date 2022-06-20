import UGantt from './UGantt.vue'
import UFullCalendar from './componentCalendar/UFullCalendar.vue'
import UQuill from './componentQuill/UQuill.vue'
import UChart from './UChart.vue'

export default {
  install(app: any) {
    app.component('UGantt', UGantt)
    app.component('UFullCalendar', UFullCalendar)
    app.component('UQuill', UQuill)
    app.component('UChart', UChart)
  },
}
