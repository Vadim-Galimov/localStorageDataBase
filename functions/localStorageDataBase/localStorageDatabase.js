const localStorageDataBase = {
  commands: {
    getDataBaseItemList() {
      const dBList = [];
      for (let i = 0; i < localStorage.length; i++) {
        dBList.push([localStorage.key(i)]);
      }

      return dBList;
    },
    addTable(tableName) {
      localStorage.setItem(tableName, [[""]]);
    },
    deleteTable(tableName) {
      localStorage.removeItem(tableName);
    },
    getTable(tableName) {
      string = localStorage.getItem(tableName);
      return string;
    },
  },
};
