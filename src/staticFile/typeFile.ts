import { upCaseFirstLetter } from "./stringUtils";

const buildTypeFile = (name: string): string => {
return `// type file for ${name} component created by extension
type ${upCaseFirstLetter(name + 'Type')} = {
  [key: string]: any
}
type ${upCaseFirstLetter(name + 'InitParams')} = {
  [key: string]: any
}
export type { ${upCaseFirstLetter(name + 'Type')}, ${upCaseFirstLetter(name + 'InitParams')} }
`;
};

export default buildTypeFile;