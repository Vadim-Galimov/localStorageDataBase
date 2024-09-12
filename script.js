


class TableManager  {

  constructor(tableName, workspace) {
    this.tableName = tableName;
    this.workspace = workspace;
  }







    openTableList() { 



  
      this.workspace.innerHTML = '';
      let dbTableManager = this
 

        let dbList = localStorageDataBase.commands.getDataBaseItemList();



         let createDb = function(dbName) {
          localStorageDataBase.commands.addTable(dbName);
          dbTableManager.openTableList();
        }
      
        let open = function(event) {
          
          let key = list.buttonMethods.getRowKey(event);
          dbTableManager.openTableEditor(key);
        }
        let deleteRow = function(event) {
         let key = list.buttonMethods.getRowKey(event);
      
         localStorageDataBase.commands.deleteTable(key);
          dbTableManager.openTableList();
        }
      

        
        let list = new HTMLTable({
          tablePlace: dbTableManager.workspace,
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
      let dbTableManager = this
    
        dbTableManager.workspace.innerHTML = '';

        let items = localStorageDataBase.commands.getTable(key)



        let list = new HTMLTable({
          tablePlace: dbTableManager.workspace,
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

        function changeTableTitle(key) {
          localStorage.removeItem(list.tableKey);

          list.tableKey = key;

          localStorage.setItem(list.tableKey, JSON.stringify(items));

          dbTableManager.openTableEditor(list.tableKey);



        }

        function saveTable() {
 
  
    
          items = list.buttonMethods.getTableAfterEdit();
          localStorage.setItem(list.tableKey, JSON.stringify(items));

          dbTableManager.openTableEditor(list.tableKey);


        }

       function addRow() {
        
          items = list.buttonMethods.getTableAfterAddRow();
          localStorage.setItem(key, JSON.stringify(items));
          dbTableManager.openTableEditor(key);
        }

        function addColumn() {
   
          items = list.buttonMethods.getTableAfterAddColumn();
          
          localStorage.setItem(key, JSON.stringify(items));
          dbTableManager.openTableEditor(key);
        }




        function deleteRow(event) {
 

         let items = list.buttonMethods.getTableAfterDeleteRow();

          localStorage.setItem(key, JSON.stringify(items));
          dbTableManager.openTableEditor(key);
        }

        function deleteColumn(event) {

         let items = list.buttonMethods.getTableAfterDeleteColumn();
          localStorage.setItem(key, JSON.stringify(items));
          dbTableManager.openTableEditor(key);
        }



    }
  
};





document.addEventListener("DOMContentLoaded", () => {
  let dbTableManager = new TableManager("dbTableManager", document.querySelector(`#workspace`));
  dbTableManager.openTableList()});
