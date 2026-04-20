import { Layout } from "antd";
import Navbar from "../components/organisms/Navbar";
import Footer from "../components/organisms/Footer";

const { Content } = Layout;

const MainLayout = ({ children }) => {
  return (
    <Layout>
      <Navbar />
      <Content style={{ padding: "20px" }}>
        {children}
      </Content>
      <Footer />
    </Layout>
  );
};

export default MainLayout;