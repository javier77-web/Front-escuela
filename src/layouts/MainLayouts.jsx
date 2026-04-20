import { Layout } from "antd";
import Navbar from "../components/organisms/Navbar";
import Footer from "../components/organisms/Footer";

const { Content } = Layout;

const MainLayout = ({ children }) => {
  return (
    <Layout>
      {/* navbar arriba */}
      <Navbar />

      {/* contenido */}
      <Content style={{ padding: "20px", minHeight: "70vh" }}>{children}</Content>

      {/* linea electrica */}
      <div className="electric-line">
        <span className="ray ray1"></span>
        <span className="ray ray2"></span>
        <span className="ray ray3"></span>
      </div>

      {/* footer*/}
      <Footer />
    </Layout>
  );
};

export default MainLayout;
