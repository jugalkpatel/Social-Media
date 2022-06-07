import { useState, useRef, useEffect } from 'react';
import { useReactiveVar } from '@apollo/client';
import { useRouter } from 'next/router';

import {
  Container,
  Title,
  Divider,
  createStyles,
  Input,
  Stack,
  Button,
} from '@mantine/core';

import { SelectCommunity, Wysiwyg } from 'components';
import { authorizationVar } from 'lib';

const useStyles = createStyles((theme) => ({
  height: {
    height: '50vh',
    // overflowY: 'scroll',

    [theme.fn.largerThan('xl')]: {
      height: '60vh',
    },
  },
}));

function ReadOnlyWysiwyg({ value }) {
  const [text, setText] = useState(JSON.parse(value));

  // useEffect(() => {
  //   const parsed = JSON.parse(value);
  //   console.log({ parsed });
  //   setText(parsed);
  // }, [value]);

  console.log({ text });

  return (
    <Wysiwyg
      value={text}
      // defaultValue={parsedArray}

      // readOnly={true}
      onChange={setText}
    />
  );
}

const handleUpload = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const formData = new FormData();

    formData.append('file', file);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_PRESET);

    fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      },
    )
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        resolve(result.url);
      })
      .catch((error) => {
        reject(new Error('Upload Failed'));
      });
  });

function Submit() {
  const isAuthorized = useReactiveVar(authorizationVar);
  const [value, setValue] = useState<string>('');
  const router = useRouter();

  const { classes } = useStyles();

  if (!isAuthorized) {
    return null;
  }

  const handleClick = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('quill', value);
    }

    router.push('/editor');
  };

  // save quill data to the db
  // store image and send link: figure out cloudinary

  return (
    <Container pb={40}>
      <Title order={3}>Create a post</Title>
      <Divider my="xs" size="xs" />

      <SelectCommunity />

      <Stack spacing="sm">
        <Input size="sm" maxLength={30} placeholder="Title" />

        <Wysiwyg
          value={value}
          onChange={(value, delta, sources, editor) => {
            setValue(JSON.stringify(editor.getContents()));
          }}
          className={classes.height}
          onImageUpload={handleUpload}
          sx={{ maxWidth: '100%', overflowY: 'auto' }}
        />
      </Stack>
      <Divider my="md" size="xs" />

      <Stack align="flex-end">
        <Button variant="filled" px={25} onClick={handleClick}>
          Post
        </Button>
      </Stack>

      {/* {value ? <ReadOnlyWysiwyg value={value} /> : null} */}
    </Container>
  );
}

export default Submit;

/* <Wysiwyg
        theme="snow"
        value={value}
        onChange={(content, delta, _source, editor) => {
          // console.log(editor.getContents());
          const foo = editor.getContents();
          console.log(foo.ops.toString());
        }}
        modules={modules}
        formats={formats}
      >
        <div style={{ height: '50vh' }} />
      </Wysiwyg> */

/* <RichTextEditor /> */

// import 'react-quill/dist/quill.snow.css';

// const handleImageUpload = (file: File): Promise<string> => {
//   return new Promise((resolve, reject) => {
//     const formData = new FormData();

//     formData.append('image', file);

//     console.log({ formData });

//     fetch(
//       `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMG_API}`,
//       {
//         method: 'POST',
//         body: formData,
//       },
//     )
//       .then((response) => response.json())
//       .then((result) => resolve(result.data.url));
//   });
// };

// for image upload image to the store and then use that url here.

// const modules = {
//   toolbar: [
//     [{ header: [1, 2, false] }],
//     ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//     [
//       { list: 'ordered' },
//       { list: 'bullet' },
//       { indent: '-1' },
//       { indent: '+1' },
//     ],
//     ['link', 'image', 'video'],
//     ['clean'],
//   ],
//   Container
// };

// const modules = {
//   toolbar: {
//     Container: [
//       [{ header: [1, 2, false] }],
//       ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//       [
//         { list: 'ordered' },
//         { list: 'bullet' },
//         { indent: '-1' },
//         { indent: '+1' },
//       ],
//       ['link', 'image', 'video'],
//       ['clean'],
//     ],
//   },
// };

// const formats = [
//   'header',
//   'bold',
//   'italic',
//   'underline',
//   'strike',
//   'blockquote',
//   'list',
//   'bullet',
//   'indent',
//   'link',
//   'image',
//   'video',
// ];
