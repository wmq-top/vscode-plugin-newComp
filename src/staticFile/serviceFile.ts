import { upCaseFirstLetter } from "./stringUtils";

const buildServieFile = (name: string): string => {
  return `// service for ${name} component create by extension
import axios from 'axios'
import type * as type from './types'

class ${upCaseFirstLetter(name + 'Service')} {
  // 获取初始化数据
  static async getInitData(params: type.${upCaseFirstLetter(name + 'InitParams')}):Promise<any> {
    const requestPath = ''
    const { data } = await axios.get(requestPath, {
      params,
    })

    return data?.result || ''
  }
}

export default ${upCaseFirstLetter(name + 'Service')}
`;
};

export default buildServieFile;