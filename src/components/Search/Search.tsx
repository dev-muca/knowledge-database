import { ChangeEvent, useContext } from "react";
import { IoSearch } from "react-icons/io5";

import { TutorialContext } from "@/context/TutorialContext";

const Search = () => {
  const { search, setSearch } = useContext(TutorialContext);

  return (
    <label className="py-12 mx-auto flex flex-col items-center text-white">
      <h1 className="flex flex-row gap-4 text-3xl sm:text-5xl font-thin mb-10 select-none">
        <strong>Olá!</strong>
        <span className="text-nowrap">Como posso ajudar?</span>
      </h1>
      <div className="relative">
        <input
          type="text"
          name="searchValue"
          value={search}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.currentTarget.value)}
          placeholder="Dica: pesquise por palavras chaves, Ex.: computador, impressora, instalação..."
          className="outline-none w-[280px] sm:w-[420px] md:w-[640px] py-4 px-5 rounded-md relative after:content-search-icon after:absolute mb-4 text-black"
        />
        <IoSearch size={24} color="C1C1C1" className="hidden md:block absolute top-4 right-6" />
      </div>
    </label>
  );
};

export default Search;
