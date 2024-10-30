import basicTable from "./main.vue";
basicTable.install = (Vue: { component: (arg0: any, arg1: any) => any; }) => Vue.component(basicTable.name, basicTable);
export default basicTable;
