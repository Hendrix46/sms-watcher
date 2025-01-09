import {Dropzone, MIME_TYPES} from '@mantine/dropzone';
import {Group, Text, rem, Button, Container, Title, Paper} from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import {useState} from "react";
import {useUploadTemplatesMutation} from "@/hooks/index.js";

const FileUpload = (props) => {
    const [file, setFile] = useState(null);

    const uploadMutation = useUploadTemplatesMutation();

    const handleUpload = () => {
        uploadMutation.mutate(file, {
            onSuccess: (data) => {
                console.log('Success', data);
            },
            onError: (error) => {
                console.log('Error', error);
            },
        });
    }

    return (
        <Container size={1280}>
            <Title fw={500}>
                Загрузка файлов
            </Title>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <Dropzone
                    onDrop={(files) => setFile(files)}
                    onReject={(files) => console.log('rejected files', files)}
                    maxSize={5 * 1024 ** 2}
                    accept={[MIME_TYPES.csv, MIME_TYPES.xls, MIME_TYPES.xlsx]}
                    {...props}
                >
                    <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
                        <Dropzone.Accept>
                            <IconUpload
                                style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
                                stroke={1.5}
                            />
                        </Dropzone.Accept>
                        <Dropzone.Reject>
                            <IconX
                                style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
                                stroke={1.5}
                            />
                        </Dropzone.Reject>
                        <Dropzone.Idle>
                            <IconPhoto
                                style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
                                stroke={1.5}
                            />
                        </Dropzone.Idle>

                        <div>
                            <Text size="xl" inline>
                                Перетащите файлы сюда или щелкните, чтобы выбрать файлы
                            </Text>
                            <Text size="sm" c="dimmed" inline mt={7}>
                                Прикрепите столько файлов, сколько захотите. Каждый файл не должен превышать 5 МБ.
                            </Text>
                        </div>
                    </Group>
                </Dropzone>
                <Group justify="end" mt="md">
                    <Button onClick={handleUpload}>Загрузить</Button>
                </Group>
            </Paper>
        </Container>
    );
};

export default FileUpload;