const upCaseFirstLetter = (input: string):string => {
    const inputArr = [...input];
    inputArr[0] = inputArr[0].toLocaleUpperCase();
    return inputArr.join('');
};

const lowerCaseFirstLetter = (input: string):string => {
    const inputArr = [...input];
    inputArr[0] = inputArr[0].toLowerCase();

    return inputArr.join('');
};

export {upCaseFirstLetter, lowerCaseFirstLetter};