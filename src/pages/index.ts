import basicTable from "./basic-table/index.ts";
// 存储组件列表
const components = [basicTable];
// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function (Vue: { component: (arg0: any, arg1: any) => void }) {
  // 判断是否安装
  if (install.installed) return;
  // 遍历注册全局组件
  components.forEach((component) => {
    Vue.component(component.name, component);
  });
};
// 判断是否是直接引入文件
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  basicTable,
};
