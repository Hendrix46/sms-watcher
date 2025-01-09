import {Box, Button, Container, Flex, Paper, Skeleton, Table, Text, Textarea, Title} from "@mantine/core";
import {useForm} from "@mantine/form";
import {useCheckTemplateMutation} from "@/hooks/index.js";
import {useState} from "react";
import classes from './TemplateMatcherForm.module.css';

const TemplateMatcherForm = () => {
    const [loading, setLoading] = useState(false);
    const [isHidden , setIsHidden] = useState(true);
    const [response, setResponse] = useState(null);

    const mutation = useCheckTemplateMutation();

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            text: '',
        },
    });

    const onSubmit = (data) => {
        setLoading(true);
        mutation.mutate(data.text, {
            onSuccess: (data) => {
                setLoading(false);
                setResponse(data);
                setIsHidden(false);
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
        <Box p={24}>
            <Container size={1280}>
                <Title fw={500}>
                    Сопоставление текста с шаблоном
                </Title>

                <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                    <form onSubmit={form.onSubmit(onSubmit)}>
                        <Flex direction="column" gap={24}>
                            <Textarea
                                label="Сообщение"
                                placeholder="Введи сообщение"
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
            </Container>
        </Box>
    );
};

export default TemplateMatcherForm;