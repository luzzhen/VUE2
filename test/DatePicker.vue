<template>
  <div class="date-picker" v-click-outside>
    <div class="picker-input">
      <span class="input-prefix">
        <i class="iconfont icon-date"></i>
      </span>
      <input type="text" :value="chooseDate" />
    </div>
    <div class="picker-panel" v-if="showPanle">
      <div class="picker-arrow" />
      <div class="picker-body">
        <div class="picker-header">
          <span
            class="picker-btn iconfont icon-prev-year"
            @click="changeYear('prev')"
          />
          <span
            class="picker-btn iconfont icon-prev-month"
            @click="changeMonth('prev')"
          />
          <span class="picker-date">
            {{ showDate.year }}年{{ showDate.month + 1 }}月
          </span>
          <span
            class="picker-btn iconfont icon-next-month"
            @click="changeMonth('next')"
          />
          <span
            class="picker-btn iconfont icon-next-year"
            @click="changeYear('next')"
          />
        </div>
        <div class="picker-content">
          <div class="picker-weeks">
            <div
              v-for="week in ['日', '一', '二', '三', '四', '五', '六']"
              :key="week"
            >
              {{ week }}
            </div>
          </div>
          <div class="picker-days">
            <div
              v-for="date in showDay"
              :key="date.getTime()"
              :class="{
                'other-month': !isCur(date).month,
                'is-today': isCur(date).curDay,
                'is-select': isCur(date).selected,
              }"
              @click="changeDate(date)"
            >
              {{ date.getDate() }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  directives: {
    "click-outside": {
      bind(el, binding, vnode) {
        const vm = vnode.context;
        document.onclick = function (e) {
          const dom = e.target;
          const isElSon = el.contains(dom);
          // console.log(binding ,vnode , vm);
          // console.log(isElSon);
          if (isElSon && !vm.showPanle) {
            vm.changePanle(true);
          } else if (!isElSon && vm.showPanle) {
            vm.changePanle(false);
          }
        };
      },
    },
  },
  model:{
    prop:"date",
    event:'change-date'
  },
  props: {
    date: {
      type: Date,
      default: () => new Date(),
    },
  },
  data() {
    return {
      showPanle: true,
      showDate: {
        year: 0,
        month: 0,
        day: 0,
      },
    };
  },
  created() {
    // console.log(this.date);
    // console.log(this.chooseMonth);
    // console.log(this.showDay);
    // console.log(this.date);
    this.getShowDate(this.date);
    // console.log(this.showDate);
  },
  // mounted() {
  //   console.log(this.showDay);
  // },
  computed: {
    chooseDate() {
      const { year, month, day } = this.getYearMonthDay(this.date);
      return `${year}-${month + 1}-${day}`;
    },
    showDay() {
      const { year, month } = this.showDate;
      console.log(year, month);
      const firstDay = new Date(year, month, 1);
      // console.log(firstDay);
      const week = firstDay.getDay();
      const startDay = firstDay - week * 24 * 60 * 60 * 1000;
      // console.log(firstDay,week,firstDay.getTime(),startDay);

      let arr = [];
      for (let i = 0; i < 42; i++) {
        // console.log(i);
        arr.push(new Date(startDay + i * 24 * 60 * 60 * 1000));
      }
      // console.log(arr);
      return arr;
    },
  },
  methods: {
    changePanle(flag) {
      this.showPanle = flag;
    },
    getYearMonthDay(date) {
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();
      return {
        year,
        month,
        day,
      };
    },
    getShowDate(date) {
      const { year, month, day } = this.getYearMonthDay(date);
      this.showDate = {
        year,
        month,
        day,
      };
    },
    isCur(date) {
      const { year: showYear, month: showMonth } = this.showDate; //显示的年月日
      const { year, month, day } = this.getYearMonthDay(date); //date传进来的的年月日

      //选中的日期
      const chooseDate = new Date(this.chooseDate);
      const {
        year: chooseYear,
        month: chooseMonth,
        day: chooseDay,
      } = this.getYearMonthDay(chooseDate);
      const {
        year: curYear,
        month: curMonth,
        day: curDay,
      } = this.getYearMonthDay(new Date());
      //  console.log(this.chooseDate);
      //  console.log(this.showDate);
      // console.log(chooseDate);
      // console.log(date,month,showMonth,year,showYear, year !== showYear && month !== showMonth);
      return {
        month: year === showYear && month === showMonth,
        selected:
          year === chooseYear && month === chooseMonth && day === chooseDay,
        curDay: year == curYear && month === curMonth && day === curDay,
      };
    },
    changeDate(date) {
      this.$emit("change-date", date);
      console.log(date);
      // const {year ,month ,day } =this.getYearMonthDay(date)
      // console.log(year,month,day);
      // this.chooseDate =`${year}-${month + 1}-${day}`;
      // //chooseDate 、this.date是父组件传递过来的数据，在子组件中是不能被更改的
      // // 所以需要告诉父组件更改
      this.changePanle(false);
      this.getShowDate(date);
    },
    changeMonth(type) {
      console.log(type);
      const moveMonth = type === 'prev' ? -1 : 1;
      console.log(this.showDate);
      let { year , month , day} = this.showDate;
      const newShowDate = new Date(year,month, day);
      newShowDate.setMonth(month + moveMonth);
      const {year:newYear, month: newMonth} = this.getYearMonthDay(newShowDate)
      this.showDate.year = newYear,
      this.showDate.month = newMonth

      // console.log(month);
      // month += moveMonth;
      // if(month >11){
      //   month =1 ;
      //   year ++;
      // }else if(month < 1 ){
      //   month = 11
      //   year --;
      // }
      // console.log(moveMonth);
      // this.showDate.month = month;
      // this.showDate.year = year;
    },
    changeYear(type){
       const moveYear = type === 'prev' ? -1 : 1;
       this.showDate.year += moveYear;
    },
  },
};
</script>

<style scoped>
@import "./assets/font.css";

.date-picker {
  /* background-color: red; */
  display: inline-block;
}

.picker-input {
  position: relative;
}

.picker-input input {
  height: 40px;
  line-height: 40px;
  padding: 0 30px;
  background-color: #fff;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
}

.picker-input .input-prefix {
  position: absolute;
  left: 5px;
  width: 25px;
  height: 100%;
  line-height: 40px;
  text-align: center;
  color: #c0c4cc;
}

.picker-panel {
  position: absolute;
  width: 322px;
  height: 329px;
  margin-top: 5px;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.picker-panel .picker-arrow {
  position: absolute;
  top: -12px;
  left: 30px;
  width: 0;
  height: 0;
  border: 6px solid transparent;
  border-bottom-color: #ebeef5;
}

.picker-panel .picker-arrow::after {
  position: absolute;
  left: -6px;
  top: 1px;
  content: "";
  display: block;
  width: 0;
  height: 0;
  border: 6px solid transparent;
  border-bottom-color: #fff;
  border-top-width: 0;
}

.picker-panel .picker-body {
}

.picker-panel .picker-header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 15px;
  padding-bottom: 10px;
}
.picker-panel .picker-btn {
  margin-right: 5px;
  margin-left: 5px;
  font-size: 12px;
  color: #303133;
  cursor: pointer;
}

.picker-panel .picker-date {
  margin-left: 60px;
  margin-right: 60px;
  font-size: 14px;
  user-select: none;
}

.picker-panel .picker-content {
  padding: 0 10px 10px 10px;
  color: #606266;
  user-select: none;
}

.picker-panel .picker-weeks {
  display: flex;
  justify-content: space-around;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #ebeef5;
}

.picker-panel .picker-days {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.picker-panel .picker-days div {
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  margin: 4px 6px;
  font-size: 12px;
  cursor: pointer;
}

.picker-panel .picker-days div:hover {
  color: #409eff;
}

.picker-panel .picker-days div.is-today {
  color: #409eff;
  font-weight: 700;
}

.picker-panel .picker-days div.is-select {
  border-radius: 50%;
  background-color: #409eff;
  color: #fff;
}

.picker-panel .picker-days div.other-month {
  color: #c0c4cc;
}
</style>