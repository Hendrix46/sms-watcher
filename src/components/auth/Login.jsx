import {Button, Container, Flex, Paper, PasswordInput, Text, TextInput, Title,} from '@mantine/core';

export function Login() {
    return (
        <Flex h="100%" direction="column" justify="center" align="center">
            <Container miw={420} size={420}>
                <Title ta="center">
                    Добро пожаловать!
                </Title>
                <Text c="dimmed" size="sm" ta="center" mt={5}>
                    Войдите в свой аккаунт
                </Text>

                <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                    <TextInput label="Э-мейл" placeholder="you@etc.uz" required />
                    <PasswordInput label="Пароль" placeholder="Введите пароль" required mt="md" />
                    <Button fullWidth mt="xl">
                        Войти
                    </Button>
                </Paper>
            </Container>
        </Flex>
    );
}