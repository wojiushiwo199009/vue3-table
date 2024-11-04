// 导出button组件
import MyBasicTable from "./src/main.vue";

// 定义name，局部install和全局install时才能准确匹配
MyBasicTable.name = "my-basic-table";

// 添加组件的install属性，用于按需引入
MyBasicTable.install = function (Vue: any) {
  Vue.component(MyBasicTable.name, MyBasicTable);
};

export default MyBasicTable;
