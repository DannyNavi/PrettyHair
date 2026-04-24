import { useEffect, useState } from 'react';
import ClientCard from './ClientCard';
import "../../styles/clientbookstyles.css" 

function ClientBook() {
  const [clients, setClients] = useState([]);
  const [searchName, setSearchName] = useState("")

  useEffect(() => {
    fetch('/api/clients') 
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setClients(data);
      })
      .catch((error) => {
        console.error('Error fetching clients:', error);
      });
  }, []);

  return (
    <div>
      <input
        placeholder='Client Name'
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
      />
    <div className="ClientBookContainer">
      {clients
        .filter((client) =>
          !searchName
            ? true
            : client.name.toLowerCase().includes(searchName.toLowerCase())
        )
        .map((client) => (
          <ClientCard client={client} key={client._id} />
        ))}
    </div>
    </div>
  );
}

export default ClientBook;
