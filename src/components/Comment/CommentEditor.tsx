import { useState } from 'react';
import { Button, createStyles, Group, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';

import { CommentWysiwyg } from 'components';

const useStyles = createStyles((theme) => ({
  height: {
    height: '250px',
    [theme.fn.largerThan('sm')]: {
      height: '150px',
    },
  },
}));

const handleUpload = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    reject('');
  });
};

function CommentEditor() {
  // const [value, setValue] = useState('');
  const { classes } = useStyles();
  const form = useForm<{ text: string }>({
    initialValues: { text: '' },
    validate: {
      text: (value) =>
        value.length <= 0 ? 'text must include at least 1 character.' : null,
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Stack>
        <CommentWysiwyg
          value={form.values.text}
          onChange={(value, delta, sources, editor) => {
            form.setFieldValue('text', JSON.stringify(editor.getContents()));
          }}
          onImageUpload={handleUpload}
          className={classes.height}
          controls={[
            ['bold', 'italic', 'underline', 'link'],
            ['unorderedList', 'h1', 'h2', 'h3'],
            ['alignLeft', 'alignCenter', 'alignRight'],
          ]}
        />

        <Group
          align="flex-end"
          noWrap={true}
          sx={{ justifyContent: 'flex-end' }}
        >
          <Button size="xs" type="submit">
            Post
          </Button>
        </Group>
      </Stack>
    </form>
  );
}

export default CommentEditor;
