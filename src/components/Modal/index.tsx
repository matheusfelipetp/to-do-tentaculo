import { TaskProps } from '@/contexts/TaskContext';
import { useTask } from '@/hooks/useTask';
import { mockOptionsCreate } from '@/mocks/options';
import {
  Col,
  DatePicker,
  Form,
  Input,
  Modal as ModalAntd,
  Row,
  Select,
} from 'antd';
import locale from 'antd/es/date-picker/locale/pt_BR';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

type ModalProps = {
  open: boolean;
  handleCancel: () => void;
  isEditMode?: boolean;
  taskSelected?: TaskProps;
};

const datePickerStyle = {
  width: '100%',
  background: '#262626',
  border: 'none',
  padding: '0.8rem',
};

const rules = [
  {
    required: true,
    message: 'Campo obrigatório',
  },
];

export const Modal = ({
  open,
  handleCancel,
  isEditMode = false,
  taskSelected,
}: ModalProps) => {
  const [dateSelected, setDateSelected] = useState('');

  const { createTask, updateTask } = useTask();

  const [form] = Form.useForm();

  const handleDate = (date: any) => {
    const dateFormatted = dayjs(date.$d).format('YYYY-MM-DD');

    setDateSelected(dateFormatted);
  };

  const handleCloseModal = () => {
    handleCancel();
    form.resetFields();
  };

  const handleCreateTask = (values: TaskProps) => {
    const newTask = {
      ...values,
      id: uuid(),
      date: dateSelected,
    };

    createTask(newTask);
    handleCloseModal();
  };

  const handleUpdateTask = (values: TaskProps) => {
    const taskDate = taskSelected?.date ? taskSelected.date : '';

    const newTask = {
      ...values,
      date: dateSelected ? dateSelected : taskDate,
    };

    if (taskSelected?.id) {
      updateTask(taskSelected.id, newTask);
    }

    handleCloseModal();
  };

  useEffect(() => {
    if (taskSelected) {
      form.setFieldsValue({
        title: taskSelected.title,
        description: taskSelected.description,
        category: taskSelected.category,
        date: dayjs(taskSelected.date),
      });
    }
  }, [taskSelected]);

  return (
    <ModalAntd
      open={open}
      onCancel={handleCloseModal}
      centered
      width={600}
      cancelText="Fechar"
      okText={isEditMode ? 'Editar' : 'Adicionar'}
      onOk={form.submit}
      title={isEditMode ? 'Editar tarefa' : 'Adicionar tarefa'}
    >
      <Form
        form={form}
        onFinish={isEditMode ? handleUpdateTask : handleCreateTask}
      >
        <Row gutter={[16, 0]}>
          <Col xs={24}>
            <Form.Item name="title" rules={rules}>
              <Input className="input" placeholder="Digite o nome da tarefa" />
            </Form.Item>
          </Col>

          <Col xs={24}>
            <Form.Item name="description" rules={rules}>
              <Input
                className="input"
                placeholder="Digite a descrição da tarefa"
              />
            </Form.Item>
          </Col>

          <Col xs={24}>
            <Form.Item initialValue="Normal" name="category" rules={rules}>
              <Select defaultValue="Normal">
                {mockOptionsCreate.map(({ id, option }) => (
                  <Select.Option key={id} value={option}>
                    {option}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24}>
            <Form.Item name="date" rules={rules}>
              <DatePicker
                onChange={handleDate}
                style={datePickerStyle}
                format={['DD/MM/YYYY']}
                placeholder="Selecione a data"
                locale={locale}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </ModalAntd>
  );
};
