import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
// two ways
// persist in a cookie or fetch cookie in useEffect by creating custom hook with local state

// check cookies are being set or not.
// fetch authenticated state from cookie

// our login fn is working, we have a problem with refresh.
// since we're using cookies we can now make a request again on the refresh which validates the user and if access token expires then check refresh token.

import {
  ActionIcon,
  Group,
  useMantineColorScheme,
  Menu,
  createStyles,
  Divider,
  Title,
  Text,
  Avatar,
} from '@mantine/core';
import { useModals } from '@mantine/modals';
import { IoIosSunny, IoMdAdd, IoMdExit } from 'react-icons/io';
import { MdNightsStay, MdOutlineCollectionsBookmark } from 'react-icons/md';
import { BsPlusCircleDotted } from 'react-icons/bs';
import { AiOutlineUser } from 'react-icons/ai';

import logo from '@/assets/LogoImg.png';

import { useAuth } from 'hooks';

const useStyles = createStyles((theme) => ({
  border: {
    borderBottom: `1px solid ${
      theme.colors.gray[theme.colorScheme === 'light' ? 3 : 8]
    }`,
  },
  background: {
    backgroundColor:
      theme.colorScheme === 'light' ? '#fff' : theme.colors.dark[7],
  },
}));

function Navbar() {
  const router = useRouter();
  const {
    data: { isAuthorized, name, picture },
    loading,
  } = useAuth();
  const { classes, cx } = useStyles();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  const modals = useModals();

  const openContextModals = () => {
    modals.openContextModal('COMMUNITY', {
      title: <Title order={4}>Create Community</Title>,
      centered: true,
      innerProps: {},
    });
  };

  const openAuthModal = () => {
    modals.openContextModal('LOGIN', { innerProps: {} });
  };

  return (
    <Group
      position="apart"
      p="xs"
      className={cx(classes.border, classes.background)}
    >
      <Link href="/" passHref>
        <a style={{ display: 'flex', alignItems: 'center' }}>
          <Image src={logo} layout="fixed" alt="rices" height={30} width={30} />
        </a>
      </Link>

      <Group>
        {isAuthorized ? (
          <Link href="/submit" passHref>
            <ActionIcon variant="outline" title="create post" component="a">
              <IoMdAdd />
            </ActionIcon>
          </Link>
        ) : null}

        {/* <ActionIcon variant="outline" title="notifications">
          <IoMdNotifications />
        </ActionIcon> */}

        <Group
          pl={14}
          spacing={10}
          align="center"
          sx={(theme) => ({
            borderLeft: `2px solid ${
              theme.colors.gray[theme.colorScheme === 'light' ? 3 : 8]
            }`,
          })}
        >
          {isAuthorized ? (
            <Text weight={700} transform="uppercase" size="sm">
              {name}
            </Text>
          ) : null}

          <Menu
            control={
              <ActionIcon size="md" variant="transparent">
                {isAuthorized ? (
                  <Avatar src={picture} size={30} />
                ) : (
                  <AiOutlineUser />
                )}
              </ActionIcon>
            }
          >
            <Menu.Label>Appearance</Menu.Label>
            <Menu.Item
              icon={dark ? <IoIosSunny /> : <MdNightsStay />}
              onClick={() => toggleColorScheme()}
            >
              {dark ? 'Light Mode' : 'Dark Mode'}
            </Menu.Item>

            <Divider />

            <Menu.Label>MORE STUFF</Menu.Label>
            {isAuthorized ? (
              <Menu.Item
                icon={<BsPlusCircleDotted />}
                onClick={openContextModals}
              >
                Create Community
              </Menu.Item>
            ) : null}

            {isAuthorized ? (
              <Menu.Item
                icon={<MdOutlineCollectionsBookmark />}
                onClick={() => router.push('/bookmarks')}
              >
                Bookmarks
              </Menu.Item>
            ) : null}

            {!isAuthorized ? (
              <Menu.Item icon={<IoMdExit />} onClick={openAuthModal}>
                Login / Register
              </Menu.Item>
            ) : null}
          </Menu>
        </Group>
      </Group>
    </Group>
  );
}

export { Navbar };
