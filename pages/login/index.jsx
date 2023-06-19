import { useState } from 'react';
import dbConnect from 'lib/dbConnect';
import axios from 'axios';
import { useRouter } from 'next/router'
import getUser from 'lib/getUser';
import InputMask from 'react-input-mask';

import { Button, Checkbox, Form, Input, Typography } from 'antd';
import Layout from 'components/Layout';

const { Title } = Typography;

export async function getServerSideProps({ req, res }) {
  await dbConnect();

  const user = await getUser(req, res);

  if (user) {
    return {
      redirect: {
        permanent: false,
        destination: "/user",
      },
      props: {
        user,
      },
    };
  }

  return {
    props: {
      user,
    },
  };
}

const LoginPage = (props) => {
  const { user } = props;
  const [isRegistration, setIsRegistration] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("")
  const [birthDate, setBirthDate] = useState("")

  const router = useRouter()

  const onFinish = async (values) => {
    const { name, email, password, isLegalPerson } = values;
  
    try {
      if (isRegistration) {
        await axios.post("/api/signup", {
          name,
          email,
          password,
          isLegalPerson,
        });
      } else {
        await axios.post("/api/signin", {
          email,
          password,
        });
      }
  
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  
  };
  
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onFill = () => {
    setIsRegistration(prev => !prev);
  };

  return (
    <Layout>
      <Title level={2}>{isRegistration ? "Регистрация" : "Войти"}</Title>
      <Form
        name="basic"
        layout="vertical"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ isLegalPerson: false }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="email"
          name="email"
          rules={[
            {
              type: 'email',
              message: 'Некорректный адрес электронной почты',
            },
            {
              required: true,
              message: 'Пожалуйста, введите свою почту',
            },
          ]}
        >
          <Input />
        </Form.Item>

        {isRegistration && (
          <>
            <Form.Item
              label="ФИО"
              name="name"
              rules={[{ required: true, message: 'Пожалуйста, введите ваше имя' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="номер телефона"
              name="contactPhone"
              rules={[{ required: true, message: 'Пожалуйста, введите ваш номер телефона' }]}
            >
              <InputMask mask="+7 (\999) 999-99-99" placeholder="+7 (999) 999-99-99" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}>
                {(inputProps) => <Input {...inputProps} />}
              </InputMask>
            </Form.Item>

            <Form.Item
              label="дата рождения"
              name="birthDate"
              rules={[
                { required: true, message: 'Пожалуйста, введите вашу дату рождения' },
              ]}
            >
              <InputMask mask="99.99.9999" value={birthDate} placeholder="01.01.1990" onChange={(e) => setBirthDate(e.target.value)}>
                {(inputProps) => <Input {...inputProps} />}
              </InputMask>
            </Form.Item>
          </>
        )}

        <Form.Item
          label="пароль"
          name="password"
          rules={[
            { required: true, message: 'Пожалуйста, введите ваш пароль' },
            { pattern: /^(?=.*\d)\w{6,20}$/m, message: 'Пароль короче 6 символов или не содержит 1 цифру' },
          ]}
          hasFeedback={isRegistration}
        >
          <Input.Password />
        </Form.Item>

        {isRegistration && (
          <Form.Item
            name="confirmPassword"
            label="повторите пароль"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Пожалуйста, повторно введите ваш пароль',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Пароли не совпадают'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
        )}

        {isRegistration && (
          <Form.Item name="isLegalPerson" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
            <Checkbox>Юридическое лицо</Checkbox>
          </Form.Item>
        )}

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            {isRegistration ? "Отправить" : "Вход"}
          </Button>
          <Button type="link" htmlType="button" onClick={onFill}>
            {isRegistration ? "Авторизоваться" : "Зарегестрироваться"}
          </Button>
        </Form.Item>
      </Form>
    </Layout>
)};

export default LoginPage;