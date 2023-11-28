import React from 'react';
import '../Styles/Acceuil.css'
import Header from "./Header";

const Acceuil = () => {
    return (
        <div className="Acceuil">
                <body>
                    <div className={"h1"}>
                        <span className={'h1-1'}>Trade</span>
                        <span className={"h1-2"}> </span>
                        <span className={'h1-3'}>Crypto Better</span>
                    </div>
                    <div className={"p1"}>Simple, one-step trading…</div>
                    <div className={"p2"}>
                        <span className={"p2-1"}>Count-of-money is the</span>
                        <span className={"p2-2"}> </span>
                        <span className={"p2-3"}>easiest way to buy & sell </span>
                        <span className={"p2-4"}>cryptocurrency.</span>
                    </div>
                    <div className={"p3"}>
                            <span className={"p3-1"}>Unlike any other platform, we allow you to trade</span>
                            <span className={"p3-2"}> </span>
                            <span className={"p3-3"}>in just one</span>
                            <span className={"p3-4"}> </span>
                            <span className={"p3-5"}>step between any supported asset.</span>
                    </div>
                    <div className={"p4"}>
                        <span className={"p4-1"}>For example, Bitcoin to XRP, is</span>
                        <span className={"p4-2"}> </span>
                        <span className={"p4-3"}>one seamless trade</span>
                        <span className={"p4-4"}> </span>
                        <span className={"p4-5"}>that you won't find anywhere else.</span>
                    </div>
                    <video>
                        <source src="../Images/03%20BITCOIN%20TO%20XRP_OUTLINE-vbr-500k-650k.mp4" type="video/mp4" />
                    </video>


                </body>

        </div>

    );
};

export default Acceuil;
