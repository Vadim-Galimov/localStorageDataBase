


class localStorageDataBase  {

  constructor( workspace) {

    this.workspace = workspace;
 
  }







    openTableList() { 


  
      this.workspace.innerHTML = '';


        let dbList = this.getDataBaseItemList();



         function createDbFunc(dbName) {
          this.addTable(dbName);

          this.openTableList();
        }
      
        function openFunc(event) {

          
          let key = list.buttonMethods.getRowKey(event);
          this.openTableEditor(key);
        }


        let deleteRowFunc = function(event) {
         let key = list.buttonMethods.getRowKey(event);
      
         localStorage.removeItem(key);
         this.openTableList();
        }
      
        let open = openFunc.bind(this);
        let createDb = createDbFunc.bind(this);
        let deleteRow = deleteRowFunc.bind(this);
        
        let list = new HTMLTable({
          tablePlace: this.workspace,
          rowButtons: [
            {
              buttonText: "open",
              buttonFunction: open,
            },
            {
              buttonText: "delete",
              buttonFunction: deleteRow,
            },
          ],
          columnButtons: [],
          headers: ["база данных"],
          items: dbList,
          input: {value:"", buttons:[{buttonText: "Add db", buttonFunction: createDb}]},
          itemTag: "span",
          tableKey: "table list",
          divButtons: [],
        });

        list.createTable();

  
    }
    openTableEditor(key) {

  
    
      this.workspace.innerHTML = '';

        let items = this.getTable(key)

        let deleteRow = deleteRowFunc.bind(this);
        let deleteColumn = deleteColumnFunc.bind(this);
        let changeTableTitle = changeTableTitleFunc.bind(this);
        let saveTable = saveTableFunc.bind(this);
        let addColumn = addColumnFunc.bind(this);
        let addRow = addRowFunc.bind(this);

        let list = new HTMLTable({
          tablePlace: this.workspace,
          rowButtons: [
            {
              buttonText: "delete row",
              buttonFunction: deleteRow,
            },
          ],
          columnButtons: [
            { buttonText: "delete column", buttonFunction: deleteColumn },
          ],
          headers: [],
          items: items,
          input: {value:key, buttons:[{buttonText: "change table name", buttonFunction: changeTableTitle}]},
          itemTag: "textarea",
          tableKey: key,
          divButtons: [
            {buttonText: "save table", buttonFunction: saveTable},
            {buttonText: "add column", buttonFunction: addColumn},
            {buttonText: "add row", buttonFunction: addRow},
          ],
        });

        list.createEditor();




        function changeTableTitleFunc(key) {
          localStorage.removeItem(list.tableKey);

          list.tableKey = key;

          localStorage.setItem(list.tableKey, JSON.stringify(items));

          this.openTableEditor(list.tableKey);



        }

        function saveTableFunc() {
 
  
    
          items = list.buttonMethods.getTableAfterEdit();
          localStorage.setItem(list.tableKey, JSON.stringify(items));

          this.openTableEditor(list.tableKey);


        }

       function addRowFunc() {
        
          items = list.buttonMethods.getTableAfterAddRow();
          localStorage.setItem(key, JSON.stringify(items));
          this.openTableEditor(key);
        }

        function addColumnFunc() {
   
          items = list.buttonMethods.getTableAfterAddColumn();
          
          localStorage.setItem(key, JSON.stringify(items));
          this.openTableEditor(key);
        }




        function deleteRowFunc(event) {
 

         let items = list.buttonMethods.getTableAfterDeleteRow();

          localStorage.setItem(key, JSON.stringify(items));
          this.openTableEditor(key);
        }

        function deleteColumnFunc(event) {

         let items = list.buttonMethods.getTableAfterDeleteColumn();
          localStorage.setItem(key, JSON.stringify(items));
          this.openTableEditor(key);
        }



    }


    getDataBaseItemList() {
      const dBList = [];
      for (let i = 0; i < localStorage.length; i++) {
        dBList.push([localStorage.key(i)]);
      }

      return dBList;
    }


    getTable(tableName) {
  
      let data = localStorage.getItem(tableName);
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



    }


    addTable(tableName) {
      localStorage.setItem(tableName, [[""]]);
    }
  
};





document.addEventListener("DOMContentLoaded", () => {
  let dbTableManager = new localStorageDataBase( document.querySelector(`#workspace`));
  dbTableManager.openTableList()});
