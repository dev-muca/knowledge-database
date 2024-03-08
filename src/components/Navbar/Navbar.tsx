import { FormEvent, useContext, useState } from "react";
import HOW_TO_USE from "@/constants/USE";
import { TutorialContext } from "@/context/TutorialContext";

const Navbar = () => {
  const { setTutorial } = useContext(TutorialContext);
  //
  const [showForm, setShowForm] = useState<boolean>(false);
  const [btnLoader, setBtnLoader] = useState<boolean>(false);

  async function onSubmitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    alert("Autenticando...");
    setBtnLoader(true);

    setTimeout(() => setBtnLoader(false), 1800);
  }

  return (
    <nav className="h-14 px-2 mx-auto flex flex-row justify-end text-white items-center text-lg gap-8 relative">
      <button onClick={() => setTutorial(HOW_TO_USE)} className="hover:underline text-sm">
        Como utilizar?
      </button>
    </nav>
  );
};

export default Navbar;
