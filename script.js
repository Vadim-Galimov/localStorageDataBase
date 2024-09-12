



const dbTableManager = {


  









    openTableList() { 

      dbTableManager.workspace =document.querySelector(`#workspace`);

  
      dbTableManager.workspace.innerHTML = '';
 

        dbList = localStorageDataBase.commands.getDataBaseItemList();

        list = new HTMLTable({
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


        function createDb(dbName) {
          localStorageDataBase.commands.addTable(dbName);
          dbTableManager.openTableList();
        }
      
        function open(event) {
          
          let key = list.buttonMethods.getRowKey(event);
          dbTableManager.openTableEditor(key);
        }
        function deleteRow(event) {
         let key = list.buttonMethods.getRowKey(event);
      
         localStorageDataBase.commands.deleteTable(key);
          dbTableManager.openTableList();
        }
      

  
    },
    openTableEditor(key) {
    
        dbTableManager.workspace.innerHTML = '';

        let items = localStorageDataBase.commands.getTable(key)



        list = new HTMLTable({
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
          list.tableKey = key;

          saveTable()

        }

        function saveTable() {
 
  
 
          items = list.buttonMethods.getTableAfterEdit();
          localStorage.setItem(list.tableKey, JSON.stringify(items));
          dbTableManager.openTableEditor(key);


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



    },
  
};



document.addEventListener("DOMContentLoaded", dbTableManager.openTableList);
