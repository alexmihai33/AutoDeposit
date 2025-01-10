import React, { useState, useEffect } from "react";
import axios from "axios";
import car3 from "../assets/car3.png";

interface Comanda {
    idcomanda?: number;
    piesa: { idpiesa: number; nume: string };
    client: { idclient: number; nume: string };
    adresa_livrare: string;
}

interface Piesa {
    idpiesa: number;
    nume: string;
}

interface Client {
    idclient: number;
    nume: string;
}

const Comenzi = () => {
    const [comenzi, setComenzi] = useState<Comanda[]>([]);
    const [piese, setPiese] = useState<Piesa[]>([]);
    const [clienti, setClienti] = useState<Client[]>([]);
    const [newComanda, setNewComanda] = useState<Comanda>({
        piesa: { idpiesa: 0, nume: "" },
        client: { idclient: 0, nume: "" },
        adresa_livrare: "",
    });

    // Fetch all comenzi
    const fetchComenzi = async () => {
        try {
            const response = await axios.get<Comanda[]>("http://localhost:8080/api/comenzi");
            setComenzi(response.data);
        } catch (error) {
            console.error("Error fetching comenzi:", error);
        }
    };

    // Fetch piese (for dropdown)
    const fetchPiese = async () => {
        try {
            const response = await axios.get<Piesa[]>("http://localhost:8080/api/piese");
            setPiese(response.data);
        } catch (error) {
            console.error("Error fetching piese:", error);
        }
    };

    // Fetch clienti (for dropdown)
    const fetchClienti = async () => {
        try {
            const response = await axios.get<Client[]>("http://localhost:8080/api/clienti");
            setClienti(response.data);
        } catch (error) {
            console.error("Error fetching clienti:", error);
        }
    };

    // Handle form submission to create a new comanda
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            // Send the request for creating a new comanda without the idcomanda field
            const response = await axios.post("http://localhost:8080/api/comenzi", newComanda);
            setComenzi([...comenzi, response.data]); // Update the comenzi list
        } catch (error) {
            console.error("Error creating comanda:", error);
        }
    };

    useEffect(() => {
        fetchComenzi();
        fetchPiese();
        fetchClienti();
    }, []);

    return (

        <div className="bg-white">
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
                            <img src={car3} style={{ width: "20%" }} />
                        </div>
                        <h1 className="text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">Comenzi</h1>
                        <p className="mt-8 text-lg font-medium text-gray-500 sm:text-xl">Vizualizare | Adăugare</p>
                        
                        {/* Create Form */}
                        <div className="mt-12 max-w-2xl mx-auto">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Adaugă Comanda</h2>
                            <form onSubmit={handleSubmit} className="bg-gray-200 p-6 shadow rounded-lg">
                                <select
                                    value={newComanda.piesa.idpiesa}
                                    onChange={(e) => setNewComanda({ ...newComanda, piesa: { idpiesa: Number(e.target.value), nume: "" } })}
                                    className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                                    required
                                >
                                    <option value="">Select Piesa</option>
                                    {piese.map((piesa) => (
                                        <option key={piesa.idpiesa} value={piesa.idpiesa}>
                                            {piesa.nume}
                                        </option>
                                    ))}
                                </select>

                                <select
                                    value={newComanda.client.idclient}
                                    onChange={(e) => setNewComanda({ ...newComanda, client: { idclient: Number(e.target.value), nume: "" } })}
                                    className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                                    required
                                >
                                    <option value="">Select Client</option>
                                    {clienti.map((client) => (
                                        <option key={client.idclient} value={client.idclient}>
                                            {client.nume}
                                        </option>
                                    ))}
                                </select>

                                <input
                                    type="text"
                                    value={newComanda.adresa_livrare}
                                    onChange={(e) => setNewComanda({ ...newComanda, adresa_livrare: e.target.value })}
                                    className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                                    placeholder="Adresa Livrare"
                                    required
                                />

                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    Adaugă Comanda
                                </button>
                            </form>
                        </div>
                        {/* Comenzi List */}
                        <div className="mt-10">
                            <ul className="space-y-4">
                                {comenzi.map((comanda) => (
                                    <li key={comanda.idcomanda} className="bg-white p-4 shadow rounded-lg">
                                        <h2 className="text-xl font-semibold mb-2">
                                            Comanda #{comanda.idcomanda}
                                        </h2>
                                        <p><strong>Piesa:</strong> {comanda.piesa.nume}</p>  {/* Add a fallback in case nume is empty */}
                                        <p><strong>Client:</strong> {comanda.client.nume}</p>  {/* Add a fallback in case nume is empty */}
                                        <p><strong>Adresa Livrare:</strong> {comanda.adresa_livrare}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Comenzi;
