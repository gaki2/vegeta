import CodeMirror, { EditorView, keymap, ReactCodeMirrorRef } from '@uiw/react-codemirror';
import { createTheme } from '@uiw/codemirror-themes';
import { ComponentProps, forwardRef } from 'react';
import './editor.css';
import clsx from 'clsx';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { tags as t } from '@lezer/highlight';
import { Prec } from '@codemirror/state';

type Props = ComponentProps<typeof CodeMirror> & {
  onCmdEnter: (lines: string[]) => void;
};

const myTheme = createTheme({
  theme: 'light',
  settings: {
    // background: ,
  },
  styles: [{ tag: t.heading1, class: 'h1 font-bold' }],
});

export const Editor = forwardRef<ReactCodeMirrorRef, Props>((props, ref) => {
  const { onCmdEnter, ...rest } = props;
  return (
    <CodeMirror
      {...rest}
      ref={ref}
      basicSetup={{
        highlightActiveLine: false,
        foldGutter: false,
        lineNumbers: false,
        indentOnInput: true,
      }}
      theme={myTheme}
      extensions={[
        markdown({ base: markdownLanguage }),
        EditorView.lineWrapping,
        Prec.highest(
          keymap.of([
            {
              key: 'Mod-Enter',
              run: (view) => {
                const lines: string[] = view.state.doc.toJSON();
                onCmdEnter(lines);
                view.dispatch({
                  changes: { from: 0, to: view.state.doc.toString().length, insert: '' },
                });
                return true;
              },
            },
          ])
        ),
      ]}
      className={clsx('editor-style', props.className)}
    />
  );
});

Editor.displayName = 'EDITOR';
