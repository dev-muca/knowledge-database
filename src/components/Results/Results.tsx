import { ChangeEvent, useContext, useState } from "react";

import { TutorialContext } from "@/context/TutorialContext";
import { twMerge } from "tailwind-merge";
import TextEditor from "../TextEditor";
import Tutorial from "@/interfaces/Tutorial";
import { BiLoaderAlt } from "react-icons/bi";

const Results = () => {
  const {
    id,
    titles,
    allTitles,
    tutorial,
    editMode,
    loading,
    error,
    message,
    setId,
    setEditMode,
    setTutorial,
    saveTutorial,
    deleteTutorial,
  } = useContext(TutorialContext);
  const [remove, setRemove] = useState<boolean>(false);

  function newTutorial() {
    setEditMode(true);
    setTutorial({ title: "", content: "" });
  }

  function editTutorial() {
    setEditMode(true);
  }

  function setTutorialTitle(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.currentTarget;
    setTutorial((prevData: Tutorial) => ({ ...prevData, [name]: value }));
  }

  return (
    <section className="flex flex-row mt-10 rounded-md shadow-xl overflow-hidden h-[90vh]">
      <aside className="bg-slate-700 w-80 text-white">
        <ul className="w-full h-full pb-6 overflow-y-auto scrollbar-none">
          {titles &&
            allTitles.map((title) => (
              <li
                key={title.title}
                onClick={() => {
                  setId(title.id!);
                  setEditMode(false);
                }}
                className={twMerge(
                  "px-4 py-2 relative after:block after:absolute after:content-[''] after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-[90%] after:border-b after:border-b-slate-500 hover:text-white cursor-pointer text-slate-300",
                  title.id === id && "text-white"
                )}
              >
                {title.title}
              </li>
            ))}
        </ul>
      </aside>

      <main className="bg-white flex-1 overflow-y-auto scrollbar-none">
        <header className="min-h-16 flex flex-row justify-between relative after:block after:absolute after:content-[''] after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-[98%] after:border-b">
          <h2 className="text-2xl px-4 py-2 text-cyan-600 w-full relative">
            {editMode ? (
              <input
                type="text"
                name="title"
                placeholder="Informe o título do tutorial aqui..."
                className="w-full px-4 py-2"
                value={tutorial.title}
                onChange={setTutorialTitle}
              />
            ) : (
              <p className="w-full h-full px-4 py-2">{tutorial.title}</p>
            )}
          </h2>
          {editMode ? (
            <div className="flex gap-2 justify-around items-center pr-4">
              <button
                onClick={saveTutorial}
                className="min-w-20 min-h-10 bg-slate-700  text-white px-4 py-2 rounded-md hover:bg-cyan-700 grid place-items-center text-nowrap"
              >
                {loading ? (
                  <BiLoaderAlt className="animate-spin" />
                ) : (
                  <span className="text-nowrap">
                    {error ? <>{() => alert(`ERROR AO SALVAR TUTORIAL: ${error.toString()}`)}</> : message}
                  </span>
                )}
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="min-w-20 min-h-10 bg-slate-700  text-white px-4 py-2 rounded-md hover:bg-rose-700"
              >
                Cancelar
              </button>
            </div>
          ) : (
            <>
              <div className="flex flex-col justify-center items-center gap-2 p-2 lg:flex-row lg:pr-4">
                <button
                  onClick={newTutorial}
                  className="min-w-20 min-h-10 bg-slate-700  text-white px-4 py-2 rounded-md hover:bg-cyan-700"
                >
                  Novo
                </button>
                {id > 0 && (
                  <>
                    <button
                      onClick={editTutorial}
                      className="min-w-20 min-h-10 bg-slate-700  text-white px-4 py-2 rounded-md hover:bg-cyan-700"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => {
                        setRemove(!remove);
                        setTimeout(() => setRemove(false), 5000);
                      }}
                      className="min-w-20 min-h-10 bg-slate-700  text-white px-4 py-2 rounded-md hover:bg-rose-700"
                    >
                      {remove ? (
                        <strong className="text-nowrap" onClick={deleteTutorial}>
                          CONFIRMAR EXCLUSÃO!?
                        </strong>
                      ) : (
                        <span>Excluir</span>
                      )}
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </header>

        {editMode ? (
          <TextEditor />
        ) : (
          <div className="px-8 py-4" dangerouslySetInnerHTML={{ __html: tutorial.content }} />
        )}
      </main>
    </section>
  );
};

export default Results;
