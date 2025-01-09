import {Box, Button, Container, Flex, Paper, Table, Textarea, Title} from "@mantine/core";
import {useForm} from "@mantine/form";
import {checkTemplate} from "@/hooks/index.js";

const TemplateMatcherForm = () => {
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            text: '',
        },
    });

    const onSubmit = (data) => {
        checkTemplate(data.text);
    }
    const element = { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' };

    const rows = (
        <Table.Tr key={element.name}>
            <Table.Td>{element.position}</Table.Td>
            <Table.Td>{element.name}</Table.Td>
            <Table.Td>{element.symbol}</Table.Td>
            <Table.Td>{element.mass}</Table.Td>
        </Table.Tr>
    )

    return (
        <Box p={24}>
            <Container size={1200}>
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
                                <Button color="teal" type="submit">
                                    Проверить
                                </Button>
                            </Flex>
                        </Flex>
                    </form>

                    <Table mt={48}>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Алфа Название</Table.Th>
                                <Table.Th>Тип</Table.Th>
                                <Table.Th>Аккаунт</Table.Th>
                                <Table.Th>Текст</Table.Th>
                                <Table.Th>Статус</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>{rows}</Table.Tbody>
                    </Table>
            </Paper>
        </Container>
</Box>
    );
};

export default TemplateMatcherForm;