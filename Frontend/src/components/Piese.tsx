import React, { useState, useEffect } from "react";
import axios from "axios";
import car from "../assets/car.png"

interface Piesa {
    idpiesa?: number;
    nume: string;
    pret: number;
    an_fabricatie: number;
    idfurnizor?: number;
    idcategorie?: number;
    furnizorNume: string;
    categorieNume: string;
}

interface Furnizor {
    idfurnizor: number;
    nume: string;
}

interface Categorie {
    idcategorie: number;
    nume: string;
}

export default function Piese() {
    const [piese, setPiese] = useState<Piesa[]>([]);
    const [newPiesa, setNewPiesa] = useState<Piesa>({
        nume: "",
        pret: 0,
        an_fabricatie: 0,
        furnizorNume: "",
        categorieNume: "",
    });

    const [editingId, setEditingId] = useState<number | null>(null);
    const [showEditModal, setShowEditModal] = useState(false);

    const [furnizori, setFurnizori] = useState<Furnizor[]>([]);
    const [categorii, setCategorii] = useState<Categorie[]>([]);

    const fetchPiese = async () => {
        try {
            const response = await axios.get<Piesa[]>("http://localhost:8080/api/piese");
            setPiese(response.data);
        } catch (error) {
            console.error("Error fetching piese:", error);
        }
    };

    const fetchFurnizori = async () => {
        try {
            const response = await axios.get<Furnizor[]>("http://localhost:8080/api/furnizori");
            setFurnizori(response.data);
        } catch (error) {
            console.error("Error fetching furnizori:", error);
        }
    };

    const fetchCategorii = async () => {
        try {
            const response = await axios.get<Categorie[]>("http://localhost:8080/api/categorii");
            setCategorii(response.data);
        } catch (error) {
            console.error("Error fetching categorii:", error);
        }
    };

    useEffect(() => {
        fetchPiese();
        fetchFurnizori();
        fetchCategorii();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const selectedFurnizor = furnizori.find((f) => f.nume === newPiesa.furnizorNume);
        const selectedCategorie = categorii.find((c) => c.nume === newPiesa.categorieNume);

        if (!selectedFurnizor || !selectedCategorie) {
            console.error("Invalid furnizor or categorie selection");
            return;
        }

        const piesaToSubmit = {
            ...newPiesa,
            idfurnizor: selectedFurnizor.idfurnizor,
            idcategorie: selectedCategorie.idcategorie,
            furnizorNume: undefined, // Not needed in the payload
            categorieNume: undefined, // Not needed in the payload
        };

        try {
            if (editingId !== null) {
                await axios.put(`http://localhost:8080/api/piese/${editingId}`, piesaToSubmit);
                setEditingId(null);
            } else {
                await axios.post("http://localhost:8080/api/piese", piesaToSubmit);
            }

            fetchPiese();
            setNewPiesa({
                nume: "",
                pret: 0,
                an_fabricatie: 0,
                furnizorNume: "",
                categorieNume: "",
            });
        } catch (error) {
            console.error("Error submitting piesa:", error);
        }
    };

    const handleEdit = (piesa: Piesa) => {
        setNewPiesa(piesa);
        setEditingId(piesa.idpiesa || null);
        setShowEditModal(true);
    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`http://localhost:8080/api/piese/${id}`);
            fetchPiese();
        } catch (error) {
            console.error("Error deleting piesa:", error);
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
                            <img src={car} style={{ width: "20%" }} />
                        </div>
                        <h1 className="text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
                            Piese Auto
                        </h1>
                        <p className="mt-8 text-lg font-medium text-gray-500 sm:text-xl">
                            Vizualizare | Editare | Adăugare | Eliminare
                        </p>
                        <p className="mt-8 text-lg font-medium text-gray-500 sm:text-xl">
                            Categorii valabile:
                            <span className="ml-2">
                                {categorii.map((categorie, index) => (
                                    <React.Fragment key={categorie.idcategorie}>
                                        {categorie.nume}
                                        {index < categorii.length - 1 && " | "} {/* Add pipe except for the last category */}
                                    </React.Fragment>
                                ))}
                            </span>
                        </p>


                        {/* Product list */}
                        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {piese.map((piesa) => (
                                <div
                                    key={piesa.idpiesa}
                                    className="bg-white p-4 shadow rounded-lg border flex flex-col justify-between"
                                >
                                    <h2 className="text-xl font-semibold mb-2">{piesa.nume}</h2>
                                    <p><strong>Preț:</strong> {piesa.pret} RON</p>
                                    <p><strong>An fabricație:</strong> {piesa.an_fabricatie}</p>
                                    <p><strong>Categorie:</strong> {piesa.categorieNume}</p>
                                    <p><strong>Furnizor:</strong> {piesa.furnizorNume}</p>
                                    <div className="mt-4 flex gap-2">
                                        <button
                                            onClick={() => handleEdit(piesa)}
                                            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(piesa.idpiesa!)}
                                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Create form */}
                        <div className="mt-12 max-w-2xl mx-auto">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Adaugă Piesa</h2>
                            <form onSubmit={handleSubmit} className="bg-gray-200 p-6 shadow rounded-lg">
                                <input
                                    type="text"
                                    value={newPiesa.nume}
                                    onChange={(e) => setNewPiesa({ ...newPiesa, nume: e.target.value })}
                                    className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                                    placeholder="Nume Piesa"
                                    required
                                />
                                <input
                                    type="number"
                                    value={newPiesa.pret || ""}
                                    onChange={(e) => setNewPiesa({ ...newPiesa, pret: +e.target.value })}
                                    className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                                    placeholder="Preț"
                                    required
                                />
                                <input
                                    type="number"
                                    value={newPiesa.an_fabricatie || ""}
                                    onChange={(e) => setNewPiesa({ ...newPiesa, an_fabricatie: +e.target.value })}
                                    className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                                    placeholder="An fabricație"
                                    required
                                />

                                <select
                                    value={newPiesa.categorieNume}
                                    onChange={(e) => setNewPiesa({ ...newPiesa, categorieNume: e.target.value })}
                                    className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                                    required
                                >
                                    <option value="">Selectează Categorie</option>
                                    {categorii.map((categorie) => (
                                        <option key={categorie.idcategorie} value={categorie.nume}>
                                            {categorie.nume}
                                        </option>
                                    ))}
                                </select>

                                <select
                                    value={newPiesa.furnizorNume}
                                    onChange={(e) => setNewPiesa({ ...newPiesa, furnizorNume: e.target.value })}
                                    className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                                    required
                                >
                                    <option value="">Selectează Furnizor</option>
                                    {furnizori.map((furnizor) => (
                                        <option key={furnizor.idfurnizor} value={furnizor.nume}>
                                            {furnizor.nume}
                                        </option>
                                    ))}
                                </select>

                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    {editingId ? "Salvează Modificările" : "Adaugă Piesa"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Edit Modal */}
                {showEditModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                            <h2 className="text-2xl font-semibold mb-4">Edit Piesa</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input
                                    type="text"
                                    value={newPiesa.nume}
                                    onChange={(e) => setNewPiesa({ ...newPiesa, nume: e.target.value })}
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                    placeholder="Nume Piesa"
                                    required
                                />
                                <input
                                    type="number"
                                    value={newPiesa.pret}
                                    onChange={(e) => setNewPiesa({ ...newPiesa, pret: +e.target.value })}
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                    placeholder="Preț"
                                    required
                                />
                                <input
                                    type="number"
                                    value={newPiesa.an_fabricatie}
                                    onChange={(e) => setNewPiesa({ ...newPiesa, an_fabricatie: +e.target.value })}
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                    placeholder="An fabricație"
                                    required
                                />
                                <select
                                    value={newPiesa.categorieNume}
                                    onChange={(e) => setNewPiesa({ ...newPiesa, categorieNume: e.target.value })}
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                    required
                                >
                                    <option value="">Selectează Categorie</option>
                                    {categorii.map((categorie) => (
                                        <option key={categorie.idcategorie} value={categorie.nume}>
                                            {categorie.nume}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    value={newPiesa.furnizorNume}
                                    onChange={(e) => setNewPiesa({ ...newPiesa, furnizorNume: e.target.value })}
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                    required
                                >
                                    <option value="">Selectează Furnizor</option>
                                    {furnizori.map((furnizor) => (
                                        <option key={furnizor.idfurnizor} value={furnizor.nume}>
                                            {furnizor.nume}
                                        </option>
                                    ))}
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
