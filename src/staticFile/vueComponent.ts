import { upCaseFirstLetter } from "./stringUtils";
import type { ComponentConfig } from './types';

const buildVueComponent = (name: string, config?:ComponentConfig):string => {
  return `<!-- ${upCaseFirstLetter(name)} component created by extension -->
<template>
  <div>${upCaseFirstLetter(name)} Component</div>
  <div>{{ initData }}</div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import ${upCaseFirstLetter(name + 'Service')} from './${upCaseFirstLetter(name + 'Service')}'
import type * as type from './types'
// import { use${upCaseFirstLetter(name)}Store } from '@/store'

onMounted(() => {
  getInitData()
})

// #region 获取初始化数据
const initData = ref<unknown>()
const getInitData = () => {
  const params: type.${upCaseFirstLetter(name + 'InitParams')} = {}
  ${upCaseFirstLetter(name + 'Service')}.getInitData(params)
  .then((res: unknown) => {
    initData.value = res
  })
}
// #endregion

</script>

<style lang="${config?.cssType || 'scss'}" scoped></style>
`;
  
};

export default buildVueComponent;