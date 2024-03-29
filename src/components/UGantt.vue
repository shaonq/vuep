<template>
  <div ref="gantt" class="u-gantt">
    <!-- 头部区域 tbody -->
    <div class="u-gantt-head">
      <ul class="u-flex u-flex--start">
        <li :style="{ width: sideWidth + 'px' }" class="is-clamp">
          <div class="u-gantt__scroll u-gantt---left">
            <table>
              <thead>
                <tr class="u-gantt-rows">
                  <td v-for="(item, index) in labelList" :key="index" :style="{ width: item.width + 'px' }">
                    <div class="u-gantt-cell">{{ item.label }}</div>
                  </td>
                </tr>
              </thead>
            </table>
          </div>
        </li>
        <li class="u-flex__item is-clamp">
          <div class="u-gantt__scroll u-gantt---right">
            <table>
              <thead>
                <tr class="u-gantt-bars">
                  <td v-for="(a, dayIndex) in dateRangeDay" :key="dayIndex" :class="getDateWeekClass(getIndexDate(dayIndex))">
                    <div class="u-gantt-cell">
                      <div :title="getIndexDate(dayIndex)" v-text="headDateFromt(getIndexDate(dayIndex))"></div>
                    </div>
                  </td>
                </tr>
              </thead>
            </table>
          </div>
        </li>
      </ul>
    </div>
    <!-- 内区域 tbody -->
    <div class="u-gantt-warp" style="height: calc(100% - 50px)">
      <ul class="u-flex u-flex--start">
        <li :style="{ width: sideWidth + 'px' }" class="is-clamp">
          <div class="u-gantt__scroll u-gantt---left">
            <table>
              <tbody>
                <tr v-for="(item, index) in list" :key="index" class="u-gantt-rows" @click="$emit('on-item-click', item, $event)">
                  <td v-for="({ value, width }, i) in labelList" :key="i" :style="{ width: width + 'px' }">
                    <div class="u-gantt-cell">{{ item[value] }}</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </li>
        <li class="u-flex__item is-clamp">
          <div class="u-gantt__scroll u-gantt---right">
            <table>
              <tbody>
                <tr v-for="(item, rowIndex) in list" :key="rowIndex" class="u-gantt-bars">
                  <td v-for="(a, dayIndex) in dateRangeDay" :key="dayIndex" :class="getDateWeekClass(getIndexDate(dayIndex))">
                    <div class="u-gantt-cell">
                      <template v-if="getIndexDate(dayIndex) === getStringDate(item.startDate)">
                        <!-- 渲染条目 bar 条形图 -->
                        <div class="u-gantt-bar" :title="item.title + '\n' + item.startDate + '~' + item.endDate" :style="getBarStyle(item, dayIndex)">
                          <div class="u-gantt-bar__title" @click="$emit('on-item-click', item, $event)">{{ item.title }}</div>
                        </div>
                        <!-- 世纪开始 -->
                        <div v-if="getActualStyle(item, dayIndex)" class="u-gantt-actual" :style="getActualStyle(item, dayIndex)">
                          <div class="u-gantt-actual__title">{{ item.title }}</div>
                        </div>
                      </template>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </li>
      </ul>
    </div>
    <!-- 下部滚动条 -->
    <div class="u-gantt-scroll">
      <ul class="u-flex u-flex--start">
        <li :style="{ width: sideWidth + 'px' }" class="is-clamp">
          <div class="u-gantt__scroll" @scroll="scrollLeft">
            <div style="height: 0">
              <table>
                <thead>
                  <tr class="u-gantt-rows">
                    <td v-for="(item, index) in labelList" :key="index" :style="{ width: item.width + 'px' }">
                      <div class="u-gantt-cell">{{ item.label }}</div>
                    </td>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
        </li>
        <li class="u-flex__item is-clamp">
          <div class="u-gantt__scroll" @scroll="scrollRight">
            <div style="height: 0">
              <table>
                <thead>
                  <tr class="u-gantt-bars">
                    <td v-for="(a, dayIndex) in dateRangeDay" :key="dayIndex" :class="getDateWeekClass(getIndexDate(dayIndex))">
                      <div class="u-gantt-cell">
                        <div :title="getIndexDate(dayIndex)" v-text="headDateFromt(getIndexDate(dayIndex))"></div>
                      </div>
                    </td>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import shaonq from 'shaonq'
export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    skin: {
      type: String,
      default: '',
    },
    labelList: {
      type: Array,
      default: () => {
        return [
          {
            label: '任务名称',
            value: 'title',
            width: 150,
          },
          {
            label: '开始时间',
            value: 'startDate',
            width: 90,
          },
          {
            label: '结束时间',
            value: 'endDate',
            width: 90,
          },
          // actualStartDate actualEndDate
        ]
      },
    },
  },
  data() {
    return {
      dayPX: {
        width: 33,
        height: 33,
      },
      sideWidth: 360,
    }
  },
  computed: {
    // 计算时间
    dateRange() {
      const date = shaonq.date
      const list = Object.assign([], this.list).map(({ startDate, endDate }) => [this.getDateNumber(startDate, true), this.getDateNumber(endDate, true)])
      const minDate = date.addDays(
        -1,
        date.toString(
          Math.min.apply(
            null,
            list.map(([a, b]) => a)
          )
        )
      )
      const maxDate = date.addDays(
        1,
        date.toString(
          Math.max.apply(
            null,
            list.map(([a, b]) => b)
          )
        )
      )
      return { minDate, maxDate, rangeDay: this.getDateDiff(maxDate, minDate) }
    },
    /**
     * 周期最小为30天
     */
    dateRangeDay() {
      return this.dateRange.rangeDay > 30 ? this.dateRange.rangeDay : 30
    },
  },
  mounted() {
    const dom = shaonq.dom
    const $gantt = this.$refs.gantt
    // 计算实际的高度
    const offsetHeight = dom.el('.u-gantt-head', $gantt).offsetHeight + dom.el('.u-gantt-scroll', $gantt).offsetHeight
    dom.el('.u-gantt-warp', $gantt).style.height = $gantt.offsetHeight - offsetHeight + 'px'
    /**@debug */
    // window.debug = this;
  },
  methods: {
    getDateNumber(day, isNow) {
      let time
      try {
        time = shaonq.date.toDate(day)
      } catch (e) {
        //
      }
      if (!time) {
        time = isNow ? new Date() : 0
      }
      return +time
    },
    getDateDiff(endDate, startDate) {
      const date = shaonq.date
      endDate = this.getStringDate(endDate)
      startDate = this.getStringDate(startDate)
      // offset 1 day
      return (date.toDate(endDate) - date.toDate(startDate)) / (24 * 3600 * 1000) + 1
    },
    getIndexDate(index) {
      return shaonq.date.addDays(index, this.getStringDate(this.dateRange.minDate))
    },
    getStringDate(date) {
      if (!date) {
        return ''
      }
      if (typeof date !== 'string') {
        return shaonq.date.toString(date)
      }
      return shaonq.date.toString(shaonq.date.toDate(date))
    },
    getDateWeekClass(date) {
      const sat = shaonq.date.satOfWeek(date)
      const sun = shaonq.date.sunOfWeek(date)
      return {
        'is-week': date === sat || date === sun,
      }
    },
    headDateFromt(date) {
      const day = +date.slice(-2)
      return day
    },
    // 计划开始时间
    getBarStyle(item, dayIndex) {
      if (this.getDateNumber(item.startDate) && this.getDateNumber(item.endDate)) {
        const diffday = this.getDateDiff(item.endDate, item.startDate)
        return {
          width: this.dayPX.width * (diffday < 0 ? 0 : diffday) + 'px',
          height: this.dayPX.height + 'px',
          left: this.dayPX.width * dayIndex + 'px',
        }
      }
      return false
    },
    getActualStyle(item, dayIndex) {
      const actualStartDate = this.getDateNumber(item.actualStartDate)
      const actualEndDate = this.getDateNumber(item.actualEndDate, true)
      if (actualStartDate) {
        const diffDate = this.getDateDiff(actualEndDate, actualStartDate)
        const diffMin = this.getDateDiff(actualStartDate, this.dateRange.minDate)
        if (diffDate > 0) {
          return {
            width: this.dayPX.width * diffDate + 'px',
            height: this.dayPX.height + 'px',
            left: this.dayPX.width * diffMin + 'px',
          }
        }
      }
      return false
    },
    // 滚动条
    scrollLeft(ev) {
      const left = ev.target.scrollLeft
      shaonq.dom.els('.u-gantt---left', this.$refs.gantt).forEach((el) => {
        el.scrollLeft = left
      })
    },
    scrollRight(ev) {
      const left = ev.target.scrollLeft
      shaonq.dom.els('.u-gantt---right', this.$refs.gantt).forEach((el) => {
        el.scrollLeft = left
      })
    },
  },
}
</script>

<style lang="scss">
/** var */
$font-color: #212121;
$blue-color: #4795ef;
$red-color: #ff4e20;
$green-color: #11a668;
$light-color: #888;
$border-color: mix(lighten($light-color, 30%), $blue-color, 90%);
$border-color--light: lighten($border-color, 14%);
$space: 12px;
$space--16: 16px;
$space--20: 20px;

.u-gantt {
  min-height: 175px;
  height: 100%;
  position: relative;
  border: 1px solid $border-color--light;
  table {
    table-layout: fixed;
  }
  thead {
    background-color: #f4f4f4;
    .is-week {
      color: $red-color;
    }
  }
  tbody {
    .is-week {
      background-color: rgba(234, 190, 56, 0.05);
    }
  }
  th,
  td {
    border: 1px solid $border-color--light;
    font-size: 13px;
  }
  .u-gantt-rows {
    td {
      text-align: left;
    }
  }
  .u-gantt-bars {
    td {
      width: 30px;
    }
  }
  &-cell {
    line-height: 30px;
    height: 30px;
    padding: 0 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    box-sizing: border-box;
  }
  &-warp {
    height: 100%;
  }
  &__scroll {
    position: relative;
    overflow: hidden;
  }
  &-bar,
  &-actual {
    position: absolute;
    box-sizing: border-box;
    text-align: left;
    background-clip: content-box;
    user-select: none;
    &__title {
      position: relative;
      height: 20px;
      line-height: 16px;
      font-size: 12px;
      margin: 7px 5px 0;
      padding: 0 5px;
      border-radius: 3px;
      box-sizing: border-box;
      background-color: rgba($blue-color, 0.83);
      border: 1px solid rgba($blue-color, 0.91);
    }
  }
  &-bar__title {
    color: #fff;
  }
  &-actual__title {
    margin: 7px 6px 0;
    background-color: mix($red-color, #fff, 20);
    color: mix(#000, $light-color, 10);
  }
  .u-gantt-bars .u-gantt-cell {
    text-align: center;
    cursor: default;
    user-select: none;
  }
  // 滚动条目
  .u-gantt-head,
  .u-gantt-warp {
    overflow-y: scroll;
  }
  .u-gantt-scroll {
    .u-gantt__scroll {
      overflow-x: scroll;
    }
  }

  // 美化边框线条
  .u-gantt-rows,
  .u-gantt-bars {
    td:first-child {
      border-left: 0px;
    }
  }
}
</style>
