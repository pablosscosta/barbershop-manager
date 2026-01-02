import { useEffect, useState } from "react"; 
import { getBarbers } from "../services/api";
import BarberForm from "../components/barbers/BarberForm";
import BarberList from "../components/barbers/BarberList";
import BarberItem from "../components/barbers/BarberItem";

function Barbers() {
    const [barbers, setBarbers] = useState([]);

    // Carregar barbeiros ao montar
    useEffect(() => {
      const fetchBarbers = async () => {
        try {
          const res = await getBarbers();
          setBarbers(res.data);
        } catch (err) {
          alert("Erro ao carregar barbeiros");
        }
      };
      fetchBarbers();
    }, []);

    // Callback para adicionar cliente recém-criado
    const handleBarberCreated = (newBarber) => {
      setBarbers((prev) => [...prev, newBarber]);
    };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Barbeiros</h1>
      <h2>Cadastro de Barbeiro</h2>
      <BarberForm onBarberCreated={handleBarberCreated} />
      <h2>Lista de Barbeiros</h2>
      <BarberList barbers={barbers} setBarbers={setBarbers} />
    </div>
  );
}

export default Barbers;
