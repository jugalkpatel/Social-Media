import { useState } from 'react';
import { createStyles, Skeleton } from '@mantine/core';

import { Wysiwyg } from 'components';

type Props = {
  content: string;
  variant?: 'DEFAULT' | 'LIST';
};

const useStyles = createStyles((theme) => ({
  margin: {
    margin: '0 10px 10px 10px',
  },
  listVarient: {
    height: '9rem',
    maskImage: 'linear-gradient(180deg,#000 60%,transparent)',
    overflow: 'hidden',
  },
}));

function ReadOnlyEditor({ content, variant = 'DEFAULT' }: Props) {
  const { classes, cx } = useStyles();
  const [text, setText] = useState(content);

  const handleText = (value, delta, sources, editor) => {
    setText(editor.getContents());
  };

  const variantClass = variant === 'LIST' ? classes.listVarient : null;

  if (!text) {
    return <Skeleton height={150} width="97%" mx={10} />;
  }

  return (
    <Wysiwyg
      value={text}
      onChange={handleText}
      className={cx(classes.margin, variantClass)}
      readOnly
    />
  );
}

export default ReadOnlyEditor;
