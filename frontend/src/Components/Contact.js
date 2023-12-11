import React from 'react';
import { useForm, ValidationError } from '@formspree/react';

const Contact = () => {

    const [state, handleSubmit] = useForm("mbjvnabk");

    // Si l'envoi a réussi, affichez un message de remerciement sans changer la structure de la page
    if (state.succeeded) {
        return (
            <div className="flex flex-col items-center justify-center bg-black p-4">
                <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-gradient-to-r from-green-500 to-black">
                    <p className="text-white text-center">Thank you for your message!</p>
                </div>
            </div>
        );
    }
    return (
        <div className=" flex flex-grow bg-black">
            <div className="flex flex-auto items-center justify-center  bg-black p-4">
                <div className="w-1/2 max-w-md p-8 rounded-lg shadow-lg bg-gradient-to-r from-green-500 to-black">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-semibold text-white">Name</label>
                            <input type="text" name="name" id="name" className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 bg-gray-700 text-white" />
                        </div>
                        <div>
                            <label htmlFor="surname" className="block text-sm font-semibold text-white">Surname</label>
                            <input type="text" name="surname" id="surname" className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 bg-gray-700 text-white" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-white">Email Address</label>
                            <input id="email" type="email" name="email" className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 bg-gray-700 text-white" />
                            <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-sm" />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-semibold text-white">Your Message</label>
                            <textarea id="message" name="message" className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 bg-gray-700 text-white" />
                            <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500 text-sm" />
                        </div>
                        <div>
                            <button type="submit" disabled={state.submitting} className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;