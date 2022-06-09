<template>
  <div>
    <div class="u-quill-body">
      <h1></h1>
      <div class="u-scroll" style="max-height: 300px; padding-right: 10px">
        <div>
          <table class="xlsx">
            <tr>
              <th>A</th>
              <th>B</th>
              <th>C</th>
              <th>D</th>
              <th>E</th>
              <th>F</th>
              <th>G</th>
              <th>H</th>
            </tr>
            <tr v-for="(item, index) in list" :key="index">
              <th>{{ index + 1 }}</th>
              <td v-for="(self, i) in item" :key="i">{{ self }}</td>
            </tr>
          </table>
        </div>
      </div>

      <a class="u-btn u-mt" @click="exportXLSX()">导出xlsx</a>
      <!-- pdf view -->
      <div style="margin-top: 40px">
        <div ref="view"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    src: String,
  },
  data() {
    return {
      list: [],
    };
  },
  methods: {
    exportXLSX() {
      const othis = this;
      let data = Object.assign([], this.list).map((obj) => Object.values(obj));
      let { loadJs } = this.$util;

      (async function () {
        try {
          if (typeof XLSX === "undefined") {
            console.time("xlsx v0.16.8");
            // @demo:https://sheetjs.com/demo/manifest.html
            await loadJs(
              "https://cdn.staticfile.org/xlsx/0.16.8/xlsx.full.min.js"
            );
            console.timeEnd("xlsx v0.16.8");
          }
          // 设置表格样式，!cols为列宽
          const options = {
            "!cols": [
              { wpx: 30 },
              { wpx: 40 },
              { wpx: 50 },
              { wpx: 60 },
              { wpx: 70 },
              { wpx: 70 },
              { wpx: 70 },
              { wpx: 70 },
            ],
          };
          // const ws = XLSX.utils.json_to_sheet(data)
          const ws = XLSX.utils.aoa_to_sheet(data);
          ws["!cols"] = options["!cols"];
          console.log(ws);
          // 创建 Book
          const wb = XLSX.utils.book_new();
          // 添加 Sheet1
          XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
          // 导出
          XLSX.writeFile(wb, "demo.xlsx");
        } catch (error) {
          othis.$util.toast(String(error));
        }
      })();
    },
  },
  async mounted() {
    // var file = obj.files[0];
    // var reader = new FileReader();
    // reader.onload = function (e) {
    //   var data = e.target.result;
    //   excelData = XLSX.read(data, {
    //     type: 'binary'
    //   });
    //   //excelData.SheetNames[0]是获取Sheets中第一个Sheet的名字
    //   //excelData.Sheets[Sheet名]获取第一个Sheet的数据
    //   var json = XLSX.utils.sheet_to_json(excelData.Sheets[excelData.SheetNames[0]]);
    //   document.querySelector("p").innerHTML = JSON.stringify(json, null, "\t");
    // };
    // reader.readAsBinaryString(file);

    this.$util.showLoading("正在生成数据");
    await this.$util.loadJs("http://mockjs.com/dist/mock.js");
    let time = +new Date();
    let data = Mock.mock({
      "list|50": [
        {
          no: "BH00@natural(01, 100)",
          name: "@city()",
          "paymentType|1": "@natural(0, 1)",
          "contractType|1": "@natural(0, 2)",
          updateTime: "2020-05-30",
          amount: "@natural(10, 500),000",
          adminName: "@cname()",
        },
      ],
    });
    this.list = data.list;
    let timeEnd = +new Date() - time;
    this.$util.toast(`生成用时${timeEnd}ms`);
  },
};
</script>

<style lang="scss" scoped>
.xlsx {
  width: auto;
  min-width: 100%;
  font-size: 14px;
  line-height: 24px;
  color: #454545;
  td {
    border: 1px solid #e2e2e2;
  }
  th {
    background-color: #e2e2e2;
    border: 1px solid #d4d4d4;
    font-weight: 500;
  }
}
</style>
