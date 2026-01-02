import { useEffect, useState } from "react"; 
import { getClients } from "../services/api";
import ClientForm from "../components/clients/ClientForm";
import ClientList from "../components/clients/ClientList";
import ClientItem from "../components/clients/ClientItem";

function Clients() {
    const [clients, setClients] = useState([]);

    // Carregar clientes ao montar
    useEffect(() => {
      const fetchClients = async () => {
        try {
          const res = await getClients();
          setClients(res.data);
        } catch (err) {
          alert("Erro ao carregar clientes");
        }
      };
      fetchClients();
    }, []);

    // Callback para adicionar cliente recém-criado
    const handleClientCreated = (newClient) => {
      setClients((prev) => [...prev, newClient]);
    };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Clientes</h1>
      <h2>Cadastro de Cliente</h2>
      <ClientForm onClientCreated={handleClientCreated} />
      <h2>Lista de Clientes</h2>
      <ClientList clients={clients} setClients={setClients} />
    </div>
  );
}

export default Clients;
