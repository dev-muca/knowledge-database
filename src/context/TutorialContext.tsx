import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from "react";
import Tutorial from "@/interfaces/Tutorial";
import API_BASE_URL from "@/constants/API";
import HOW_TO_USE from "@/constants/USE";

interface ProviderProps {
  children: ReactNode;
}

interface ContextProps {
  id: number;
  search: string;
  editMode: boolean;
  titles: Tutorial[];
  tutorial: Tutorial;
  allTitles: Tutorial[];
  loading: boolean;
  message: string;
  error: any;
  setId: Dispatch<SetStateAction<number>>;
  setSearch: Dispatch<SetStateAction<string>>;
  setTitles: Dispatch<SetStateAction<Tutorial[]>>;
  setEditMode: Dispatch<SetStateAction<boolean>>;
  setTutorial: Dispatch<SetStateAction<Tutorial>>;
  saveTutorial: () => Promise<void>;
  deleteTutorial: () => Promise<void>;
}

export const TutorialContext = createContext({} as ContextProps);

export function TutorialProvider({ children }: ProviderProps) {
  //
  const [id, setId] = useState<number>(null!);
  const [search, setSearch] = useState<string>("");
  //
  const [titles, setTitles] = useState<Tutorial[]>(null!);
  const [tutorial, setTutorial] = useState<Tutorial>(HOW_TO_USE);
  //
  const [editMode, setEditMode] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  //
  const [message, setMessage] = useState<string>("Salvar");
  const [error, setError] = useState<any>(null);

  const allTitles: Tutorial[] =
    search && titles
      ? titles.filter((title: Tutorial) => title.title.toLowerCase().includes(search.toLowerCase()))
      : titles;

  async function loadAllTitles() {
    try {
      const storage = localStorage.getItem("tutorial");
      const tutorial = JSON.parse(storage as string);

      setTitles(tutorial);
    } catch (err: any) {
      console.log("Error on fetch tutorials title:", err.message);
    }
  }

  useEffect(() => {
    loadAllTitles();
  }, []);

  async function saveTutorial(): Promise<void> {
    setLoading(true);
    try {
      if (tutorial.id === 0) throw new Error("ERROR: don't create/update how to use tutorial");

      if (tutorial.id) {
        // patch
      } else {
        // post
        const storage = localStorage.getItem("tutorial");
        const data = storage ? JSON.parse(storage) : [];

        data.push(tutorial);

        localStorage.removeItem("tutorial");
        localStorage.setItem("tutorial", JSON.stringify(data));
      }

      setLoading(false);
      setMessage("Tutorial Salvo! ✅");

      setTimeout(async () => {
        setSearch("");
        setEditMode(false);
        setMessage("Salvar");
        await loadAllTitles();
      }, 2000);
    } catch (error: any) {
      setError(error.message);
    }
  }

  async function deleteTutorial(): Promise<void> {
    setLoading(true);
    try {
      if (tutorial.id === 0) throw new Error("ERROR: don't exclude how to use tutorial");
      await fetch(API_BASE_URL + `/tutorial?id=${tutorial.id}`, { method: "DELETE" });

      setLoading(false);
      setEditMode(false);

      setSearch("");
      await loadAllTitles();
      setTutorial(HOW_TO_USE);
    } catch (error: any) {
      console.log("CTX ERROR:", error.message);
    }
  }

  return (
    <TutorialContext.Provider
      value={{
        id,
        titles,
        search,
        loading,
        tutorial,
        editMode,
        allTitles,
        message,
        error,
        setId,
        setTitles,
        setSearch,
        setEditMode,
        setTutorial,
        saveTutorial,
        deleteTutorial,
      }}
    >
      {children}
    </TutorialContext.Provider>
  );
}
