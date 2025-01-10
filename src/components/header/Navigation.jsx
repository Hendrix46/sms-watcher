import { useState } from 'react';
import {Burger, Container, Group, Image} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Logo from '@/assets/logo.png';
import classes from './Navigation.module.css';
import {ROUTES} from "@/constants/routes.js";
import {NavLink, useLocation} from "react-router-dom";

const links = [
    { link: ROUTES.SMS_CHECKER, label: 'Проверка СМС' },
    { link: ROUTES.FILE_UPLOAD, label: 'Загрузка файлов' },
];

export const Header = () => {
    const pathname = useLocation().pathname;
    const [opened, { toggle }] = useDisclosure(false);
    const [active, setActive] = useState(pathname);

    const items = links.map((link) => (
        <NavLink
            key={link.label}
            to={link.link}
            className={classes.link}
            data-active={active === link.link || undefined}
            onClick={(event) => {
                setActive(link.link);
            }}
        >
            {link.label}
        </NavLink>
    ));

    return (
        <header className={classes.header}>
            <Container size={1280} className={classes.inner}>
                <Image src={Logo} alt="logo" w={48} />
                <Group gap={12} visibleFrom="xs">
                    {items}
                </Group>

                <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
            </Container>
        </header>
    );
}