import { useState } from "react";
import { getCep, getCoordinates } from "../../services/api";

const Modal = ({ setDestinations }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [cep, setCep] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [numero, setNumero] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf, setUf] = useState('');

    const fetchCepData = async (cep) => {
        const data = await getCep(cep); 
        if (data) {
            setLogradouro(data.logradouro || '');
            setBairro(data.bairro || '');
            setCidade(data.localidade || '');
            setUf(data.uf || '');
        }
    };

    const fetchCoordinatesData = async () => {
        const address = `${logradouro}, ${numero}, ${bairro}, ${cidade}, ${uf}`;
        const data = await getCoordinates(address);
        if (data && data.results && data.results.length > 0) {
            const { lat, lng } = data.results[0].geometry?.location;

            setDestinations(prev => [
            ...prev,
            { nome: "Destino do Modal", coords: [lng, lat] }
            ]);
        } else {
            console.log('No coordinates found for the given address.');
        }
        setModalOpen(false);
    };

    return(
        <>
            <button 
            className="absolute top-4 left-4 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center" 
            type="button"
            onClick={() => setModalOpen(true)}>
                Toggle modal
            </button>

            {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="relative p-4 w-full max-w-2xl max-h-full">
                       <div className="relative bg-white rounded-lg shadow-sm">
                        {/* Modal header */}
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-300 border-gray-200">
                            <h3 className="text-xl font-semibold text-gray-900">
                                Terms of Service
                            </h3>
                            <button type="button" onClick={() => setModalOpen(false)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {/* Modal body  */}
                        <div className="p-4 md:p-5 space-y-4">
                            <form>
                                <div className="flex flex-col gap-1 w-96">
                                    <label className="text-gray-700 text-sm">CEP</label>
                                    <input
                                        type="text"
                                        placeholder="Type here"
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                                        value={cep}
                                        onChange={(e) => setCep(e.target.value)}
                                        onBlur={() => fetchCepData(cep)}
                                    />
                                    <p className="text-xs text-gray-500">Assistive Text</p>
                                </div>
                                <div className="flex flex-col gap-1 w-96">
                                    <label className="text-gray-700 text-sm">Logradouro</label>
                                    <input
                                        type="text"
                                        placeholder="Type here"
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                                        value={logradouro}
                                        onChange={(e) => setLogradouro(e.target.value)}
                                    />
                                    <p className="text-xs text-gray-500">Assistive Text</p>
                                </div>
                                <div className="flex flex-col gap-1 w-96">
                                    <label className="text-gray-700 text-sm">Número</label>
                                    <input
                                        type="text"
                                        placeholder="Type here"
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                                        value={numero}
                                        onChange={(e) => setNumero(e.target.value)}
                                    />
                                    <p className="text-xs text-gray-500">Assistive Text</p>
                                </div>
                                <div className="flex flex-col gap-1 w-96">
                                    <label className="text-gray-700 text-sm">Bairro</label>
                                    <input
                                        type="text"
                                        placeholder="Type here"
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                                        value={bairro}
                                        onChange={(e) => setBairro(e.target.value)}
                                    />
                                    <p className="text-xs text-gray-500">Assistive Text</p>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex flex-col gap-1 w-96">
                                        <label className="text-gray-700 text-sm">Cidade</label>
                                        <input
                                            type="text"
                                            placeholder="Type here"
                                            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                                            value={cidade}
                                            onChange={(e) => setCidade(e.target.value)}
                                        />
                                        <p className="text-xs text-gray-500">Assistive Text</p>
                                    </div>
                                    <div className="flex flex-col gap-1 w-40">
                                        <label className="text-gray-700 text-sm">UF</label>
                                        <input
                                            type="text"
                                            placeholder="Type here"
                                            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                                            value={uf}
                                            onChange={(e) => setUf(e.target.value)}
                                        />
                                        <p className="text-xs text-gray-500">Assistive Text</p>
                                    </div>
                                </div>
                            </form>
                        </div>
                        {/* Modal footer */}
                        <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-300">
                            <button data-modal-hide="default-modal" type="button" onClick={() => fetchCoordinatesData()} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Adicionar</button>
                            <button data-modal-hide="default-modal" type="button" onClick={() => setModalOpen(false)} className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Cancelar</button>
                        </div>
                    </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;