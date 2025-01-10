import { useState, useEffect } from "react";
import axios from "axios";
import car from '../assets/car.png'

interface Furnizor {
  idfurnizor: number;
  nume: string;
}

export default function Hero() {
  const [furnizori, setFurnizori] = useState<Furnizor[]>([]);

  const fetchFurnizori = async () => {
    try {
      const response = await axios.get<Furnizor[]>("http://localhost:8080/api/furnizori");
      setFurnizori(response.data);
    } catch (error) {
      console.error("Error fetching furnizori:", error);
    }
  };

  useEffect(() => {
    fetchFurnizori();
  }, []);

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
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
              Cumpără cele mai calitative piese auto!
            </h1>
            <p className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
              Te-ai săturat de piese slabe din punct de vedere al calității, care dăunează longevității autoturismului tău? Plaseaza o comandă la noi pentru a scăpa de aceste griji
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/comenzi"
                className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Comandă
              </a>
              <img src={car} style={{ width: "20%" }} />
              <a
                href="/piese"
                className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Vezi Piese
              </a>
            </div>
            <p className="mt-8 mb-4 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">Client nou? Înscrie-te pe listă!</p>
            <a
                href="/clienti"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Înscriere
              </a>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>

      {/* Furnizori Section */}
      <div className="container px-4">
        <h2 className="text-3xl font-semibold text-center mb-8">Furnizorii noștri:</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {furnizori.map((furnizor) => (
            <div key={furnizor.idfurnizor} className="bg-white p-6 shadow-lg rounded-lg">
              <h3 className="text-xl font-semibold text-center">{furnizor.nume}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
