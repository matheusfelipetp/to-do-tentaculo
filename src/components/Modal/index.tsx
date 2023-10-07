import { useTask } from '@/hooks/useTask';
import { mockOptionsCreate } from '@/mocks/options';
import { TaskProps } from '@/types/task';
import { Col, DatePicker, Form, Input, Modal as ModalAntd, Row } from 'antd';
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
      isFinished: false,
    };

    createTask(newTask);
    handleCloseModal();
  };

  const handleUpdateTask = (values: TaskProps) => {
    const taskDate = taskSelected?.date ? taskSelected.date : '';

    const newTask = {
      ...taskSelected,
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
      okButtonProps={{ 'data-testid': 'add-button' }}
      okText={isEditMode ? 'Editar' : 'Adicionar'}
      onOk={form.submit}
      title={isEditMode ? 'Editar tarefa' : 'Adicionar tarefa'}
      data-testid="modal"
    >
      <Form
        form={form}
        onFinish={isEditMode ? handleUpdateTask : handleCreateTask}
      >
        <Row gutter={[16, 0]}>
          <Col xs={24}>
            <Form.Item name="title" rules={rules}>
              <Input
                className="input"
                placeholder="Digite o nome da tarefa"
                data-testid="input-name"
              />
            </Form.Item>
          </Col>

          <Col xs={24}>
            <Form.Item name="description">
              <Input
                className="input"
                placeholder="Digite a descrição da tarefa"
                data-testid="input-description"
              />
            </Form.Item>
          </Col>

          <Col xs={24}>
            <Form.Item initialValue="Normal" name="category" rules={rules}>
              <select className="select" data-testid="select-category">
                {mockOptionsCreate.map(({ id, option }) => (
                  <option key={id} value={option}>
                    {option}
                  </option>
                ))}
              </select>
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
                data-testid="input-date"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </ModalAntd>
  );
};
