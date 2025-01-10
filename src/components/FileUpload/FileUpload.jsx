import {Dropzone, MIME_TYPES} from '@mantine/dropzone';
import {Group, Text, rem, Button, Container, Title, Paper, Box, LoadingOverlay} from '@mantine/core';
import { IconFileText, IconFileFilled, IconX } from '@tabler/icons-react';
import {useState} from "react";
import {useUploadTemplatesMutation} from "@/hooks/index.js";
import {notifications} from "@mantine/notifications";

const FileUpload = (props) => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const uploadMutation = useUploadTemplatesMutation();

    const handleUpload = () => {
        setLoading(true);
        uploadMutation.mutate({file : file}, {
            onSuccess: (data) => {
                console.log('Success', data);
                setLoading(false);
                setFile(null);
                notifications.show({
                    title: 'Успешно',
                    message: 'Файл успешно загружен',
                })
            },
            onError: (error) => {
                console.log('Error', error);
                setLoading(false);
                notifications.show({
                    title: 'Ошибка',
                    message: 'Произошла ошибка при загрузке файла',
                    color: "red"
                })
            },
        });
    }

    const previews = () => {
        if (file) {
            const fileType = file.type;
            if (fileType === MIME_TYPES.csv) {
                return  <Text fz={18} fw={500} w="100%" ta="center">{file.name} выбран</Text>
            }
        }
        return null;
    };

    return (
        <Container size={1280}>
            <Title fw={500}>
                Загрузка файлов
            </Title>

            <Box pos="relative">
                <LoadingOverlay
                    visible={loading}
                    zIndex={1000}
                    overlayProps={{ radius: "sm", blur: 2 }}
                />
                <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                    <Dropzone
                        onDrop={(files) => setFile(files[0])}
                        onReject={(files) => console.log('rejected files', files)}
                        maxSize={5 * 1024 ** 2}
                        multiple={false}
                        accept={[MIME_TYPES.csv]}
                        {...props}
                    >
                        <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
                            <Dropzone.Idle>
                                <IconFileText
                                    style={{ width: rem(80), height: rem(80), color: 'var(--mantine-color-dimmed)' }}
                                    stroke={1.5}
                                />
                            </Dropzone.Idle>

                            <Group justify="center" gap={12} style={{ pointerEvents: 'none' }}>
                                {previews()}
                                <Text ta="center" size="md" c="dimmed" fw={400} inline>
                                    Загрузите файл или просто перетащите файл сюда
                                </Text>
                            </Group>
                        </Group>
                    </Dropzone>
                    <Group justify="end" mt="md">
                        <Button onClick={handleUpload}>Загрузить</Button>
                    </Group>
                </Paper>
            </Box>
        </Container>
    );
};

export default FileUpload;