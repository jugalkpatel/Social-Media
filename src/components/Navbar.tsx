import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useReactiveVar } from '@apollo/client';

import {
  ActionIcon,
  Group,
  useMantineColorScheme,
  Menu,
  createStyles,
  Divider,
  Title,
} from '@mantine/core';
import { useModals } from '@mantine/modals';
import {
  IoIosSunny,
  IoMdAdd,
  IoMdExit,
  IoMdNotifications,
} from 'react-icons/io';
import { MdNightsStay } from 'react-icons/md';
import { BsPlusCircleDotted } from 'react-icons/bs';

import logo from '@/assets/LogoImg.png';
import Avatar from '@/assets/sample_avatar.svg';
// import { authorizationVar } from 'cache';

const useStyles = createStyles((theme) => ({
  border: {
    borderBottom: `1px solid ${
      theme.colors.gray[theme.colorScheme === 'light' ? 3 : 8]
    }`,
  },
}));

function Navbar() {
  //   const isAuthorized = useReactiveVar(authorizationVar);
  const router = useRouter();
  const { classes } = useStyles();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  const modals = useModals();

  const openContextModals = () => {
    modals.openContextModal('community', {
      title: <Title order={4}>Create Community</Title>,
      centered: true,
      innerProps: {},
    });
  };
  return (
    <Group position="apart" p="xs" className={classes.border}>
      <Link href="/" passHref>
        <a style={{ display: 'flex', alignItems: 'center' }}>
          <Image src={logo} layout="fixed" alt="rices" height={30} width={30} />
        </a>
      </Link>

      <Group>
        <Link href="/submit" passHref>
          <ActionIcon variant="outline" title="create post" component="a">
            <IoMdAdd />
          </ActionIcon>
        </Link>

        <ActionIcon variant="outline" title="notifications">
          <IoMdNotifications />
        </ActionIcon>

        <Menu
          control={
            <ActionIcon size="md">
              <Avatar />
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
          {/* {isAuthorized ? (
            <Menu.Item
              icon={<BsPlusCircleDotted />}
              onClick={openContextModals}
            >
              Create Community
            </Menu.Item>
          ) : null} */}

          <Menu.Item icon={<IoMdExit />} onClick={() => router.push('/access')}>
            Login / Register
          </Menu.Item>
        </Menu>
      </Group>
    </Group>
  );
}

export { Navbar };
