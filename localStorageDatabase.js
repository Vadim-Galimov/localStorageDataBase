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
  
      data = localStorage.getItem(tableName);
      let items;

    

      if (isJsonString(data)) {
        items = JSON.parse(data);
      } else {
        items = [[data]];
      }

      console.log(2444444, items, data, tableName)
      if (items.length == 0) items.push([""]);



      return items;

      function isJsonString(str) {
        try {
          JSON.parse(str);
        } catch (e) {
          return false;
        }
        return true;
      }



    },
  },
};
