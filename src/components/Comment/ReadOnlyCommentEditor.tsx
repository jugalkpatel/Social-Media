import { useState } from 'react';

import { CommentWysiwyg } from 'components';

function ReadOnlyCommentEditor() {
  const [value, setValue] = useState('');
  return <CommentWysiwyg value={value} onChange={setValue} readOnly />;
}

export default ReadOnlyCommentEditor;
