import { Button, Checkbox, Form, Input, Typography } from 'antd';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import Layout from "../../components/Layout";

const { Title } = Typography;

const UserPage = (props) => {
  const { user } = props;
  const router = useRouter()

  const signOut = () => {
    deleteCookie("token", { path: '/', domain: 'localhost' });
    router.push("/login");
  };

  return (
    <Layout>
      <Title level={2}>Личный кабинет</Title>
      <Button type="link" htmlType="button" onClick={signOut}>
          Выйти
      </Button>
    </Layout>
  );
};

export default UserPage;