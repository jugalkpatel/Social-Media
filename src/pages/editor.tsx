import { Wysiwyg } from 'components';
import { useEffect, useState } from 'react';
// import { ReadOnly } from 'components';
import { DeltaStatic } from 'quill';

export default function () {
  const [text, setText] = useState<DeltaStatic>(null);

  const handleText = (value, delta, sources, editor) => {
    setText(editor.getContents());
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const value = localStorage.getItem('quill');
      setText(JSON.parse(value));
    }
  }, []);

  //   const length = text.length();

  if (!text) {
    return null;
  }

  console.log({ text });
  console.log(text.length);

  return <Wysiwyg value={text} onChange={handleText} readOnly />;
}
