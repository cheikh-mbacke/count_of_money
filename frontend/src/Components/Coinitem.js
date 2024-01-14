import React, {useState} from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import cryptoService from "../Actions/Crypto";
import {faChartLine, faClipboardList, faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Modal from 'react-modal'

const Coinitem = (props) => {
    const user = useSelector((state) => state.auth.user);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const handleDeleteFromFavorite = async () => {
        if (!user) {
            setModalMessage("Vous devez être connecté pour supprimer des favoris.");
            setModalIsOpen(true);
            return;
        }
        try {
            const response = await cryptoService.deleteCrypto(props.coins.id);
            setModalMessage(response.message);
            setModalIsOpen(true);
        } catch (error) {
            console.error(error);
            setModalMessage("Une erreur s'est produite lors de la suppression des favoris.");
            setModalIsOpen(true);
        }
    };

    const handleAddToFavorites = async () => {
        if (!user) {
            setModalMessage("Vous devez être connecté pour ajouter aux favoris.");
            setModalIsOpen(true);
            return;
        }
        try {
            const payloadAdd = {
                userId: user.userId,
                cryptoId: props.coins.id,
                nom: props.coins.name,
                roleName: user.roleName,
            };
            const response = await cryptoService.addCrypto(payloadAdd);
            setModalMessage(response.message);
            setModalIsOpen(true);
        } catch (error) {
            console.error(error);
            setModalMessage("Une erreur s'est produite lors de l'ajout aux favoris.");
            setModalIsOpen(true);
        }
    };

    const closeModal = () => {
        setModalIsOpen(false);
    }
    return (
        <div
            className="flex justify-between items-center bg-gray-800 shadow-lg shadow-green-300 rounded-lg m-8 p-4 hover:scale-105 transition-all duration-300 ease-in-out">

            <p className="flex items-center justify-center space-x-3">
                <button onClick={handleAddToFavorites}><FontAwesomeIcon icon={faPlus} /></button>
                <button onClick={handleDeleteFromFavorite}><FontAwesomeIcon icon={faMinus} /></button>

            </p>
            <div className="flex items-center">
                <img src={props.coins.image} className="h-8 mr-3 w-auto" alt=""/>
                <p>{props.coins.symbol.toUpperCase()}</p>
            </div>
            <p>${props.coins.current_price.toLocaleString()}</p>
            <p className="hidden md:block">{props.coins.price_change_percentage_24h.toFixed(2)}%</p>
            <p className="hidden md:block">${props.coins.total_volume.toLocaleString()}</p>
            <p className="hidden md:block">${props.coins.market_cap.toLocaleString()}</p>
            <div className="flex justify-between items-center space-x-4">
                <Link to={`/coin/${props.coins.id}`}><FontAwesomeIcon icon={faClipboardList} /></Link>
                <Link to={`/trade/${props.coins.id}`}><FontAwesomeIcon icon={faChartLine} /></Link>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Message Modal"
                className="absolute top-1/2 left-1/2 max-w-md w-full transform -translate-x-1/2 -translate-y-1/2 bg-gray-400 p-6 rounded-lg shadow-xl"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50"
            >
                <h2 className="text-lg font-semibold text-gray-900">{modalMessage}</h2>
                <button onClick={closeModal} className="mt-4 px-4 py-2 text-white bg-gray-800 shadow-lg shadow-green-500 rounded-lg hover:bg-green-700">Fermer</button>
            </Modal>
        </div>
    )
}
export default Coinitem