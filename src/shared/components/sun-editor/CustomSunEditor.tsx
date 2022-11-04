import React from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File

export function CustomSunEditor({
  defaultValue,
  callbcakHandleChange,
  placeholder,
}: {
  defaultValue: string;
  callbcakHandleChange: any;
  placeholder: string;
}) {
  const handleChange = (content: any) => {
    callbcakHandleChange(content);
  };

  return (
    <SunEditor
      lang="en"
      setContents={defaultValue}
      placeholder={placeholder}
      setOptions={{
        height: "200",
        buttonList: [["undo", "redo", "font", "fontSize", "formatBlock"]],
      }}
      onChange={handleChange}
    />
  );
}
