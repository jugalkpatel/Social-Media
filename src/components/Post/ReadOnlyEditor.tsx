import { useEffect, useState } from 'react';
import { createStyles } from '@mantine/core';
import { DeltaStatic } from 'quill';

import { Wysiwyg } from 'components';

type Props = {
  content: string;
};

const useStyles = createStyles((theme) => ({
  margin: {
    margin: '0 10px 10px 10px',
    height: '9rem',
    maskImage: 'linear-gradient(180deg,#000 60%,transparent)',
    overflow: 'hidden',
  },
}));

function ReadOnlyEditor({ content }: Props) {
  const { classes } = useStyles();
  const [text, setText] = useState<DeltaStatic>(null);

  const handleText = (value, delta, sources, editor) => {
    setText(editor.getContents());
  };

  useEffect(() => {
    setText(JSON.parse(content));
  }, [content]);

  return (
    <Wysiwyg
      value={text}
      onChange={handleText}
      className={classes.margin}
      readOnly
    />
  );
}

export default ReadOnlyEditor;
