export const prettyJson = (jsonAsString) => {
    const jsonObject = JSON.parse(jsonAsString);
    return JSON.stringify(jsonObject, undefined, 4);
};

export const isJsonString = (rule, value) => {
    try {
        const json = JSON.parse(value);
        return (typeof json === 'object');
    } catch (e) {
        return false;
    }
}
