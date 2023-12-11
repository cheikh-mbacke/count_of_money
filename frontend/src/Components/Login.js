import React from 'react';

const Contact = () => {
    // Remplacez cette URL avec l'URL fournie par Formspree pour votre formulaire.
    const formspreeURL = 'https://formspree.io/f/mbjvnabk';

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black p-4">
            <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-gradient-to-r from-green-500 to-black">
                <form className="space-y-6" action={formspreeURL} method="POST">
                    <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-white">Name</label>
                        <input type="text" name="name" id="name" required className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 bg-gray-700 text-white" />
                    </div>
                    <div>
                        <label htmlFor="surname" className="block text-sm font-semibold text-white">Surname</label>
                        <input type="text" name="surname" id="surname" required className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 bg-gray-700 text-white" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-white">Email</label>
                        <input type="email" name="email" id="email" required className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 bg-gray-700 text-white" />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-semibold text-white">Phone Number</label>
                        <input type="tel" name="phone" id="phone" className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 bg-gray-700 text-white" />
                    </div>
                    <div>
                        <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Contact;
