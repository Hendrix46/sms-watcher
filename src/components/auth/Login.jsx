import {Button, Container, Flex, Paper, PasswordInput, Text, TextInput, Title,} from '@mantine/core';
import {useLoginMutation} from "@/hooks/index.js";
import {useForm} from "@mantine/form";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "@/constants/routes.js";

export function Login() {
    const navigate = useNavigate();
    const mutation = useLoginMutation ();

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            login: '',
            passowrd: '',
        },
    });

    const handleSubmit = (data) => {
        console.log(data)
        mutation.mutate(data, {
            onSuccess: () => {
                console.log('Success')
                localStorage.setItem('token', 'token')
            },
            onError: () => {
                console.log('Error')
                //needs to be moved into onSuccess after api works
                localStorage.setItem('token', 'token');
                navigate(ROUTES.SMS_CHECKER)
            }
        });
    }

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
                    <form onSubmit={form.onSubmit(handleSubmit)}>
                        <TextInput
                            label="Э-мейл"
                            placeholder="you@etc.uz"
                            required
                            key={form.key('login')}
                            {...form.getInputProps('login')}
                        />
                        <PasswordInput
                            label="Пароль"
                            placeholder="Введите пароль"
                            required
                            mt="md"
                            key={form.key('passowrd')}
                            {...form.getInputProps('passowrd')}
                        />
                        <Button type="submit" fullWidth mt="xl">
                            Войти
                        </Button>
                    </form>
                </Paper>
            </Container>
        </Flex>
    );
}