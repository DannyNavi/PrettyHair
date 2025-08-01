import {Link, Navigate} from "react-router-dom";
import ClientServiceLog from "./ClientServiceLog";
function ClientCard(props){
    const client = props.client

    const deleteClient = async (id) => {
        try {
            const res = await fetch(`/api/clients/${id}`, {
                method: 'DELETE',
            });

            window.location.reload()

            if (!res.ok) throw new Error('Failed to delete client');
            // You can call a prop function here to refresh the client list if needed
            } catch (err) {
            console.error(err);
            alert('An error occurred while deleting the client');
        }
    };

    return(
        <div key={client._id} className="client-card" style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem 0' }}>
            <button onClick={() => deleteClient(client._id)}>Delete</button>
            <Link to={`/editclient/${client._id}`}>
                <button>Edit</button>
            </Link>
            <h2>{client.name}</h2>
            <p><strong>Email:</strong> {client.email}</p>
            <p><strong>Cell:</strong> {client.cell}</p>
            <p><strong>Allergies:</strong> {client.allergies || 'None'}</p>
            <p><strong>Birthday:</strong> {client.birthday}</p>
            <Link to={`/addspecificservice/${client._id}`}>
                <button>Add Service</button>
            </Link>
            <ClientServiceLog clientId={client._id}/>
        </div>
    )

}

export default ClientCard