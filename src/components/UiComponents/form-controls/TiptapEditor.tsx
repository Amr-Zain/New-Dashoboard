"use client";

import {
  useEditor,
  EditorContent,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import Highlight from "@tiptap/extension-highlight";
import Blockquote from "@tiptap/extension-blockquote";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import { useEffect } from "react";
import { Form, FormInstance, Select } from "antd";
import DOMPurify from "dompurify";
import { AlignJustify, ImagePlus } from "lucide-react";
import Image from "@tiptap/extension-image";


import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code2,
  List,
  ListOrdered,
  ListTodo,
  Undo2,
  Redo2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Quote,
  Link as LinkIcon,
  Highlighter,
  Superscript as SupIcon,
    Subscript as SubIcon,

} from "lucide-react";
import "@/styles/editor.scss";
import HighlightColorPicker from "./HighlightColorPicker";
import ImageUploadButton from "./ImageUploadButton";

const { Option } = Select;

export interface EditorProps {
  name: string;
  placeholder?: string;
  form: FormInstance;
}

const TiptapEditorWithToolbar = ({ name, form }: EditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      Subscript,
    Highlight.configure({
        multicolor: true,
    }),
    Image,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      BulletList,
      OrderedList,
    //   Blockquote,
      TaskList,
      TaskItem.configure({ nested: true }),
    ],
    content: form.getFieldValue(name) || "<p></p>",
    onUpdate({ editor }) {
      const html = DOMPurify.sanitize(editor.getHTML());
      form.setFieldsValue({ [name]: html });
    },
    editorProps: {
      attributes: {
        class: "tiptap-editor dark-mode",
      },
    },
  });

  useEffect(() => {
    if (editor) {
      const content = form.getFieldValue(name);
      if (content) editor.commands.setContent(content);
    }
  }, [editor]);

  if (!editor) return null;

  const headingOptions = [1, 2, 3, 4, 5, 6];

  const items = [
    { icon: <Undo2 size={18} />, action: () => editor.chain().focus().undo().run() },
    { icon: <Redo2 size={18} />, action: () => editor.chain().focus().redo().run() },
    { icon: <Bold size={18} />, action: () => editor.chain().focus().toggleBold().run() },
    { icon: <Italic size={18} />, action: () => editor.chain().focus().toggleItalic().run() },
    { icon: <UnderlineIcon size={18} />, action: () => editor.chain().focus().toggleUnderline().run() },
    { icon: <Strikethrough size={18} />, action: () => editor.chain().focus().toggleStrike().run() },
    { icon: <Code2 size={18} />, action: () => editor.chain().focus().toggleCode().run() },
    { icon: <Highlighter size={18} />, action: () => editor.chain().focus().toggleHighlight().run() },
    { icon: <SupIcon size={18} />, action: () => editor.chain().focus().toggleSuperscript().run() },
    { icon: <SubIcon size={18} />, action: () => editor.chain().focus().toggleSubscript().run() },
    { icon: <LinkIcon size={18} />, action: () => {
      const url = window.prompt("Enter the URL");
      if (url) editor.chain().focus().setLink({ href: url }).run();
    } },
    { icon: <Quote size={18} />, action: () => editor.chain().focus().toggleBlockquote().run() },
    { icon: <List size={18} />, action: () => editor.chain().focus().toggleBulletList().run() },
    { icon: <ListOrdered size={18} />, action: () => editor.chain().focus().toggleOrderedList().run() },
    { icon: <ListTodo size={18} />, action: () => editor.chain().focus().toggleTaskList().run() },
    { icon: <AlignLeft size={18} />, action: () => editor.chain().focus().setTextAlign("left").run() },
    { icon: <AlignCenter size={18} />, action: () => editor.chain().focus().setTextAlign("center").run() },
    { icon: <AlignRight size={18} />, action: () => editor.chain().focus().setTextAlign("right").run() },
    //   { icon: <AlignRight size={18} />, action: () => editor.chain().focus().setTextAlign("justify").run() },
    { icon: <AlignJustify size={18} />, action: () => editor.chain().focus().setTextAlign("justify").run() },
    { icon:<HighlightColorPicker
  onSelect={(color) => {
    if (!editor) return;
    editor
      .chain()
      .focus()
      .command(({ commands }) => {
        color ? commands.setHighlight({ color }) : commands.unsetHighlight();
        return true;
      })
      .run();
  }}
      />
      },
   

  ];

  return (
    <div className="tiptap-wrapper">
      <div className="toolbar">
        {items.map(({ icon, action }, i) => (
          <button key={i} onClick={action} type="button">
            {icon}
          </button>
        ))}
              <ImageUploadButton
  onImageAdd={(src) => {
    editor.chain().focus().setImage({ src }).run();
  }}
/>

        <Select
          defaultValue="1"
          onChange={(value) =>
            editor.chain().focus().toggleHeading({ level: Number(value) as 1 | 2 | 3 | 4 | 5 | 6 })
.run()
          }
          style={{ width: 80, marginLeft: "8px" }}
        >
          {headingOptions.map((level) => (
            <Option key={level} value={level.toString()}>
              H{level}
            </Option>
          ))}
        </Select>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};

export default TiptapEditorWithToolbar;
