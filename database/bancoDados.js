import * as SQLite from "expo-sqlite";

let banco;

export async function conectarBanco() {
  if (!banco) {
    banco = await SQLite.openDatabaseAsync("receitas.db");
    await banco.execAsync(`PRAGMA journal_mode = WAL`);
  }
  return banco;
}

export async function criarTabela() {
  const db = await conectarBanco();
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS receitas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      descricao TEXT NOT NULL,
      instrucoes TEXT NOT NULL
    );
  `);
}

export async function adicionarReceita(titulo, descricao, instrucoes) {
  const db = await conectarBanco();
  const resultado = await db.runAsync(
    "INSERT INTO receitas (titulo, descricao, instrucoes) VALUES (?, ?, ?);",
    titulo,
    descricao,
    instrucoes
  );
  return resultado.lastInsertRowId;
}

export async function listarReceitas() {
  const db = await conectarBanco();
  const receitas = await db.getAllAsync("SELECT * FROM receitas ORDER BY id DESC;");
  return receitas;
}

export async function buscarReceitas(termo) {
  const db = await conectarBanco();
  const receitas = await db.getAllAsync(
    "SELECT * FROM receitas WHERE titulo LIKE ? OR descricao LIKE ? ORDER BY id DESC;",
    [`%${termo}%`, `%${termo}%`]
  );
  return receitas;
}

export async function atualizarReceita(id, titulo, descricao, instrucoes) {
  const db = await conectarBanco();
  await db.runAsync(
    "UPDATE receitas SET titulo = ?, descricao = ?, instrucoes = ? WHERE id = ?;",
    titulo,
    descricao,
    instrucoes,
    id
  );
}

export async function deletarReceita(id) {
  const db = await conectarBanco();
  await db.runAsync("DELETE FROM receitas WHERE id = ?;", id);
}

export async function obterReceita(id) {
  const db = await conectarBanco();
  const receita = await db.getFirstAsync("SELECT * FROM receitas WHERE id = ?;", id);
  return receita;
}

// Função para inserir receitas padrão
export async function inserirReceitasPadrao() {
  const db = await conectarBanco();
  const receitas = await listarReceitas();
  
  // Se não há receitas, inserir as receitas padrão
  if (receitas.length === 0) {
    const receitasPadrao = [
      {
        titulo: "🍝 Macarrão à Carbonara",
        descricao: "Clássico italiano com molho cremoso de ovos e bacon",
        instrucoes: "1. Cozinhe o macarrão até ficar al dente\n2. Frite o bacon até ficar crocante\n3. Misture ovos batidos com queijo parmesão ralado\n4. Junte o macarrão quente com o bacon e o molho de ovos\n5. Mexa rapidamente para formar o molho cremoso e sirva imediatamente"
      },
      {
        titulo: "🥗 Salada Mediterrânea",
        descricao: "Salada fresca com tomate, pepino e queijo feta",
        instrucoes: "1. Corte tomates, pepinos e cebolas em cubos\n2. Adicione azeitonas pretas e queijo feta esmigalhado\n3. Tempere com azeite, limão, sal e orégano\n4. Misture tudo delicadamente\n5. Sirva fresca, acompanhada de pão sírio"
      },
      {
        titulo: "🍲 Sopa de Abóbora com Gengibre",
        descricao: "Sopa cremosa, levemente picante e reconfortante",
        instrucoes: "1. Refogue cebola e alho no azeite\n2. Acrescente abóbora picada e gengibre ralado\n3. Cubra com caldo de legumes e cozinhe até a abóbora amolecer\n4. Bata tudo no liquidificador até ficar cremoso\n5. Volte para a panela, ajuste o sal e sirva com creme de leite"
      },
      {
        titulo: "🍗 Frango Assado com Ervas",
        descricao: "Frango suculento temperado com ervas frescas e limão",
        instrucoes: "1. Tempere o frango com sal, pimenta, alho e ervas frescas\n2. Regue com suco de limão e azeite\n3. Deixe marinar por 2 horas na geladeira\n4. Asse em forno pré-aquecido a 200°C por 1 hora\n5. Deixe descansar por 10 minutos antes de servir"
      }
    ];

    for (const receita of receitasPadrao) {
      await adicionarReceita(receita.titulo, receita.descricao, receita.instrucoes);
    }
  }
}