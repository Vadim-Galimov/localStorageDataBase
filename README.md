# Local Storage Database

1. Письменное описание
    1. Цель

Цель программы симулировать базу данных внутри браузера, чтобы использовать её для учебных и других простых проектов, не прибегая к другим языкам и технологиям. Будет выводить базу данных в табличном виде, чтобы редактировать её и иметь возможность сохранить. Также добавлять и удалять базы данных. А ещё испрользовать метаданные, например чтобы создаввать связи между таблицами
    2. функционал

-открыть список баз данных списком

-возможность открыть любую бд для просмотра и редактирования

-возможность удалить любую бд

-возможность добавить новую бд

-добаить столбец к бд

-добавить строку к бд

-редактировать любую бд

-сохранить изменения в бд

-переименовать бд

2. Запуск

document.addEventListener("DOMContentLoaded", () => {
  let dbTableManager = new localStorageDataBase( document.querySelector(`#workspace`));
  dbTableManager.openTableList()});

document.querySelector(`#workspace`) - див, в который будет выводиться программа



3. Интерфейс


### окна

#### список баз данных

Список баз данных, с возможностью удалить базу данных, открыть её, или добавить новую

##### Добавить базу данных

Поле куда будет вводиться и кнопка добавления

-можно создать новую бд и дать ей имя

##### список с кнопками управления

Список таблиц и справа от каждой две кнопки: открыть и удалить

-можно открыть удалить бд

-можно удалить любую бд

#### редактор базы данных

База данных, с кнопками добавления строк, столбцов, кнопками удаления строк столбцов, кнопкой сохранения бд и возврата к списку

##### панель управления

-сохранить таблицу

-добавить строку

-добавить колонку

###### редактор заголовка

-можно переименовать заголовок

##### база данных

-можно редактировать любую ячейку

-удалить любую строку

-удалить любой столбец

## объекты и модули

dbTableManager - основной объект, внутри него вся программа

### модули

#### localStorageDataBase

Стандартные команды localStoage но с возможностью быстро получить список бд, а ещё получить бд в формате JSON
