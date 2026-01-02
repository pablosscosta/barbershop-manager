import { useEffect, useState } from "react";
import { getServices } from "../services/api";
import ServiceForm from "../components/services/ServiceForm";
import ServiceList from "../components/services/ServiceList";

function Services() {
  const [services, setServices] = useState([]);

  // Carregar serviços ao montar
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await getServices();
        setServices(res.data);
      } catch (err) {
        alert("Erro ao carregar serviços");
      }
    };
    fetchServices();
  }, []);

  // Callback para adicionar serviço recém-criado
  const handleServiceCreated = (newService) => {
    setServices((prev) => [...prev, newService]);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Serviços</h1>
      <h2>Cadastro de Serviço</h2>
      <ServiceForm onServiceCreated={handleServiceCreated} />
      <h2>Lista de Serviços</h2>
      <ServiceList services={services} setServices={setServices} />
    </div>
  );
}

export default Services;
