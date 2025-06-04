import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('recipes.db');

export const createTables = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS recipes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        description TEXT,
        instructions TEXT
      );`
    );
  });
};

export const insertRecipe = (title, description, instructions, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO recipes (title, description, instructions) VALUES (?, ?, ?);',
      [title, description, instructions],
      (_, result) => callback(true),
      (_, error) => {
        console.error(error);
        callback(false);
      }
    );
  });
};

export const updateRecipe = (id, title, description, instructions, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'UPDATE recipes SET title = ?, description = ?, instructions = ? WHERE id = ?;',
      [title, description, instructions, id],
      (_, result) => callback(true),
      (_, error) => {
        console.error(error);
        callback(false);
      }
    );
  });
};

export const deleteRecipe = (id, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM recipes WHERE id = ?;',
      [id],
      (_, result) => callback(true),
      (_, error) => {
        console.error(error);
        callback(false);
      }
    );
  });
};

export const getAllRecipes = (callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM recipes;',
      [],
      (_, { rows }) => callback(rows._array),
      (_, error) => {
        console.error(error);
      }
    );
  });
};

export const searchRecipes = (keyword, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM recipes WHERE title LIKE ?;',
      [`%${keyword}%`],
      (_, { rows }) => callback(rows._array),
      (_, error) => console.error(error)
    );
  });
};

export default db;