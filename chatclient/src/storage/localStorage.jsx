export const getLocalStorageItem = (key="", shouldParse = false) => {
    const item = localStorage.getItem(key);
    if (shouldParse && item) {
        return JSON.parse(item);
    }
    return item;
}