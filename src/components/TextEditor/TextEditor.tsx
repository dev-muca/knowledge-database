import React, { useContext, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { TutorialContext } from "@/context/TutorialContext";
import Tutorial from "@/interfaces/Tutorial";

const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });

const TextEditor = () => {
  const { tutorial, setTutorial } = useContext(TutorialContext);

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [{ align: [] }],
      [{ color: [] }],
      ["code-block"],
      ["clean"],
    ],
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
    "align",
    "color",
    "code-block",
  ];

  const handleEditorChange = (newContent: string | TrustedHTML) => {
    setTutorial((prevData: Tutorial) => ({ ...prevData, content: newContent }));
  };

  return (
    <div className="px-4 h-screen">
      <QuillEditor
        value={tutorial.content as string}
        onChange={handleEditorChange}
        modules={quillModules}
        formats={quillFormats}
        className="w-full h-[70%] mt-10 bg-white"
      />
    </div>
  );
};

export default TextEditor;
