import {Box, Button, Container, Flex, Paper, Skeleton, Table, Text, Textarea, TextInput, Title} from "@mantine/core";
import {useForm} from "@mantine/form";
import {useCheckTemplateMutation} from "@/hooks/index.js";
import {useState} from "react";
import classes from './TemplateMatcherForm.module.css';
import {notifications} from "@mantine/notifications";

const TemplateMatcherForm = () => {
    const [loading, setLoading] = useState(false);
    const [isHidden , setIsHidden] = useState(true);
    const [response, setResponse] = useState(null);

    const mutation = useCheckTemplateMutation();

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            text: '',
            login: '',
        },
    });

    const handleSubmit = (data) => {
        setLoading(true);
        mutation.mutate({login : data?.login, text: data?.text}, {
            onSuccess: (data) => {
                setLoading(false);
                setResponse(data?.data);
                setIsHidden(false);
                console.log(data, 'data')
                if (data.status === "SUCCESS") {
                    notifications.show({
                        title: 'Успешно',
                        message: 'Текст соответствует шаблону',
                    })
                }
                if (data.status === "ERROR") {
                    notifications.show({
                        title: 'Ошибка',
                        message: 'Текст не соответствует шаблону',
                        color: "red"
                    })
                }
            },
            onError: (error) => {
                setLoading(false);
                setResponse(error);
                setIsHidden(false);
            },
        });
    }

    const renderRows = () => {
        if (loading) {
            return (
                <Table.Tr>
                    <Table.Td><Skeleton height={20} /></Table.Td>
                    <Table.Td><Skeleton height={20} /></Table.Td>
                    <Table.Td><Skeleton height={20} /></Table.Td>
                    <Table.Td className={classes.td}><Skeleton height={20} /></Table.Td>
                    <Table.Td><Skeleton height={20} /></Table.Td>
                </Table.Tr>
            );
        }

        if (response) {
            return (
                <Table.Tr key={response?.alphaName}>
                    <Table.Td>{response?.alphaName}</Table.Td>
                    <Table.Td>{response?.accountName}</Table.Td>
                    <Table.Td>{response?.type}</Table.Td>
                    <Table.Td className={classes.td}>{response?.text}</Table.Td>
                    <Table.Td>{response?.status}</Table.Td>
                </Table.Tr>
            );
        }

        return (
            <Table.Tr>
                <Table.Td colSpan={5}>
                    <Text ta="center" c="red" fw={500}>Текст не щаблонизирован</Text>
                </Table.Td>
            </Table.Tr>
        );
    };

    return (
        <Box>
            <Box>
                <Title fw={500}>
                    Сопоставление текста с шаблоном
                </Title>

                <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                    <form onSubmit={form.onSubmit(handleSubmit)}>
                        <Flex direction="column" gap={24}>
                            <TextInput
                                label="Логин"
                                placeholder="Введите логин"
                                required
                                key={form.key('login')}
                                {...form.getInputProps('login')}
                            />
                            <Textarea
                                label="Сообщение"
                                placeholder="Введите сообщение"
                                rows={4}
                                required
                                resize="vertical"
                                key={form.key('text')}
                                {...form.getInputProps('text')}
                            />

                            <Flex justify="flex-end">
                                <Button loading={loading} type="submit">
                                    Проверить
                                </Button>
                            </Flex>
                        </Flex>
                    </form>

                    {!isHidden && (
                        <Table mt={48}>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>Алфа Название</Table.Th>
                                    <Table.Th>Аккаунт</Table.Th>
                                    <Table.Th>Тип</Table.Th>
                                    <Table.Th>Текст</Table.Th>
                                    <Table.Th>Статус</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>{renderRows()}</Table.Tbody>
                        </Table>
                    )}
                </Paper>
            </Box>
        </Box>
    );
};

export default TemplateMatcherForm;