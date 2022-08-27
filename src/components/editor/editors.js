import React from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-one_dark';
import './editor.css';

export const JavascriptEditor = (props) => {
  return <Editor mode="javascript" title={'Javascript'} {...props} />;
};

const Editor = ({ mode, onChange, value, title, height }) => {
  return  (
    <div className={'editorContainer'}>
      <div className={'editorTitle'}>{title}</div>
      <AceEditor
        mode={mode}
        theme="one_dark"
        name={title}
        onChange={onChange}
        fontSize={18}
        width={'100%'}
        height={height}
        value={value}
        showPrintMargin={false}
        showGutter={true}
        tabSize={2}
        wrapEnabled={true}
        setOptions={{ useWorker: false, fontFamily: 'JetBrains' }}
      />
    </div>
  );
};