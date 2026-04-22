import { Layout } from "antd";
import Navbar from "../components/organisms/Navbar";
import Footer from "../components/organisms/Footer";

const { Content } = Layout;

const MainLayout = ({ children }) => {
  return (
    <Layout style={{display: "flex",flexDirection: "column",minHeight: "100vh"}}>
      {/* navbar arriba */}
      <Navbar />

      {/* contenido principal */}
      <Content
        style={{
          flex: 1, // 🔥 clave: ocupa todo el espacio disponible
          padding: "20px",
        }}
      >
        {children}
      </Content>

      {/* linea electrica */}
      <div className="electric-line">
        <span className="ray ray1"></span>
        <span className="ray ray2"></span>
        <span className="ray ray3"></span>
      </div>

      {/* footer */}
      <Footer />
    </Layout>
  );
};

export default MainLayout;
