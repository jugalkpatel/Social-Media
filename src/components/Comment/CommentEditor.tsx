import {
  Button,
  createStyles,
  Group,
  InputWrapper,
  Stack,
} from '@mantine/core';
import { useForm } from '@mantine/form';

import { CommentWysiwyg } from 'components';
import { useCreateComment } from 'operations';

type Props = {
  postId: string;
};

const useStyles = createStyles((theme) => ({
  height: {
    minHeight: '250px',
    [theme.fn.largerThan('sm')]: {
      minHeight: '150px',
    },
  },
}));

const handleUpload = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    reject('');
  });
};

function CommentEditor({ postId }: Props) {
  const { classes } = useStyles();
  const { createComment, loading } = useCreateComment();
  const form = useForm<{ text: string; contentLength: number }>({
    initialValues: { text: '', contentLength: 0 },
    validate: {
      text: (value) =>
        value.length <= 0 ? 'text must include at least 1 character.' : null,
      contentLength: (value) =>
        value - 1 <= 4
          ? 'Comment Content must contain a minimum of 5 letters.'
          : null,
    },
  });

  const handleSubmit = async () => {
    await createComment({ postId, text: form.values.text });
    // doesn't work because quill works in uncontrolled mode
    // form.reset();
  };

  return (
    <form onSubmit={form.onSubmit(() => handleSubmit())}>
      <Stack>
        <InputWrapper
          id="comment-input"
          error={
            form?.errors && form.errors?.contentLength
              ? form.errors.contentLength
              : null
          }
        >
          <CommentWysiwyg
            value={form.values.text}
            onChange={(value, delta, sources, editor) => {
              form.setFieldValue('contentLength', editor.getLength());
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
        </InputWrapper>

        <Group
          align="flex-end"
          noWrap={true}
          sx={{ justifyContent: 'flex-end' }}
        >
          <Button size="xs" type="submit" loading={loading}>
            Post
          </Button>
        </Group>
      </Stack>
    </form>
  );
}

export default CommentEditor;
