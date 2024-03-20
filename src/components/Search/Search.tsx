import { ChangeEvent, useContext } from "react";
import { IoSearch } from "react-icons/io5";

import { TutorialContext } from "@/context/TutorialContext";
import API_BASE_URL from "@/constants/API";
import Category from "@/interfaces/Category";

const Search = () => {
  const { search, categories, setSearch, setCategory } = useContext(TutorialContext);

  return (
    <label className="py-12 mx-auto flex flex-col items-center text-white">
      <h1 className="flex flex-row gap-4 text-3xl sm:text-5xl font-thin mb-10 select-none">
        <strong>Olá!</strong>
        <span className="text-nowrap">Como posso ajudar?</span>
      </h1>
      <section className="relative">
        <input
          type="text"
          name="searchValue"
          value={search}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.currentTarget.value)}
          placeholder="Dica: pesquise por palavras chaves, Ex.: computador, impressora, instalação..."
          className="outline-none w-[280px] sm:w-[420px] md:w-[640px] py-4 px-5 rounded-md relative after:content-search-icon after:absolute mb-4 text-black"
        />
        <IoSearch size={24} color="C1C1C1" className="hidden md:block absolute top-4 right-6" />
      </section>
      <section className="flex gap-2">
        <p>Categorias:</p>
        {[...categories, { id: 4, name: "Todos" }].map(({ id, name }: Category) => (
          <span
            key={id + name}
            onClick={() => setCategory(name === "Todos" ? null! : { id, name })}
            className="cursor-pointer hover:underline"
          >
            {name}
          </span>
        ))}
      </section>
    </label>
  );
};

export default Search;
