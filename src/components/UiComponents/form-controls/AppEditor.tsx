import { FormInstance } from "antd";
import { useEffect, useState } from "react";
import Editor from "react-simple-wysiwyg";

export type EditorProps = {
  placeholder?: string;
  form:FormInstance;
  name?:string;
};
const AppEditor = ({placeholder,form,name}:EditorProps) => {
  const [html, setHtml] = useState("");

    useEffect(()=>{
    if(form?.getFieldValue(name)){
      setHtml(form.getFieldValue(name))
    }
  },[form?.getFieldValue(name)])
  
  function onChange(e: any) {
    form?.setFieldValue(name,e.target.value);
    setHtml(e.target.value)
  }

  return (
    <Editor
      placeholder={placeholder}
      value={html}
      name={name}
      onChange={onChange}
      className="h-60 overflow-y-auto bg-body text-text border-border"
    />
  );
};

export default AppEditor;
