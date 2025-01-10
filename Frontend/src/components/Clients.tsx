import React, { useState, useEffect } from "react";
import axios from "axios";
import car2 from "../assets/car2.png";

interface Client {
  idclient?: number; 
  nume: string;
  nr_tel: string;
  mail: string;
  tip_client: "firma" | "persoana_fizica"; 
}

export default function Clienti() {
  const [clienti, setClienti] = useState<Client[]>([]);
  const [newClient, setNewClient] = useState<Client>({
    nume: "",
    nr_tel: "",
    mail: "",
    tip_client: "firma", 
  });

  const [editingClient, setEditingClient] = useState<Client | null>(null); 
  const [showEditModal, setShowEditModal] = useState(false);

  const fetchClienti = async () => {
    try {
      const response = await axios.get<Client[]>("http://localhost:8080/api/clienti");
      setClienti(response.data);
    } catch (error) {
      console.error("Error fetching clienti:", error);
    }
  };

  useEffect(() => {
    fetchClienti();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {

      const clientData = { ...newClient, tip_client: newClient.tip_client.toLowerCase() };

      if (editingClient) {
        // Update the client if we are editing
        await axios.put(`http://localhost:8080/api/clienti/${editingClient.idclient}`, clientData);
        setEditingClient(null);
        setShowEditModal(false);
      } else {
        // Create a new client
        await axios.post("http://localhost:8080/api/clienti", clientData);
      }

      fetchClienti();
      setNewClient({
        nume: "",
        nr_tel: "",
        mail: "",
        tip_client: "firma",
      });
    } catch (error) {
      console.error("Error submitting client:", error);
    }
  };

  const handleEdit = (client: Client) => {
    setEditingClient(client);
    setNewClient(client);
    setShowEditModal(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/api/clienti/${id}`);
      fetchClienti();
    } catch (error) {
      console.error("Error deleting client:", error);
    }
  };

  return (
    <div className="bg-white">

      {/*HERO*/}

      <div className="relative isolate px-6 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
        <div className="mx-auto max-w-7xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <div className="flex items-center justify-center">
              <img src={car2} style={{ width: "20%" }} />
            </div>
            <h1 className="text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
              Clienți
            </h1>
            <p className="mt-8 text-lg font-medium text-gray-500 sm:text-xl">
              Vizualizare | Editare | Adăugare | Eliminare
            </p>

            {/* Client list */}
            <div className="mt-10">
              <ul className="space-y-4">
                {clienti.map((client) => (
                  <li key={client.idclient} className="bg-white p-4 shadow rounded-lg">
                    <h2 className="text-xl font-semibold mb-2">{client.nume}</h2>
                    <p><strong>Telefon:</strong> {client.nr_tel}</p>
                    <p><strong>Email:</strong> {client.mail}</p>
                    <p><strong>Tip client:</strong> {client.tip_client}</p>
                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => handleEdit(client)}
                        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(client.idclient!)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Create form */}
            <div className="mt-12 max-w-2xl mx-auto">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Adaugă Client</h2>
              <form onSubmit={handleSubmit} className="bg-gray-200 p-6 shadow rounded-lg">
                <input
                  type="text"
                  value={newClient.nume}
                  onChange={(e) => setNewClient({ ...newClient, nume: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                  placeholder="Nume Client"
                  required
                />
                <input
                  type="text"
                  value={newClient.nr_tel}
                  onChange={(e) => setNewClient({ ...newClient, nr_tel: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                  placeholder="Număr de telefon"
                  required
                />
                <input
                  type="email"
                  value={newClient.mail}
                  onChange={(e) => setNewClient({ ...newClient, mail: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                  placeholder="Email"
                  required
                />
                <select
                  value={newClient.tip_client}
                  onChange={(e) => setNewClient({ ...newClient, tip_client: e.target.value as "firma" | "persoana_fizica" })}
                  className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                  required
                >
                  <option value="firma">firma</option>
                  <option value="persoana_fizica">Persoană fizică</option>
                </select>

                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Adaugă Client
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Edit Modal */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-2xl font-semibold mb-4">Edit Client</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  value={newClient.nume}
                  onChange={(e) => setNewClient({ ...newClient, nume: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Nume Client"
                  required
                />
                <input
                  type="text"
                  value={newClient.nr_tel}
                  onChange={(e) => setNewClient({ ...newClient, nr_tel: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Număr de telefon"
                  required
                />
                <input
                  type="email"
                  value={newClient.mail}
                  onChange={(e) => setNewClient({ ...newClient, mail: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Email"
                  required
                />
                <select
                  value={newClient.tip_client}
                  onChange={(e) => setNewClient({ ...newClient, tip_client: e.target.value as "firma" | "persoana_fizica" })}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                >
                  <option value="firma">firma</option>
                  <option value="persoana_fizica">Persoană fizică</option>
                </select>

                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
