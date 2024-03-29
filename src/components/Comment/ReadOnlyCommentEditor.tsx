import { useState } from 'react';
import { Skeleton } from '@mantine/core';

import { CommentWysiwyg } from 'components';

type Props = {
  content: string;
};

function ReadOnlyCommentEditor({ content }: Props) {
  const [text, setText] = useState(content);

  const handleText = (value, delta, sources, editor) => {
    setText(editor.getContents());
  };

  if (!text) {
    return <Skeleton width="100%" height={100} />;
  }

  return <CommentWysiwyg value={text} onChange={handleText} readOnly />;
}

export default ReadOnlyCommentEditor;
