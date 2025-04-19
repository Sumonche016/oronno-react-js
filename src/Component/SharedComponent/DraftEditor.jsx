import React, { useState } from "react";
import { Editor, EditorState } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const DraftEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  return (
    <Editor editorState={editorState} onEditorStateChange={setEditorState} />
  );

};

export default DraftEditor;
